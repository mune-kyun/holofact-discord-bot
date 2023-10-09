import { gql } from "graphql-request";

import client from "./client";

const getVtuberByName = (name, fields = "name birthday greeting height") => {
  const query = gql`
    query GetVtuber($name: String!) {
      vtuber(name: $name) {
        ${fields}
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
