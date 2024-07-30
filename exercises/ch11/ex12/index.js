import * as fs from 'fs';

class FileSizeError extends Error {
  constructor(message, filePath, fileSize, maxAllowedSize) {
    super(message);
    this.filePath = filePath;
    this.fileSize = fileSize;
    this.maxAllowedSize = maxAllowedSize;
  }
}

function checkFileSize(filePath, maxAllowedSize) {
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  console.log(`fileSize: ${fileSize}`)
  
  if (fileSize > maxAllowedSize) {
    throw new FileSizeError(`File size exceeds the allowed limit.`, filePath, fileSize, maxAllowedSize);
  } else {
    console.log("File size is within the allowed limit.");
  }
}

// 使用例
const filePath = './10-mb-file.txt';
const maxAllowedSize = 1024 * 1024; // 1MB
// const maxAllowedSize = 104857600; // 100MB

try {
  checkFileSize(filePath, maxAllowedSize);
} catch (error) {
  if (error instanceof FileSizeError) {
    console.error(`Error: ${error.message}`);
    console.error(`File: ${error.filePath}`);
    console.error(`File Size: ${error.fileSize} bytes`);
    console.error(`Max Allowed Size: ${error.maxAllowedSize} bytes`);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}