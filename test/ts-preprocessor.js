const fs = require('fs');
const path = require("path");
const ts = require('typescript');

function parseTsConfig(tsconfigPath) {
  var parsed = ts.parseConfigFileTextToJson(tsconfigPath, fs.readFileSync(tsconfigPath, 'utf8'));
  if (parsed.error) {
    throw new Error(parsed.error.messageText);
  }

  if (!parsed.config || !parsed.config.compilerOptions) {
    return null;
  }
  return parsed.config.compilerOptions;
}

const cwd = process.cwd();
const tsconfigPath = ts.findConfigFile(cwd, fs.existsSync);
let tsconfigBasepath = null;
let compilerOptions = null;

if (tsconfigPath) {
  compilerOptions = parseTsConfig(tsconfigPath);
  tsconfigBasepath = path.dirname(tsconfigPath);
}

module.exports = {
  process(src, path) {
    let js;
    if(path.endsWith(".ts") || path.endsWith(".tsx")){
      return ts.transpile(src, compilerOptions, path, []);
    }else{
      return src;
    }
  }
};