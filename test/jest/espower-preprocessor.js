const fs = require('fs');
const tsc = require('typescript');
const json = require('comment-json');
const tsConfig = json.parse(fs.readFileSync(__dirname + "/../../tsconfig.json"));
const espowerSource = require("espower-source");

module.exports = {
  process(src, path) {
    const js = (path.endsWith('.ts') || path.endsWith('.tsx')) ? tsc.transpile(src, tsConfig.compilerOptions, path, []) : src;
    return espowerSource(js);
  },
};