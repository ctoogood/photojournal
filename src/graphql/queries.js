/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
      id
      name
      description
      owner
      coverPhoto {
        bucket
        key
        region
      }
      posts {
        items {
          id
          collectionId
          title
          caption
          date
          location
          tags
          owner
        }
        nextToken
      }
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
        owner
        coverPhoto {
          bucket
          key
          region
        }
        posts {
          nextToken
        }
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
      title
      caption
      date
      location
      tags
      image {
        bucket
        key
        region
      }
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
        title
        caption
        date
        location
        tags
        image {
          bucket
          key
          region
        }
        owner
      }
      nextToken
    }
  }
`;
export const collectionByName = /* GraphQL */ `
  query CollectionByName(
    $owner: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    collectionByName(
      owner: $owner
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        owner
        coverPhoto {
          bucket
          key
          region
        }
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const collectionByDate = /* GraphQL */ `
  query CollectionByDate(
    $collectionId: ID
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    collectionByDate(
      collectionId: $collectionId
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionId
        title
        caption
        date
        location
        tags
        image {
          bucket
          key
          region
        }
        owner
      }
      nextToken
    }
  }
`;
