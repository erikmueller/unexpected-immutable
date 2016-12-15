const red = '\u001b[31m\u001b[1m'
const green = '\u001b[32m\u001b[1m'
const white = '\u001b[39m'

module.exports = (name, expectation) => {
  try {
    expectation()
    console.log(`${green}✔ ${name} ${white}`)
  } catch (e) {
    console.error(`${red}✘ ${name}`) // keep thrown error grey
    throw e
  }
}
