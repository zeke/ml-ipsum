const terms = require('./terms.json')
const { LoremIpsum } = require('lorem-ipsum')
const { sample } = require('lodash')
const lorem = new LoremIpsum({
  sentencesPerParagraph: { max: 6, min: 4 },
  wordsPerSentence: { max: 12, min: 4 }
})

async function main () {
  const words = lorem.generateParagraphs(40).split(' ')

  // replace every nth word with a random term
  const nthWord = 3
  for (let i = 0; i < words.length; i++) {
    if (i > 0 && i % nthWord === 0) {
      let replacement = sample(terms)

      // preserve period if next word is end of sentence
      if (words[i].endsWith('.')) {
        replacement = replacement + '.'
      }

      // capitalize if previous word was end of sentence
      if (words[i - 1].endsWith('.')) {
        replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1)
      }

      words[i] = replacement
    }
  }

  const mlIpsum = words.join(' ').replace(/\n/g, '\n\n')
  console.log(mlIpsum)
}

main()
