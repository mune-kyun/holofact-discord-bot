import { gql } from "graphql-request";

import client from "./client";

const getGeneration = () => {
  const query = gql`
    {
      generations {
        idName
        name
      }
    }
  `;

  return new Promise((resolve, reject) => {
    client
      .request(query)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getGenerationByIdName = (idName) => {
  const query = gql`
    query GetGeneration($idName: String!) {
      generation(idName: $idName) {
        idName
        name
        members {
          name
        }
      }
    }
  `;

  const variables = {
    idName,
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

export { getGeneration, getGenerationByIdName };
