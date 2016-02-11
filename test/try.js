/*eslint-disable no-console*/

const red = '\u001b[31m\u001b[1m';
const green = '\u001b[32m\u001b[1m';
const white = '\u001b[39m';
const grey = '\u001b[90m\u001b[38;5;';

module.exports = (name, expectation) => {
    try {
        expectation();
        console.log(`${green}✔ ${name} ${grey}=> passed${white}`);
    } catch (e) {
        console.error(`${red}✘ ${name} ${grey}=> failed`); // keep thrown error grey
        throw e;
    }
};
