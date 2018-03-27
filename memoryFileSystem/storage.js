const data = {};

function calcChecksum(string) {
  let checksum = 0x12345678;
  for (let index = 0; index < string.length; index++) {
    checksum += (string.charCodeAt(index) * (index + 1));
  }
  return checksum;
}

module.exports = {
  addContent(text) {
    // Calc checksum of content to create a unique key
    const key = calcChecksum(text);

    // Content already exists in storage. Increase use count
    if (data[key]) {
      data[key].useCount += 1;

    // New content
    } else {
      data[key] = {
        text: text,
        useCount: 1
      };
    }

    return key;
  },

  deleteContent(key) {
    const content = data[key];

    // Content exist. Decrease use count. If 0 delete content
    if (content) {
      content.useCount--;
      if (content.useCount === 0) delete data[key];
    // Content doesn't exist
    } else {
      throw new Error('Content does not exist');
    }
  },

  readContent(key) {
    const content = data[key];

    if (content) {
      return content.text;
    } else {
      throw new Error('Content does not exist');
    }
  }
};
