const fs = require('fs/promises');
const path = require('path');

module.exports = {
  addNote,
};

const dbPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  notes.push({
    title,
    id: Date.now().toString(),
  });

  console.log(notes);
  await fs.appendFile(dbPath);
}

async function getNotes() {
  const buffer = await fs.readFile(dbPath);
  const notes = Buffer.from(buffer);

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

addNote('123');
