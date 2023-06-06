const qs = require('qs');
const url = require('url');

const BaseController = require('./base.controller');
const homestayModel = require('../model/homestay.model');

class HomestayController {
    static async getDisplayHomestayPage(req, res) {
        if (req.method === 'GET') {
            let data = await homestayModel.getDetailHomestay();
            let newHtml = '';
            data.forEach((homestay,index) => {
                newHtml += `<tr>`;
                newHtml += `<td>${index + 1}</td>`;
                newHtml += `<td><a href='/detailHomestay?id=${homestay.id}'>${homestay.name}</a></td>`;
                newHtml += `<td>${homestay.city}</td>`;
                newHtml += `<td>${homestay.price}</td>`;
                newHtml += `<td>
               <button class='btn btn-primary'><a href='/update?id=${homestay.id}' class="text-decoration-none" style="color: white;">Sửa</a></button>
                <button class='btn btn-danger'><a href='/delete?id=${homestay.id}' class="text-decoration-none" style="color: white;">Xóa</a></button>
                </td>`
            });
            let html = await BaseController.readFileData('./src/views/display.html');
            html = html.replace('{list-homestay}', newHtml);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    static async getDetailHomestay(req, res) {
        let query = qs.parse(url.parse(req.url).query);
        if (query.id && req.method === 'GET') {
            let data = await homestayModel.getDetailHomestay();
            let {id,name,city,bedrooms,price,toilet,describes} = data[0];
            let html = await BaseController.readFileData('./src/views/detail.html');
            let newHtml = '';
            newHtml += `<button><a href='/update?id=${id}'>Sửa</a></button>
            <button><a href='/delete?id=${id}'>Xóa</a></button>`
            html = html.replace('{name1}', name);
            html = html.replace('{name2}', name);
            html = html.replace('{city}', city);
            html = html.replace('{bedrooms}', bedrooms);
            html = html.replace('{price}', price);
            html = html.replace('{toilet}', toilet);
            html = html.replace('{describes}', describes);
            html = html.replace('{btn-content}', newHtml);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    static async addHomestay(req, res) {
        try {
            if (req.method === 'GET') {
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
                    let {name,city,bedrooms,price,toilet,describes} = data;
                    console.log({name,city,bedrooms,price,toilet,describes});
                    await homestayModel.addHomestay(name, +city, +bedrooms, +price, +toilet, +describes);
                    res.writeHead(301, {location: '/display'});
                    res.end();
                })

            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    static async updateHomestay(req, res) {
        let query = qs.parse(url.parse(req.url).query);
        if (query.id && req.method === 'GET') {
            let data = await homestayModel.getDetailHomestay(+query.id);
            let {name,city,bedrooms,price,toilet,describes} = data[0];
            let html = await BaseController.readFileData('./src/views/update.html');
            html = html.replace('{name}', `<label for="name" class="form-label">Tên</label>
            <input type="text" class="form-control" id="name" name="name" value = ${name}>`);
            html = html.replace('{city}', `<option value="${city}" selected>${city}</option>`);
            html = html.replace('{bedrooms}', `<label for="bedrooms" class="form-label">Số Phòng Ngủ</label>
            <input type="number" class="form-control" id="bedrooms" name="bedrooms" value = ${bedrooms}>`);
            html = html.replace('{toilet}', `<label for="toilet" class="form-label">Số Phòng Vệ Sinh</label>
            <input type="number" class="form-control" id="toilet" name="num_badroom" value = ${toilet}>`);
            html = html.replace('{price}', `<label for="price" class="form-label">Giá</label>
            <input type="number" class="form-control" id="price" name="price" value = ${price}>`);
            html = html.replace('{describes}', `${describes}`);

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', async () => {
                data = qs.parse(data);
                let {name, city, bedrooms, toilet, price, describes} = data;
                await homestayModel.updateHomestay(+query.id, name, +city, +bedrooms, +toilet, +price, describes).catch(err => console.log(err.message));
                res.writeHead(301, {location: '/'});
                res.end();
            })
        }
    }
}

module.exports = HomestayController;