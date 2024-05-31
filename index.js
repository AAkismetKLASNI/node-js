const express = require('express');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./module.controller');

const app = express();
const POST = 3000;

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  console.log('get');

  res.render('index', {
    title: 'Express!',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  console.log('post');
  await addNote(req.body.title);

  res.render('index', {
    title: 'Express!',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  console.log('delete');
  await removeNote(req.params.id);

  res.render('index', {
    title: 'Express!',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title });

  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(POST, () => {
  console.log('SERVER STARTED');
});
