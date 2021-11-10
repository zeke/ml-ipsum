const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async function getTerms () {
  const url = 'https://developers.google.com/machine-learning/glossary'
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const terms = []
  $('h2').each((i, el) => {
    const term = $(el).text().trim().split(' (')[0]
    if (term.length > 1) {
      terms.push(term)
    }
  })

  return terms
}
