const http = require('http');
const url = require('url');

const studentController = require('./src/controller/student.controller');
const GeneralController = require('./src/controller/general.controller');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let pathUrl = url.parse(req.url).pathname;
    let chosenRouter = (typeof router[pathUrl] !== 'undefined') ? router[pathUrl] : GeneralController.handlerNotFound;
    chosenRouter(req, res).catch(err => console.log(err.message));
})

router = {
    '/display': studentController.getDisplayStudentPage,
    '/detailStudent': studentController.getDetailPage,
    '/add': studentController.addStudent
}


server.listen(PORT, 'localhost', () => console.log(`Server is running at http://localhost:${PORT}`))