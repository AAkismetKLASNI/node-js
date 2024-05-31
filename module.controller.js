const fs = require('fs/promises');
const path = require('path');

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};

const dbPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  saveNote(notes);
}

async function saveNote(notes) {
  await fs.writeFile(dbPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(dbPath, { encoding: 'utf-8' });

  const parseNotes = JSON.parse(notes);

  return parseNotes;
}

async function removeNote(idNote) {
  const notes = await getNotes();

  const newNotes = notes.filter(({ id }) => id !== idNote);

  await saveNote(newNotes);
}

async function updateNote(noteData) {
  const notes = await getNotes();

  const index = notes.findIndex(({ id }) => id === noteData.id);

  if (index >= 0) {
    notes[index] = { ...notes[index], ...noteData };
    await saveNote(notes);
  }
}
