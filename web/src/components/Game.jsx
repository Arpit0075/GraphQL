import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import IndividualGame from "./IndividualGame";

// include queries to add a new game
// add queries to delte and update

function Game() {
  const GET_GAMES = gql`
    query gamesQuery {
      games {
        _id
        title
      }
    }
  `;

  const { data: gameData } = useQuery(GET_GAMES);

  return (
    <div style={{ padding: "2.5rem" }}>
      <div
        style={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {gameData?.games?.map((game) => {
          return <IndividualGame game={game} key={game._id} />;
        })}
      </div>
    </div>
  );
}

export default Game;
