import React from "react";
import { useQuery, gql } from "@apollo/client";

// include query to get all reviews
const GET_REVIEWS = gql`
  query reviewsQuery {
    reviews {
      rating
      content
      id
    }
  }
`;

function Ratings() {
  const { loading, error, data } = useQuery(GET_REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>GraphQl</h3>
      {data?.reviews?.map(({ id, rating, content }) => (
        <div
          key={id}
          style={{
            border: "1px solid wheat",
            padding: "1rem",
            marginTop: "rem",
          }}
        >
          <h3>{rating}</h3>
          <b>About this Rating:</b>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}

export default Ratings;
