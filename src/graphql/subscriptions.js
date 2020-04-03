/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String!) {
    onCreateCollection(owner: $owner) {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String!) {
    onUpdateCollection(owner: $owner) {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String!) {
    onDeleteCollection(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
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
