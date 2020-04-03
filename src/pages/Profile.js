import React from "react";
import CollectionList from "../components/collections/CollectionList";

const Profile = () => {
  return (
    <section className="profile__main">
      <h1>My Collections</h1>
      <CollectionList />
    </section>
  );
};

export default Profile;
