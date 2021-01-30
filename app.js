const express = require('express');

const app = express();


app.use(express.json());

app.use('/', require('./router/data'));


const PORT = process.env.PORT || 5500

app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on ${PORT}`))
