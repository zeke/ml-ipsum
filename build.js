// Usage:
// node build.js > terms.json

const getTerms = require('./lib/get-terms')

async function main () {
  const terms = await getTerms()
  process.stdout.write(JSON.stringify(terms, null, 2))
}

main()
