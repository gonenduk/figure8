const File = require('./file');

class Directory {
  constructor (name) {
    this.name = name;
    this.directories = {};
    this.files = {};
  }

  // ***** File functions

  isFileExist(name) {
    return this.files[name] !== undefined;
  }

  deleteFile(name) {
    if (this.isFileExist(name)) {
      this.files[name].delete();
      delete this.files[name];
    } else {
      throw new Error('File does not exist');
    }
  }

  saveFile(name, content) {
    // Delete if already exists
    if (this.isFileExist(name)) this.deleteFile(name);

    // Add new file
    this.files[name] = new File(name, content);
  }

  readFile(name) {
    if (this.isFileExist(name)) {
      return this.files[name].read();
    } else {
      throw new Error('File not found');
    }
  }

  // ***** Sub directory functions

  isEmpty() {
    return Object.keys(this.directories).length + Object.keys(this.files).length === 0;
  }

  isSubDirExist(name) {
    return this.directories[name] !== undefined;
  }

  addSubDir(name) {
    if (!this.isSubDirExist(name)) {
      this.directories[name] = new Directory(name);
    } else {
      throw new Error('Directory already exist');
    }
  }

  // ***** sub path functions

  getCreatePath(path) {
    const nextPathPos = path.indexOf('/') + 1;

    if (nextPathPos > 0) {
      // Get name of sub dir and remove current dir from path
      const nextPath = path.substr(nextPathPos);
      const subDirName = path.split('/')[1];

      // Create sub dir if does not exist
      if (!this.isSubDirExist(subDirName)) this.addSubDir(subDirName);

      // Continue to next sub dir
      return this.directories[subDirName].getCreatePath(nextPath);
    } else {
      // Last directory in path found. Return it
      return this;
    }
  }

  getPath(path) {
    const nextPathPos = path.indexOf('/') + 1;

    if (nextPathPos > 0) {
      // Get name of sub dir and remove current dir from path
      const nextPath = path.substr(nextPathPos);
      const subDirName = path.split('/')[1];

      // Throw error if sub dir does not exist
      if (!this.isSubDirExist(subDirName)) {
        throw new Error('Directory does not exist');
      }

      // Continue to next sub dir
      return this.directories[subDirName].getPath(nextPath);
    } else {
      // Last directory in path found. Return it
      return this;
    }
  }

  deleteFileAndPath(path, name) {
    const nextPathPos = path.indexOf('/') + 1;

    if (nextPathPos > 0) {
      // Get name of sub dir and remove current dir from path
      const nextPath = path.substr(nextPathPos);
      const subDirName = path.split('/')[1];

      // Throw error if sub dir does not exist
      if (!this.isSubDirExist(subDirName)) {
        throw new Error('Directory does not exist');
      }

      // Check if sub dir is empty and delete it
      const isSubDirEmpty = this.directories[subDirName].deleteFileAndPath(nextPath, name);
      if (isSubDirEmpty) {
        delete this.directories[subDirName];
      }
    } else {
      // Last directory in path found. Delete file
      this.deleteFile(name);
    }

    // Return if current dir is empty to continue the chain
    return this.isEmpty();
  }

  list(fullPath = '') {
    fullPath += this.name;

    // Print current directory name
    console.log(fullPath);

    // Print file names in current directory
    Object.keys(this.files).forEach((name) => {
      console.log(`${fullPath}/${name}`);
    });

    // Print sub directory names
    Object.keys(this.directories).forEach((subDirName) => {
      this.directories[subDirName].list(fullPath + '/');
    });
  }
}

module.exports = Directory;
