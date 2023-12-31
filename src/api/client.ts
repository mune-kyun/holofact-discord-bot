require("dotenv").config();
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_SERVER;
const client = new GraphQLClient(endpoint);

export default client;
