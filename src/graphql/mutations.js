/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putGuides = /* GraphQL */ `
  mutation PutGuides(
    $pk: String
    $sk: String
    $title: String
    $description: String
    $routes: String
    $views: Int
    $path: String
  ) {
    putGuides(
      pk: $pk
      sk: $sk
      title: $title
      description: $description
      routes: $routes
      views: $views
      path: $path
    ) {
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
export const putProject = /* GraphQL */ `
  mutation PutProject(
    $pk: String
    $sk: String
    $name: String
    $organization: String
    $isRecording: Boolean
    $ts: String
    $creator: String
    $url: String
  ) {
    putProject(
      pk: $pk
      sk: $sk
      name: $name
      organization: $organization
      isRecording: $isRecording
      ts: $ts
      creator: $creator
      url: $url
    ) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($pk: String!, $sk: String!, $currentProject: String) {
    updateUser(pk: $pk, sk: $sk, currentProject: $currentProject) {
      pk
      sk
      projects
      currentProject
    }
  }
`;
export const updateUserProjects = /* GraphQL */ `
  mutation UpdateUserProjects($pk: String!, $sk: String!, $newProject: String) {
    updateUserProjects(pk: $pk, sk: $sk, newProject: $newProject) {
      pk
      sk
      projects
      currentProject
    }
  }
`;
export const deleteGuide = /* GraphQL */ `
  mutation DeleteGuide($pk: String!, $sk: String!) {
    deleteGuide(pk: $pk, sk: $sk) {
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
