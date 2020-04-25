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
      path
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($pk: String, $sk: String) {
    getUser(pk: $pk, sk: $sk) {
      pk
      sk
      projects
      currentProject
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($pk: String, $sk: String) {
    getProject(pk: $pk, sk: $sk) {
      pk
      sk
      name
      organization
      isRecording
      ts
      creator
      url
    }
  }
`;
