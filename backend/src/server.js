require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend initialisé' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`)
})
