import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
];

app.post('/search', async (req, res) => {
  const { email, number } = req.body;

  // Валидация полей
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (number && !/^\d{6}$/.test(number)) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  // Добавляем задержку 5 секунд
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Поиск пользователей
  const results = users.filter(user => {
    return user.email === email && (!number || user.number === number);
  });

  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
