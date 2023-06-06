const BaseModel = require('./base.model')

class StudentModel extends BaseModel {
    async getAllStudent() {
        let sql = `SELECT s.id, s.name, s.assess, c.nameClass FROM STUDENT as s
        join Class as c on s.idClass = c.idClass`;
        return await this.querySql(sql);
    }

    async getDetailStudent(id) {
        let sql = `SELECT s.id, s.name, s.assess, s.theo_point, s.prac_point, s.descript, c.nameClass FROM Student as s
        join class as c on s.idClass = c.idClass where s.id = ${id}`;
        return await this.querySql(sql);
    }

    async addStudent(name, idClass, theo_point, prac_point, assess, descript) {
        let sql = `insert into Student (name, idClass, theo_point, prac_point, assess, descript) values
        ('${name}', ${idClass}, ${theo_point}, ${prac_point}, ${assess}, '${descript}')`;
        await this.querySql(sql);
    }
}

module.exports = new StudentModel;