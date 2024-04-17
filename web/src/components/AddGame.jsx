import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

function AddGame() {
  const AddGameMutation = gql`
    mutation addMutation($game: GameInput!) {
      addGame(game: $game) {
        title
        platform
        _id
      }
    }
  `;

  const [addGame, { loading, data, error }] = useMutation(AddGameMutation);

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");

  const handleAddGame = () => {
    addGame({
      variables: {
        game: {
          title: title,
          platform: platform.split(","),
        },
      },
      update: (cache, { data: { addGame } }) => {
        cache.modify({
          fields: {
            games(existingGames = []) {
              const newGameRef = cache.writeFragment({
                data: addGame,
                fragment: gql`
                  fragment NewGame on Game {
                    id
                    title
                    platform
                  }
                `,
              });
              return [...existingGames, newGameRef];
            },
          },
        });
      },
    });
    setTitle("");
    setPlatform("");
  };

  return (
    <div>
      <input
        placeholder="enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="enter platorm"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <button disabled={loading} onClick={handleAddGame}>
        Add Game
      </button>
    </div>
  );
}

export default AddGame;
