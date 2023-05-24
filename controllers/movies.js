require('dotenv').config()
const API_KEY = process.env.TMDB_KEY
const DOMAIN = 'https://api.themoviedb.org/3'

const axios = require('axios')

const index = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}/movie/popular?include_adult=false&language=en-US&api_key=${API_KEY}`
  )
  let movies = response.data.results
  res.render('movies', { movies })
}

const search = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}/search/movie?include_adult=false&query=${req.query.movie}&api_key=${API_KEY}`
  )
  let movies = response.data.results
  res.render('movies', { movies })
}

const getDetails = async (req, res) => {
  const response = await axios.get(
    `${DOMAIN}/movie/${req.params.id}?api_key=${API_KEY}`
  )
  let movie = response.data

  let newDate = []
  let sequence = [5, 6, 4, 8, 9, 7, 0, 1, 2, 3]
  let dateArray = movie.release_date.split('')
  dateArray.forEach((char, idx) => {
    newDate[idx] = dateArray[sequence[idx]]
  })

  let budget = "$" + movie.budget.toLocaleString()

  res.render('movies/details', { movie, date: newDate.join(''), budget })
}

module.exports = {
  index,
  search,
  details: getDetails
}
