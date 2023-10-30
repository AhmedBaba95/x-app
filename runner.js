// Import required Node.js modules
const fs = require('fs');             // File system module
const path = require('path');         // Path module for file path manipulation
const http = require('http');         // HTTP module for creating a simple server

// Define the file path to the HTML file
const htmlFilePath = path.join(__dirname, 'index.html');

// Function to inject CSS and JS links into the HTML
function injectCSSandJS() {
  // Arrays to store the CSS and JS file names
  const cssFiles = [];
  const jsFiles = [];

  // Function to recursively read and gather CSS and JS files from sub-directories
  function readFiles(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);

      // Skip 'node_modules' and 'runner.js' files or directories
      if (file === 'node_modules' || file === 'runner.js') {
        continue;
      }

      if (fs.statSync(filePath).isDirectory()) {
        // If it's a directory, recursively read its contents
        readFiles(filePath);
      } else {
        // If it's a file, determine if it's CSS or JS and add it to the appropriate array
        if (file.endsWith('.css')) {
          cssFiles.push(file);
        } else if (file.endsWith('.js')) {
          jsFiles.push(file);
        }
      }
    }
  }

  // Read and gather CSS and JS files from sub-directories
  readFiles(__dirname);

  // Read the original HTML content
  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  // Inject CSS links into the HTML by replacing the </head> tag
  cssFiles.forEach((cssFile) => {
    htmlContent = htmlContent.replace('</head>', `  <link rel="stylesheet" href="./${cssFile}">\n</head>`);
  });

  // Inject JS links into the HTML by replacing the </body> tag
  jsFiles.forEach((jsFile) => {
    htmlContent = htmlContent.replace('</body>', `  <script src="./${jsFile}"></script>\n</body>`);
  });

  // Write the modified HTML content back to the file
  fs.writeFileSync(htmlFilePath, htmlContent);
}

// Create a simple HTTP server for serving your HTML file
const server = http.createServer((req, res) => {
  // Read the HTML content from the file
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  // Set the response headers to indicate content type
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Send the HTML content as the response
  res.end(htmlContent);
});

// Listen on a port (e.g., 3000)
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Initial injection of CSS and JS links into the HTML
injectCSSandJS();

// Watch for changes in CSS and JS files within the project directory
fs.watch(__dirname, { recursive: true }, (eventType, filename) => {
  // Check if the event is a file change and the file is a CSS or JS file
  if (eventType === 'change' && (filename.endsWith('.css') || filename.endsWith('.js'))) {
    console.log(`File changed: ${filename}`);
    
    // Inject CSS and JS links into the HTML and update it
    injectCSSandJS();
  }
});
