/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putGuides = `mutation PutGuides(
  $pk: String
  $sk: String
  $title: String
  $description: String
  $routes: String
  $views: Int
) {
  putGuides(
    pk: $pk
    sk: $sk
    title: $title
    description: $description
    routes: $routes
    views: $views
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
export const putProject = `mutation PutProject(
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
export const updateUser = `mutation UpdateUser($pk: String!, $sk: String!, $currentProject: String) {
  updateUser(pk: $pk, sk: $sk, currentProject: $currentProject) {
    pk
    sk
    projects
    currentProject
  }
}
`;
export const updateUserProjects = `mutation UpdateUserProjects($pk: String!, $sk: String!, $newProject: String) {
  updateUserProjects(pk: $pk, sk: $sk, newProject: $newProject) {
    pk
    sk
    projects
    currentProject
  }
}
`;
export const deleteGuide = `mutation DeleteGuide($pk: String!, $sk: String!) {
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
