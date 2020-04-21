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
export const getProjects = /* GraphQL */ `
  query GetProjects($pk: String, $sk: String) {
    getProjects(pk: $pk, sk: $sk) {
      pk
      sk
      projects
    }
  }
`;
