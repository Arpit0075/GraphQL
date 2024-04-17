import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

// include query to get a specific review
// useLazyQuery can be used on click

const GET_REVIEW = gql`
  query reviewQuery($id: ID!) {
    review(id: $id) {
      rating
      content
      id
    }
  }
`;

function SpecificRating() {
  //   const { loading, error, data } = useQuery(GET_REVIEW, {
  //     variables: { id: "201" },
  //   });

  const [loadRating, { loading, error, data }] = useLazyQuery(GET_REVIEW, {
    variables: { id: "201" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3 onClick={() => loadRating()}>SpecificRating </h3>

      <div
        style={{
          border: "1px solid wheat",
          padding: "1rem",
          marginTop: "rem",
        }}
      >
        <h3>{data?.review?.rating}</h3>
        <b>About this Rating:</b>
        <p>{data?.review?.content}</p>
      </div>
    </div>
  );
}

export default SpecificRating;
