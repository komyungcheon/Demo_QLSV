const BaseModel = require('./base.model')
const qs = require('qs')

class HomestayModel extends BaseModel {
    async getAllHomestay() {
        let sql = `SELECT h.id, h.name, h.city, h.bedrooms ,h.price,h.toilet,h.describes FROM Homestay as h`

        return await this.querySql(sql);
    }

    async getDetailHomestay(id) {
         let sql = `SELECT h.id, h.name, h.city, h.price from homestay as h`
        return await this.querySql(sql);
    }

    async addHomestay(name,city,bedrooms,price,toilet,describes) {
        let sql = `insert into homestay (name,city,bedrooms,price,toilet,describes) values
        ('${name}','${city}',${bedrooms},${price},${toilet},'${describes}')`;
        await this.querySql(sql);
    }

    async updateHomestay(id,name,city,bedrooms,price,toilet,describes){
        let sql = `UPDATE Homestay
        SET name = '${name}', city = ${city}, bedrooms = ${bedrooms},
        toilet = ${toilet}, price = ${price}, describes = '${describes}'
        WHERE id = ${id}`;
        await this.querySql(sql);

    }
    static async deleteHomestay(req, res) {
        let query = qs.parse(url.parse(req.url).query);
        if (req.method === "GET") {
            let html = await HomestayModel.readFileData('./src/views/delete.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            await HomestayModel.deleteHomestay(+query.id).catch(err => console.log(err));
            res.writeHead(301, {location: '/'});
            res.end();
        }
    }
}

module.exports = new HomestayModel;