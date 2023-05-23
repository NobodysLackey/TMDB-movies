# TMDB API Lab

![movie](https://totalfratmove.com/wp-content/uploads/2021/04/image-7.jpeg)

## Overview

In this lab you will retrieve movie data from the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) and render it in the browser.

## Getting Started

- `fork` and `clone` this repo
- `cd` into it and open it with `code .`
- `touch` an `.env` file and add an environment variable with your TMDB API Key (v3 auth) like so:
    - `TMDB_KEY=5e40on98okd981d56f5f964f689b6a17`
    - Screaming snake case, no spaces, no quotes
    - The key ***needs*** to be called `TMDB_KEY`
- run `npm install` to install our dependencies. `axios` has already been added to your dependency list
- run `npm start` to run our Express server

## TMDB

First, head over to the TMDB website and sign up for your own API key (free option is perfectly fine). Next, check out the documentation [here](https://developer.themoviedb.org/reference/intro/getting-started). Here you will find instructions on how to structure your endpoint for your axios calls. You can also find different parameters to use and what they are for. Remember, every API is different so you will need to read into what works for *this* API.

### Starter Code

If you look at the files we've given you, you will find a base Express app with a few EJS views to get you started. In the ***movies.js controller*** file, we've given you the base URL for your axios call. All you need to do is plug in your API key and add your parameter to the end.

### Requirements

- A text input + button for searching TMDB by *movie title*.
- Display a list of movies returned by the search with your API call. *At least* the movie's title and poster should be visible.

### Steps

#### Let's build our first Axios call together

When we interact with our database in past lessons and labs, an API facilitates that communication. In our case, that was our Express app in the form of our controllers. We used Mongoose methods to communicate and retrieve information from the database.

The same is true when interacting with a 3rd party API. We will use our Express app controller functions paired with Axios to send requests to the API, which will communicate with its database, and return information to us!

#### PART 1: Popular Movies!

We're going to set up the Search page of our app to showcase the current most popular movies on the page right when it loads. In order to do that, we'll need to make an axios call to the API in our index controller. Our route is already set up and hooked up for us, so let's take a look at the controller.

In **controllers/movies.js**...
```js
const index = (req, res) => {
  res.render('movies')
}
```

Right now, our controller just renders our **views/movies/index.ejs** view. Let's get to it!

First, at the top of the controller file, we'll need to require axios. This allows us to use the axios object to make our requests.
```js
const axios = require('axios')
```

Requests to *any* API take a second (milliseconds, technically) to complete. Due to that, we need to have our function run ***asynchronously*** so that we can `await` for certain lines to complete before our JavaScript continues on. To do that, we add `async` right before our function expression, like so:
```js
const index = async (req, res) => {
  res.render('movies')
}
```

Next, we'll make our axios call to TMDB (our 3rd party API)!

It's fairly standard to store the response from the API in a JavaScript variable. We'll call ours `response`.
```js
const index = async (req, res) => {
  const response = 
  res.render('movies')
}
```

***This*** is the action that will run asynchronously, so we need to be sure and `await` it to complete. Then, we'll use the axios object to make a GET request from the API.
```js
const index = async (req, res) => {
  const response = await axios.get()
  res.render('movies')
}
```

The GET method in axios takes in the URL path as an argument. The URL path we'll use in *this case* will utilize the variables at the top of the controller.
- **DOMAIN** - represents the base URL for the call
- **API_KEY** - already retrieving our secret key from our `.env` file and preparing it for use

Using these variables and string interpolation, we'll craft our URL path for `axios.get`. To get the top 20 most popular movies, we'll add `/movie/popular` along with a few other options into our path. Then, we'll add our API key to the end.

We'll also `console.log` our response variable so we can see what we get back.
```js
const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/movie/popular?include_adult=false&language=en-US&api_key=${API_KEY}`)
  console.log(response)
  res.render('movies')
}
```
To test this, navigate to `http://localhost:3000/movies` with your server running. In the `console.log`, look for a `data.results` key. This is an array of the 20 most popular movies! Nice!

