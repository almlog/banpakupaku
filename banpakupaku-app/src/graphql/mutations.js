/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItinerary = /* GraphQL */ `
  mutation CreateItinerary(
    $input: CreateItineraryInput!
    $condition: ModelItineraryConditionInput
  ) {
    createItinerary(input: $input, condition: $condition) {
      id
      startTime
      title
      description
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateItinerary = /* GraphQL */ `
  mutation UpdateItinerary(
    $input: UpdateItineraryInput!
    $condition: ModelItineraryConditionInput
  ) {
    updateItinerary(input: $input, condition: $condition) {
      id
      startTime
      title
      description
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteItinerary = /* GraphQL */ `
  mutation DeleteItinerary(
    $input: DeleteItineraryInput!
    $condition: ModelItineraryConditionInput
  ) {
    deleteItinerary(input: $input, condition: $condition) {
      id
      startTime
      title
      description
      points
      createdAt
      updatedAt
      __typename
    }
  }
`;
