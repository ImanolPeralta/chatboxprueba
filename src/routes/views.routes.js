import express from 'express';

const router = express.Router();

const food = [
    {name: "Hamburguesa", price: 15000},
    {name: "Pizza", price: 13000},
    {name: "Empanadas", price: 50000},
    {name: "Ensalada", price: 7000},
    {name: "Coca cola", price: 3500}
];

const userTest = {
    name: 'Hilda',
    lastname: 'Martínez',
    role: 'Admin'
}
router.get('/socket', (req, res) => {
    res.render('socket')
})

router.get('/chat', (req, res) => {
    res.render('messages')
})

router.get('/', (req, res) => {
console.log('Iniciando renderizado de HBS')

res.render('food', {
    user: userTest,
    isAdmin: userTest.role === 'Admin',
    food
})
})

export default router;