Now, all we need to do is store this array in a variable and pass it to our view.
```js
const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/movie/popular?include_adult=false&language=en-US&api_key=${API_KEY}`)
  let movies = response.data.results
  res.render('movies', { movies })
}
```

If we navigate to `/movies` now, we still won't see anything until we update our view! Take a look at our current EJS.

In **views/movies/index.ejs**...
```html
<%- include('../partials/header') %>

<h2>Search for a Movie!</h2>
<br>

<%- include('../partials/footer') %>
```

Now that we have access to our movies array sent over from our controller, we'll need to render them to the page. We'll iterate over the array, and show information for every movie as we go. Add the following to your view:
```html
<%- include('../partials/header') %>

<h2>Search for a Movie!</h2>
<br>
<div class="results">
  <% movies.forEach((movie) => { %>
    <div class="movie">
      <h2><%= movie.title %></h2>
    </div>
    <br>
  <% }) %>
</div>

<%- include('../partials/footer') %>
```

This is great! We should see all of our movie titles on the page! But what if we wanted to show the movie poster? To do that, the TMDB API requires that we use a special URL in conjunction with the `poster_path` key in our movie objects. Like this:
```html
<img src="https://image.tmdb.org/t/p/original/<%= movie.poster_path %>" alt="<%= movie.title %>" />
```

Once added into our view, our final EJS should look like this and should render the top 20 movies and posters to `http://localhost:3000/movies`:
```html
<%- include('../partials/header') %>

<h2>Search for a Movie!</h2>
<br>
<div class="results">
  <% movies.forEach((movie) => { %>
    <div class="movie">
      <img src="https://image.tmdb.org/t/p/original/<%= movie.poster_path %>" alt="<%= movie.title %>" />
      <h2><%= movie.title %></h2>
    </div>
    <br>
  <% }) %>
</div>

<%- include('../partials/footer') %>
```

### PART 2: Searching ANY movie!

For this second part, we need to build out the functionality for a user to search for any movie title and return the top 20 results.

This will require:
1. A small form at the top of **views/movies/index.ejs** with an input field the user can type into and a button to submit
2. A `search` controller in **controllers/movies.js** that will make an axios call
   - As our user fires off the form action, we'll need to use [req.query](https://expressjs.com/en/api.html#req.query) to access what they type into the form field. Be sure and give your input field in your EJS a `name` attribute like "movie". You will access this value with something like `req.query.movie` in your controller.
   - The URL path for a search in TMDB is different than the one we used in Part 1. Read about it [here](https://developer.themoviedb.org/reference/search-movie). We'll need to place our `req.query.movie` right after the `?query=` portion. This will enable the search to find the movie our user wants! Don't forget to add your API key to the end as well.
3. Otherwise, our controller will be set up much the same as the one in Part 1. Make sure and send your movies array to the view when you render!

Once those steps are completed, you should be able to search for any movie in your form and see the results displayed to the page utilizing the forEach we set up earlier!

### PART 3: Stretch Goal!

If you need an extra challenge and practice, let's add a `Details` page for each movie.

You'll definitely need to head over to the [docs](https://developer.themoviedb.org/reference/movie-details) to research how to query for a single movie's details utilizing the `movie_id` that we've already got access to from the objects in our array from our API call!

Requirements, not necessarily in this order:
- Set up a "View Details" button for each movie inside the forEach in **views/movies/index.ejs**.
- Set up a controller that will make an API call utilizing the `movie_id`.
- When a user clicks on the button, pass the movie's `movie_id`.
- Set up a new EJS view for the movie details. Have this page show more information about the movie, or even an alternate image! `Console.log` the response from the axios call so you can see what all is available! Be creative!

## Resources

- [axios](https://github.com/axios/axios)
- [TMDB Docs](https://developer.themoviedb.org/reference/intro/getting-started)
