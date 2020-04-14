# Photojournalit
## Online image storage & viewing

![Home Page](example_images/pj_home.PNG)

Photojournalit is a photo storing website built using AWS Amplify.

---

![Login Page](example_images/pj_login.PNG)

It features authentication built on AWS Cognito which allows users to register, login & reset forgotten passwords.

---

![Collections Page](example_images/pj_collections.PNG)

Once logged in the user can create a collection.  The collections are listed on the user's profile page.

---

![Posts Page](example_images/pj_addPost.PNG)

Within each collection, new posts can be added through the Add Post form. Using GraphQL subscriptions the list of posts is automatically updated on upload of the new post.

---

![Post Options](example_images/pj_postOptions.PNG)

Posts can be edited, downloaded, assigned to the collection cover,or deleted.  Each collection and post is stored in AWS Dynamo DB and the images are stored in AWS S3 storage.

---

![Post Detail](example_images/pj_post.PNG)


