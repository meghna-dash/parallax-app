/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGuides = /* GraphQL */ `
  query GetGuides($pk: String, $sk: String) {
    getGuides(pk: $pk, sk: $sk) {
      pk
      sk
      title
      description
      routes
      views
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($pk: String, $sk: String) {
    getUser(pk: $pk, sk: $sk) {
      pk
      sk
      projects
    }
  }
`;
