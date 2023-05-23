# TMDB API

![movie](https://totalfratmove.com/wp-content/uploads/2021/04/image-7.jpeg)

## Overview

In this lab you will retrieve movie data from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) and render it in the browser.

## Getting Started

- `fork` and `clone` this repo.
- `cd` into it and open it with `code .`
- `touch` a `.env` file and paste your TMDB API Key (v3 auth) like so:
    - `TMDB_KEY=5e40on98okd981d56f5f964f689b6a17`
- run `npm install` to install our dependencies. `axios` has already been added to your dependency list.
- run `npm start` to run our Express server

## TMDB

First, head over to the TMDB website and sign up for your own API key (free option is perfectly fine). Next, check out the documentation [Here](https://www.themoviedb.org/signup). Here you will find instructions on how to structure your endpoint for your axios calls. You can also find different parameters to use and what they are for. Remember, every API is different so you will need to read into what works for *this* API.

### Starter Code

If you look at the files we've given you, you will find a base Express app with a few EJS views to get you started. In the ***movies.js controller*** file, we've given you the base URL for your axios call. All you need to do is plug in your API key and add your parameter to the end.

### Requirements

- A text input + button for searching TMDB by *movie title* (provided in the starter code).
- Display a list of movies returned by the search with your API call. At *least* the movie's title and poster should be visible.
- Incorporate CSS flexbox (and maybe grid?) into your page to better display your results.

### Steps

Here is a suggested guide for getting through the lab:

- Attach an event listener that simply logs the text value of the input
- Once you can see the value being outputted, store this in a variable outside of your event listener.
- Next, add the `axios` API call. For searching, the URL should look something like this: `https://api.themoviedb.org/3/search/movie?query=[your search query]&api_key=[yourkey]`
- Remember to use `async` and `await` for the axios calls
- Try to `console.log` the search results.

For this first bit, you should be able to verify in the console that you are successfully retrieving information from TMDB.

- Next, write a method called `renderList` that receives an array of "movie" objects as a parameter. Call `renderList` from the event handler you wrote in the previous step and pass it the Search results from the axios response.
- `renderList` should iterate over the movies it receives as an argument and insert the movie data from each object into the DOM as a new HTML element.

Before moving on, try to verify that you can enter text into the text input, click the button, and then see a list of movies appear on the page.

### Bonus !!!

If you need an extra challenge and practice, let's get ready to add a `viewDetails` button to each movie.
We will need an event listener either on the movie's poster or a button near the movie's title that will allow a user to "select" or "view more info" about the movie. The listener should make a second API call to retrieve information about the movie. If a movie is "selected", display the movie's data at the top of the page.

- Go back to the movie list. Add a button to each movie in the list.
- When a user clicks on this button, pass the movie's `id` or `title` to the TMDB API to retrieve more information about the movie. Try to console log or display the URL for each button and test it in the browser's navigation bar if you're having issues with this step.
- Using the data returned from the API, display the movie's additional info at the top of the page.

### More Bonus !

- Change up the style for the page. Make it your own!

## Resources

- [Axios](https://github.com/axios/axios)
- [APIs for Beginners](https://medium.com/@LewisMenelaws/a-beginners-guide-to-web-apis-and-how-they-will-help-you-23923a0da450)
