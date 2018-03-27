const storage = require('./storage');

class File {
  constructor(name, content) {
    this.name = name;
    this.storageKey = storage.addContent(content);
  }

  delete() {
    storage.deleteContent(this.storageKey);
  }

  read() {
    return storage.readContent(this.storageKey);
  }
}

module.exports = File;
