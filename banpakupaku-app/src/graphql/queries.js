/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItinerary = /* GraphQL */ `
  query GetItinerary($id: ID!) {
    getItinerary(id: $id) {
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
export const listItineraries = /* GraphQL */ `
  query ListItineraries(
    $filter: ModelItineraryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItineraries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startTime
        title
        description
        points
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
