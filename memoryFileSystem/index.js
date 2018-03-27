const Directory = require('./directory');

class Drive {
  constructor () {
    // Create root dir
    this.root = new Directory('.');
  }

  getFile(path, name) {
    const directory = this.root.getPath(path);
    return directory.readFile(name);
  }

  saveFile(path, name, content) {
    const directory = this.root.getCreatePath(path);
    directory.saveFile(name, content);
  }

  deleteFile(fullPath) {
    // Convert to path and name
    const path = fullPath.substr(0, fullPath.lastIndexOf('/'));
    const name = fullPath.split('/').pop();
    const directory = this.root.getPath(path);
    directory.deleteFile(name);
    this.root.deleteEmptyPath(path);
  }

  list(path) {
    const directory = this.root.getPath(path);
    directory.list();
  }
}

module.exports = Drive;