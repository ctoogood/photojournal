/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String!) {
    onCreateCollection(owner: $owner) {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String!) {
    onUpdateCollection(owner: $owner) {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String!) {
    onDeleteCollection(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
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
