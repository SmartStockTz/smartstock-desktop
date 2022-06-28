const bfast = require('bfast');
const pkg = require('./package.json');
const { createReadStream } = require("fs");
const { join } = require("path");
const glob = require("glob");

bfast.init({
  applicationId: 'smartstock_lb',
  projectId: 'smartstock'
});
const files = glob.sync('**/dist/*.dmg');

if (Array.isArray(files) && files.length > 0) {
  bfast.storage().save({
    filename: `smartstock-${pkg.version}.dmg`,
    pn: true,
    data: createReadStream(join(__dirname, files[0]))
  }, progress => {
    console.log(progress);
  }).then(console.log).catch(reason => {
    console.error(reason);
    process.exit(-1)
  });
}
throw new Error("NO BUILD TO PUBLISH");
