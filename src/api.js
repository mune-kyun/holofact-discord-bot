const { GraphQLClient, gql } = require("graphql-request");

const endpoint = "http://localhost:4000/graphql/";
const client = new GraphQLClient(endpoint);

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

const getGeneration = () => {
  const query = gql`
    {
      generations {
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

module.exports = {
  getVtuberByName,
  getGeneration,
  getGenerationByIdName,
};
