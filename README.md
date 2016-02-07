# MonoLog

## A site for people to share text posts (A basic Twitter Clone)

**Built Upon the Following Technologies:**
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
- jQuery (for Bootstrap only)

### To run an Instance of this app, you need to:

**1. Download files**
- I.E. clone this repository

**2. Install Dependencies**
- In your terminal window, navigate to the directory, and then run `npm install` to install dependencies

**3. Start Server**
- Run `node application/app.js` to start!

**4. Using the App/Notable Features**
- Navigate to `http://localhost:1337` in your web browser
- Create a new username (or login if you already have one)
- Once logged in, you will see a list of posts by all users.
- Create new posts by typing into the large textarea box at the top of the page, then click `Plant It!`
- You can tag other users and add hashtags by typing @username or #hashtag. Be sure to leave a space on each side of your desired tags. If you do not do this, any extra letters or punctuation will be treated as part of the tag.
- Use the search box in the navigation header to search for users and hashtags. A search for `#searchTerm` (with the `#`) will return all posts that include the hashtag `searchTerm`. A search for `@searchTerm` (with the `@`) will return all posts that were posted by the user `searchTerm`. A search for `searchTerm` will return all posts that include the hashtag `searchTerm` and all posts by the user `searchTerm`.