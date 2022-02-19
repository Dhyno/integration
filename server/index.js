require('dotenv').config()
const express = require('express')

const cors = require('cors')

// Get routes to the variabel
const router = require('./src/routes')

const app = express()

const port = 5000

app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1/', router)
// add route here to serving static file
app.use('/uploads', express.static('uploads'))

app.listen(port, () => console.log(`Listening on port ${port}!`))