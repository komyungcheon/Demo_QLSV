const http = require('http');
const url = require('url');

const HomestayController = require('./src/controller/homestay.controller');
const GeneralController = require('./src/controller/general.controller');

const server = http.createServer((req, res) => {
    let pathUrl = url.parse(req.url).pathname;
    let chosenRouter = (typeof router[pathUrl] !== 'undefined') ? router[pathUrl] : GeneralController.handlerNotFound;
    chosenRouter(req, res).catch(err => console.log(err.message));
})

router = {
    '/' : HomestayController.getDisplayHomestayPage,
    '/display': HomestayController.getDetailHomestay,
    '/add': HomestayController.addHomestay,
    '/update': HomestayController.updateHomestay,
    '/delete': HomestayController.deleteHomestay
}


server.listen(8080, 'localhost', () => console.log(`Server is running`))