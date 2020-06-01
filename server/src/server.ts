import express, { response } from 'express';

const app = express()

app.get('/users', (request, response) => {
    console.log('Listagem de Usuários.');

    response.json([
        'Diego',
        'Gabriel',
        'Cleiton',
        'Markin'
    ])
})

app.listen(3333)