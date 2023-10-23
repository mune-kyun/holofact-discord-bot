import { gql } from "graphql-request";

import client from "./client";

const getVtuberByName = (
  name,
  fields = "name imgUrl birthday greeting height"
) => {
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

const getFact = (name = null, fields = "name funFacts") => {
  const query = gql`
    query Fact($name: String) {
      fact(name: $name) {
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

export { getVtuberByName, getFact };
