/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      name
      description
      coverPhoto {
        bucket
        key
        region
      }
      posts {
        items {
          id
          collectionId
          caption
          date
          location
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        coverPhoto {
          bucket
          key
          region
        }
        posts {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      collectionId
      caption
      date
      location
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        collectionId
        caption
        date
        location
        owner
      }
      nextToken
    }
  }
`;
