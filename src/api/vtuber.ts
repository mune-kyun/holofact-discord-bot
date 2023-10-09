import { gql } from "graphql-request";

import client from "./client";

const getVtuberByName = (name) => {
  const query = gql`
    query GetVtuber($name: String!) {
      vtuber(name: $name) {
        name
      }
    }
  `;

  const variables = {
    name,
  };

  return new Promise((resolve, reject) => {
    client
      .request(query, variables)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getVtuberByName };
