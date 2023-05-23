require('dotenv').config()
const API_KEY = process.env.TMDB_KEY
const DOMAIN = 'https://api.themoviedb.org/3'

const axios = require('axios')

const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/movie/popular?include_adult=false&language=en-US&api_key=${API_KEY}`)
  let movies = response.data.results
  res.render('movies', { movies })
}

const search = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/search/movie?include_adult=false&query=${req.query.movie}&api_key=${API_KEY}`)
  let movies = response.data.results
  res.render('movies', { movies })
}

module.exports = {
  index,
  search
}
