const fs = require('fs');
const lines = fs.readFileSync('c:/Users/Hp/.claude/projects/c--Users-Hp-Downloads-SW/7f0e30de-4205-4588-8865-85ddbdb2d31d.jsonl', 'utf8').split('\n');

let bestLine = -1;
let bestLength = 0;
let bestContent = '';

lines.forEach((line, i) => {
  if (!line.includes('Premium Adult Entertainment Hub')) return;
  try {
    const parsed = JSON.parse(line);
    // Walk all string values in the parsed object recursively
    function findHtml(obj) {
      if (typeof obj === 'string') {
        if (obj.includes('<!DOCTYPE html>') && obj.includes('Premium Adult Entertainment Hub') && obj.includes('hero-fw-h1')) {
          if (obj.length > bestLength) {
            bestLength = obj.length;
            bestLine = i;
            bestContent = obj;
          }
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(findHtml);
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(findHtml);
      }
    }
    findHtml(parsed);
  } catch(e) {}
});

console.log('Best line:', bestLine, 'Length:', bestLength);
if (bestContent) {
  fs.writeFileSync('c:/Users/Hp/Downloads/SW/index.html', bestContent, 'utf8');
  console.log('Written successfully!');
  console.log('First 200 chars:', bestContent.slice(0, 200));
} else {
  console.log('No content found');
}
