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
    $dateCreated: String
    $creator: String
  ) {
    putProject(
      pk: $pk
      sk: $sk
      name: $name
      organization: $organization
      isRecording: $isRecording
      dateCreated: $dateCreated
      creator: $creator
    ) {
      pk
      sk
      name
      organization
      isRecording
      dateCreated
      creator
    }
  }
`;
