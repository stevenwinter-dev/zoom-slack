const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('index route')
})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})