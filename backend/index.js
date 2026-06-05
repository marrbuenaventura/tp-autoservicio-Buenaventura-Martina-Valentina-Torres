import express from 'express'
import environments from './src/api/config/environments.js'

const app = express()

const PORT = environments.port

// Endpoints
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.get('/api/products', (req, res) => {
    res.send('Acá devolveremos el JSON que me devuelva la consulta')
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})