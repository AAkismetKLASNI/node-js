const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const base = path.join(__dirname, './test');

const start = async () => {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, 'txt.txt'), `\n${process.argv[2]}`);
    } else {
      await fs.mkdir(base);
      await fs.writeFile(path.join(base, 'txt.txt'), process.argv[2] ?? '');
    }
  } catch (error) {
    console.log('error', error);
  }
};

start();
