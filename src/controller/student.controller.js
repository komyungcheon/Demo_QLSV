const qs = require('qs');
const url = require('url');

const BaseController = require('./base.controller');
const studentModel = require('./../model/student.model');

class StudentController {
    static async getDisplayStudentPage(req, res) {
        if (req.method == 'GET') {
            let data = await studentModel.getAllStudent();
            let newHtml = '';
            data.forEach((student,index) => {
                newHtml += `<tr>`;
                newHtml += `<td>${index + 1}</td>`;
                newHtml += `<td><a href='/detailStudent?id=${student.id}'>${student.name}</a></td>`;
                newHtml += `<td>${student.nameClass}</td>`;
                newHtml += `<td>${student.assess}</td>`;
                newHtml += `<td>
                <button><a href='/update?id=${student.id}'>Sửa</a></button>
                <button><a href='/delete?id=${student.id}'>Xóa</a></button>
                </td>`
            });
            let html = await BaseController.readFileData('./src/views/display.html');
            html = html.replace('{list-student}', newHtml);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    static async getDetailPage(req, res) {
        let query = qs.parse(url.parse(req.url).query);
        if (query.id && req.method == 'GET') {
            let data = await studentModel.getDetailStudent(+query.id);
            let {id, name, assess, theo_point, prac_point, descript, nameClass} = data[0];
            let html = await BaseController.readFileData('./src/views/detail.html');
            let newHtml = '';
            newHtml += `<button><a href='/update?id=${id}'>Sửa</a></button>
            <button><a href='/delete?id=${id}'>Xóa</a></button>`
            html = html.replace('{name1}', name);
            html = html.replace('{name2}', name);
            html = html.replace('{class}', nameClass);
            html = html.replace('{theo-point}', theo_point);
            html = html.replace('{prac-point}', prac_point);
            if (assess == 1) {
                html = html.replace('{assess}', 'Đạt');
            } else html = html.replace('{assess}', 'Không Đạt');
            html = html.replace('{description}', descript);
            html = html.replace('{btn-content}', newHtml);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    static async addStudent(req, res) {
        if (req.method == 'GET') {
            let html = await BaseController.readFileData('./src/views/add.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', async () => {
                data = qs.parse(data);
                console.log(data);
                let {name, idClass, theo_point, prac_point, assess, descript} = data;
                console.log({name, idClass, theo_point, prac_point, assess, descript});
                await studentModel.addStudent(name, +idClass, +theo_point, +prac_point, +assess, descript);
                res.writeHead(301, {location: '/display'});
                res.end();
            })
            
        }
    }
}

module.exports = StudentController;