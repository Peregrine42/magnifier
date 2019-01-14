const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

function startServer(port) {
  var h = http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }).listen(parseInt(port, 10));

  console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

  return h
}

(async function example() {
  let h = startServer(8000)

  try {
    let driver = new webdriver.Builder()
      .forBrowser('firefox')
      .usingServer('http://localhost:4444/wd/hub')
      .build();

    await driver.get('http://localhost:8000');
    await driver.wait(until.titleIs('Magnifier'), 1000);
  } finally {
    if (driver) {
      await driver.quit();
    }
    await h.close()
  }
})();
