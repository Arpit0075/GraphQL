import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema.js";
import cors from "cors";
import { connect } from "./connection.js";
import { Review, Game, Author } from "./mongooseSchema.js";
const app = express();

// Resolvers define how to fetch the types defined in your schema..
const resolvers = {
  Query: {
    games: async () => {
      let games = await Game.find();
      return games;
    },
    game: async (_, args) => {
      return await Game.findOne({ _id: args.id });
    },

    async authors() {
      return await Author.find();
    },

    async author(_, args) {
      return await Author.findOne({ _id: args.id });
    },
    async reviews() {
      return await Review.find();
    },
    async review(parent, args) {
      return await Review.findOne({ _id: args.id });
    },
  },
  Game: {
    async reviews(parent) {
      return await Review.find({ gameId: parent._id });
    },
  },
  Author: {
    async reviews(parent) {
      return await Review.find({ authorId: parent._id });
    },
  },
  Review: {
    async author(parent) {
      return await Author.findOne({ _id: parent.authorId });
    },
    async game(parent) {
      return await Game.findOne({ _id: parent.gameId });
    },
  },
  Mutation: {
    async deleteGame(_, args) {
      await Game.findOneAndDelete({ _id: args.id });
      return await Game.find();
    },
    async addGame(_, args) {
      let newGame = args.game;
      let createdGame = new Game(newGame);
      return await createdGame.save();
    },
    async updateGame(_, args) {
      await Game.findOneAndUpdate({ _id: args.id }, { ...args.game });
      return await Game.find();
    },
  },
};
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  await connect(); // connecting mongodb
  app.use(express.json());
  app.use(cors());
  //learning GraphQl
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to app!" });
  });
  server.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

  return { server, app };
}

startApolloServer();
