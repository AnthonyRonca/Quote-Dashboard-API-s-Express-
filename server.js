const express = require('express');
const app = express();

/* quote {
    person: string,
    quote: string,
} */
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    console.log('GET - /api/quotes/random');
    if (randomQuote) {
        console.log('SUCCESS - Random quote sent');
        console.log('PAYLOAD - ' + JSON.stringify(randomQuote));
        res.status(201).send({quote: randomQuote});
    } else {
        console.log('FAILURE - Random quote not sent')
        res.status(400).send("Error retrieving random quote")
    }
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        let result = [];
        quotes.forEach(boop => {
            if (boop.person === req.query.person) {result.push(boop)}
        })
        console.log('FETCH - by author success');
        console.log('PAYLOAD - ' + JSON.stringify({quotes: result}));
        res.status(200).send({quotes: result});
    } else {
        console.log('FETCH - All quotes sucess');
        res.status(200).send({quotes: quotes});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});
app.use(express.static('public'));