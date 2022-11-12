const fs = require('fs')
const path = require('path')

function copyPackage() {
  const source = fs
    .readFileSync(__dirname + '/../package.json')
    .toString('utf-8')

  const sourceObj = JSON.parse(source)

  delete sourceObj.scripts
  delete sourceObj.devDependencies

  fs.writeFileSync(
    __dirname + '/../dist/package.json',
    Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8')
  )
}

function copyFiles() {
  const filesToCopy = [
    'LICENSE',
    'README.md',
    '.npmignore'
  ]

  for (const file of filesToCopy) {
    fs.copyFileSync(__dirname + '/../' + file, __dirname + '/../dist/' + file)
  }
}

function preparePackage() {
  copyPackage()
  copyFiles()
}

preparePackage()
