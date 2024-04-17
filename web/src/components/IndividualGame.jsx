import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

function IndividualGame({ game }) {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updatePlatform, setUpdatePlatform] = useState("");

  const DELETEGAMEMUTATION = gql`
    mutation delGame($deleteGameId: ID!) {
      deleteGame(id: $deleteGameId) {
        title
        platform
        _id
      }
    }
  `;

  const [
    deleteGame,
    // { loading: deleteLoading, data: deltedData }
    arg,
  ] = useMutation(DELETEGAMEMUTATION);

  const UPDATEGAMEMUTATION = gql`
    mutation updateGame($id: ID!, $game: GameInput!) {
      updateGame(id: $id, game: $game) {
        title
        _id
      }
    }
  `;

  const [updateGame, { data: updateGameData, loading, error }] =
    useMutation(UPDATEGAMEMUTATION);
  //console.log(updateGameData);

  const hanldeDelete = (gameId) => {
    deleteGame({
      variables: {
        deleteGameId: gameId,
      },
      update: (cache, { data: { deleteGame } }) => {
        // Modify the cache to remove the deleted game
        cache.modify({
          fields: {
            games(existingGames = [], { readField }) {
              return existingGames.filter(
                (game) => readField("_id", game) !== gameId
              );
            },
          },
        });

        // Add an update to the cache here if needed
        // For example, you can add a toast or log message
      },
    });
  };

  const handleUpdate = (gameId) => {
    let newTitle = updateTitle;
    let platformArr = updatePlatform.split(",");

    updateGame({
      variables: {
        id: gameId,
        game: {
          platform: platformArr,
          title: newTitle,
        },
      },
      update: (cache, { data: { updateGame } }) => {
        // Modify the cache to remove the deleted game
        cache.modify({
          fields: {
            games(existingGames = [], { readField }) {
              return existingGames.map((game) => {
                if (readField("_id", game) == gameId) {
                  return {
                    ...game,
                    platform: platformArr,
                    title: newTitle,
                  };
                } else return game;
              });
            },
          },
        });

        // Add an update to the cache here if needed
        // For example, you can add a toast or log message
      },
    });
    setUpdatePlatform("");
    setUpdateTitle("");
  };

  return (
    <div
      style={{
        border: "1px solid wheat",
        padding: "2rem",
      }}
    >
      {game.title}
      <h6>{game._id}</h6>
      <div>
        <button onClick={() => hanldeDelete(game._id)}>Delete</button>
      </div>
      <div>
        <input
          placeholder="updated title"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <input
          placeholder="update platorm"
          value={updatePlatform}
          onChange={(e) => setUpdatePlatform(e.target.value)}
        />
        <button onClick={() => handleUpdate(game._id)}>Update</button>
      </div>
    </div>
  );
}

export default IndividualGame;
