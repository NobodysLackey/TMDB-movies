require('dotenv').config()
const API_KEY = process.env.TMDB_KEY
const DOMAIN = 'https://api.themoviedb.org/3'

const axios = require('axios')

const index = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/movie/popular?language=en-US&api_key=${API_KEY}`)
  const movies = response.data.results
  res.render('movies', { movies })
}

const search = async (req, res) => {
  const response = await axios.get(`${DOMAIN}/search/movie?query=${req.query.movie}&api_key=${API_KEY}`)
  const movies = response.data.results
  res.render('movies', { movies })
}

module.exports = {
  index,
  search
}
