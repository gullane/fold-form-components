const greeting = require('./index.js')
console.log('Starting tests')


const resOne = greeting()
if (resOne !== 'Hello User') {
    throw new Error('Greeting not working with empty argument')
}

const resTwo = greeting('John')
if (resTwo !== 'Hello John') {
    throw new Error('Greeting not working with argument')
}