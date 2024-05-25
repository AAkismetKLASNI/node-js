const yargs = require('yargs');
const package = require('./package.json');
const { addNote, printNotes, removeNote } = require('./notes.controller');

yargs.version(package.version);

yargs.command({
  command: 'add',
  builder: {
    title: {
      type: 'string',
      describe: 'note title',
      demandOption: true,
    },
  },
  describe: 'add new note',
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'print all notes',
  async handler() {
    await printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    id: {
      type: 'string',
      describe: 'note id',
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
