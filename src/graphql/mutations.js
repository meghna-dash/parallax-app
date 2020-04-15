/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const putGuides = /* GraphQL */ `
  mutation PutGuides(
    $pk: String
    $sk: String
    $name: String
    $date: String
    $description: String
  ) {
    putGuides(
      pk: $pk
      sk: $sk
      name: $name
      date: $date
      description: $description
    ) {
      pk
      sk
      title
      description
      views
    }
  }
`;
