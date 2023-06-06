const BaseController = require("./base.controller");

class GeneralController {
    static async handlerNotFound(req, res) {
        let html = await BaseController.readFileData('./src/views/notfound.html');
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = GeneralController;