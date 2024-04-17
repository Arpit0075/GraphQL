// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against your data.

export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Game {
    _id: ID!
    title: String!
    platform:[String!]!
    reviews:[Review!]
  }
  type Author{
    _id: ID!
    name: String!
    verified: Boolean!
    reviews:[Review!]
  }
  type Review{
    _id: ID!
    rating: Int!
    content: String!
    game:Game!
    # gameId:ID!
    # authorId:ID!
    author:Author!
  }

  type Query {
    games: [Game]
    authors:[Author]
    author(id:ID!):Author
    reviews:[Review]
    review(id:ID!):Review
    game(id:ID!):Game
  }

  type Mutation {
    deleteGame(id:ID!):[Game],
    addGame(game:GameInput!):Game,
    updateGame(id:ID!, game:GameInput!):[Game]
  }
input GameInput {
  platform:[String!]
  title:String!
}
`;
