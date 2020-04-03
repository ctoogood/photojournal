/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
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
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
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
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      collectionId
      caption
      date
      location
      image {
        bucket
        key
        region
      }
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      collectionId
      caption
      date
      location
      image {
        bucket
        key
        region
      }
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      collectionId
      caption
      date
      location
      image {
        bucket
        key
        region
      }
      owner
    }
  }
`;
