const fs = require('fs/promises');
const path = require('path');

module.exports = {
  addNote,
  printNotes,
  removeNote,
};

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(notes);
}

async function removeNote(id) {
  const notes = await getNotes();

  const findIndex = notes.findIndex((note) => note.id === id);

  findIndex !== -1 && notes.splice(findIndex, 1);

  await saveNotes(notes);
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
