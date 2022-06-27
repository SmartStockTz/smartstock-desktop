const bfast = require('bfast');
const pkg = require('./package.json');
const {createReadStream} = require("fs");
const {join} = require("path");
const glob = require("glob");

bfast.init({
  applicationId: 'smartstock_lb',
  projectId: 'smartstock'
});
const files = glob.sync('**/dist/*.dmg');

console.log(files);

// bfast.storage().save({
//   filename: `smartstock-${pkg.version}.dmg`,
//   pn: true,
//   data: createReadStream(join(__dirname, 'dist', `smartstock-${pkg.version}.dmg`))
// }, progress => {
//   console.log(progress);
// }).then(console.log).catch(reason => {
//   console.error(reason);
//   process.exit(-1)
// });
