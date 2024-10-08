const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command-line arguments
const args = minimist(process.argv.slice(2));
console.log(args);

// Variables to hold content
let homePage = "";
let projectPage = "";
let registrationPage = "";

// Set port from arguments or use default
const serverPort = parseInt(args.port) || 3000;

// Function to read HTML file
const loadFileContent = (filePath, callback) => {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.error(`Error reading ${filePath}:`, error);
      process.exit(1);
    }
    callback(content);
  });
};

// Load HTML files asynchronously
loadFileContent("home.html", (content) => (homePage = content));
loadFileContent("project.html", (content) => (projectPage = content));
loadFileContent("registration.html", (content) => (registrationPage = content));

// Create the server
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    // Determine response based on URL
    switch (req.url) {
      case "/project":
        res.write(projectPage);
        break;
      case "/registration":
        res.write(registrationPage);
        break;
      default:
        res.write(homePage);
        break;
    }

    res.end();
  })
  .listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
  });
