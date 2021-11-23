const express = require('express');
const app = express();
const path = require('path');
const { search  } = require('./search.js');
const PORT = process.env.PORT || 3000;

const init = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });
    }
    catch(err) {
        console.log(err)
    };
}

init();

app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'public/index.html')));

app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/search', (req, res, next) => {
    try {
        const results = search(req.body);
        // uncomment the line below to see the raw results of your search in the console
        // console.log(results)
        res.send(results);

    }
    catch(err) {
        next(err)
    }

})

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })