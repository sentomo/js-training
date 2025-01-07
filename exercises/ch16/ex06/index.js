import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.truncate(path.resolve(__dirname,"truncate-test.txt"), 30, (err) => {
  if (err) throw err;
  console.log("File has been extended!");
});