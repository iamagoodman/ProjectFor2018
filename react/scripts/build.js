const paths = require('../config/paths.js');
const fs = require('fs');
// const archiver = require('archiver');

const prefix = process.argv[2] === 'local' ? paths.appBuildRelease : paths.appBuild;

// const output = fs.createWriteStream(prefix + '/归档.zip');
// const archive = archiver('zip', {
//   zlib: { level: 9 }
// });

// archive.pipe(output);
fs.readdir(prefix, function(err, files) {
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const file = prefix + '/' + filename;
    if (/^style\.\w+\.js$/.test(filename)) {
      const oldPath = prefix + '/' + filename;
      const newPath = prefix + `/style.js`;
      // archive.append(fs.createReadStream(file), { name: 'style.js' });
      fs.rename(oldPath, newPath, function(e) {
        console.log(e);
      });
    } else {
      // archive.append(fs.createReadStream(file), { name: filename });
    }
  }
  // archive.finalize();
});
