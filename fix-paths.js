const fs = require('fs');
const path = require('path');

// Recursively find all HTML files in the out directory
function findHtmlFiles(dir) {
  let htmlFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      htmlFiles = htmlFiles.concat(findHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });

  return htmlFiles;
}

// Fix paths in HTML files
function fixPaths() {
  const outDir = path.join(__dirname, 'out');

  if (!fs.existsSync(outDir)) {
    console.log('out directory not found');
    return;
  }

  const htmlFiles = findHtmlFiles(outDir);

  htmlFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace absolute image paths with relative ones
    content = content.replace(/href="\/images\//g, 'href="./images/');
    content = content.replace(/src="\/images\//g, 'src="./images/');

    // Replace absolute paths for other assets if needed
    content = content.replace(/href="\/public\//g, 'href="./public/');
    content = content.replace(/src="\/public\//g, 'src="./public/');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed paths in: ${filePath}`);
  });

  console.log(`Total files processed: ${htmlFiles.length}`);
}

fixPaths();
