const fs = require('fs/promises');
const path = require('path');

module.exports = {
  addNote,
};

const dbPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  console.log(notes);

  notes.push(note);

  await fs.appendFile(dbPath, JSON.stringify(notes));
}

async function getNotes() {
  const buffer = await fs.readFile(dbPath);
  const notes = Buffer.from(buffer);

  return Array.isArray(notes) ? notes : [];
}

addNote('123');
