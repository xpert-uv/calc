const express = require('express');
const app = express();
const errorExpress = require('./errors');


app.get('/mean', (req, res, next) => {
    // checking if query is empty
    if (!req.query.num) {
        throw new errorExpress("You must pass the number seprated by comma(,)", 400);
    }
    const entry = req.query.num;
    let n = entry.split(",");
    let number = [];

    // checking for input other than number
    for (let x of n) {
        if (isNaN(Number(x))) {
            throw new errorExpress("You must pass the number", 400);

        } else {
            number.push(parseInt(x));
        }
    }
    const mean = number.reduce((acc, curr) => {
        return acc + curr;
    }, 0) / number.length;
    response = {
        operation: "mean",
        Value: `${mean}`
    }
    return res.send(response);

})

app.get('/median', (req, res, next) => {
    // checking if query is empty
    if (!req.query.num) {
        throw new errorExpress("You must pass the number seprated by comma(,)", 400);
    }
    const entry = req.query.num;
    let n = entry.split(",");
    let number = [];

    // checking for input other than number
    for (let x of n) {
        if (isNaN(Number(x))) {
            throw new errorExpress("You must pass the number", 400);

        } else {
            number.push(Number(x));
        }
    }

    // sort
    const sNum = number.sort(function compareNumbers(a, b) {
        return a - b;
    });
    console.log(number.length);
    if (number.length % 2 === 0) {
        let med = number[(number.length / 2)];
        response = {
            Operation: "median",
            value: `${med}`
        }
        return res.send(response);
    } else {
        let med = number[Math.ceil(number.length / 2)];
        response = {
            Operation: "median",
            value: `${med}`
        }
        return res.send(response);
    }



})

app.get('/mode', (req, res, next) => {
    // checking if query is empty
    if (!req.query.num) {
        throw new errorExpress("You must pass the number seprated by comma(,)", 400);
    }
    const entry = req.query.num;
    let n = entry.split(",");
    let number = [];

    // checking for input other than number
    for (let x of n) {
        if (isNaN(Number(x))) {
            throw new errorExpress("You must pass the number", 400);

        } else {
            number.push(Number(x));
        }
    }

    // Counting the most common number and creating obj of it with {number:counter}
    const counts = {};

    number.forEach((el) => {
        counts[el] = counts[el] ? (counts[el] += 1) : 1;
    });

    const ms = Object.values(counts);
    //Finding the most repetative number /higest count
    const key = (Math.max(...ms));
    // gettting keys using value of counter
    const ss = getKeyByValue(counts, key);

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    response = {
        operation: "mod",
        value: `${ss}`
    }
    return res.send(response);
})



app.use((err, req, res, next) => {
    const newError = new errorExpress(err.msg, err.code);
    return res.send(newError);
})

app.listen('3000', () => {
    console.log("Server starting at port 3000");
})


///////////////////
