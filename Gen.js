import fs from 'fs';
import path from 'path';

// Function to recursively print the directory structure
function printDirectoryStructure(dirPath, indent = '') {
  const items = fs.readdirSync(dirPath); // Read the contents of the directory

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`${indent}📂 ${item}`); // Print directory with a folder emoji
      printDirectoryStructure(fullPath, indent + '  '); // Recurse into subdirectory
    } else {
      console.log(`${indent}📄 ${item}`); // Print file with a file emoji
    }
  });
}

// Start printing from the current directory
printDirectoryStructure(process.cwd(), '');
