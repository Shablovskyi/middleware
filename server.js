const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для логування запитів
const requestLogger = (req, res, next) => {
    // Отримуємо поточний локальний час
    const currentTime = new Date().toLocaleString();

    // Логування методу, URL та часу запиту
    console.log(`[${currentTime}] Method: ${req.method}, URL: ${req.url}`);

    // Передаємо запит далі
    next();
};

// Підключаємо middleware до всіх запитів
app.use(requestLogger);

// Middleware для парсингу JSON у запитах
app.use(express.json());

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Маршрут для отримання всіх користувачів
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

app.get('/users', (req, res) => {
    res.json(users);
});

// Маршрут для отримання користувача за id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Маршрут для додавання нового користувача
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Обробка невизначених маршрутів
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
