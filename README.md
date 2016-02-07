# MonoLog

A site for people to share short, text-based posts (A basic Twitter Clone).

This project is a demonstration of my ability to use the MEAN stack (MonogoDB, Express, Angular, Node).

## Notable Features:
- Fully responsive web design (site appearance changes with viewport size)
- A user can create a login
- Login passwords are protected with BCrypt encryption
- A user can log in and access pages that are not visible without logging in (Powered by Passport and MongoDB/Mongoose)
- A user can log out
- A user can generate posts
- A user can search posts based on hashtag or user who posted them. A search for `#searchTerm` (with the `#`) will return all posts that include `#searchTerm`. A search for `@username` (with the `@`) will return all posts that were posted by the user `username`. A search for `searchTerm` will return all posts that include the hashtag `searchTerm` and all posts by the user `searchTerm`.

## Built Upon the Following Technologies:
- MongoB
- Express
- Angular
- Node
- Gulp
- Jade
- Sass
- Mongoose
- Passport
- Bootstrap
- BCrypt
- Express-Session
- Cookie Parser
- Connect Flash
- jQuery

## To run an Instance of this app, you need to:

**1. Download files**
- ie, clone this repository

**2. Install Dependencies**
- In your terminal window, navigate to the directory, and then run `npm install` to install dependencies

**3. Start Server**
- Run `node application/app.js` to start!

**4. Use the App**
- Navigate to `http://localhost:1337` in your web browser
- Create a new username (or login if you already have one)
- Once logged in, you will see a list of posts by all users.
- Create new posts by typing into the large textarea box at the top of the page, then click `Plant It!`
- You can tag other users and add hashtags by typing @username or #hashtag. Be sure to leave a space on each side of your desired tags. If you do not do this, any extra letters or punctuation will be treated as part of the tag.
- Use the search box in the navigation header to search for users and hashtags.

![MonoLog Homepage on a Small Viewport](https://github.com/DanielJenkins/monolog/blob/master/screenshotsPlusImages/homepage-mobile.png)

![MonoLog Userpage after a Search for 'Football'](https://github.com/DanielJenkins/monolog/blob/master/screenshotsPlusImages/searchResults-Football.png)