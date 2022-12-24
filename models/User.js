
const pool = require('../config/db');
class User {
    constructor(email,password,role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    async save() {
        const mysql = `INSERT INTO users(email,password,role)
        values('${this.email}', '${this.password}','${this.role};')`
        return   pool.execute(mysql);
    }

    static findOne(condition) {
        let mysql
        if(typeof condition === "string") {
            mysql = `select * from users where email='${condition}';`;
        }else{
            mysql = `select * from users where id='${condition}';`;
        }
        return pool.execute(mysql);
    }

    static find() {
        const mysql = `SELECT * FROM users;`
        return pool.execute(mysql);
    }

    static update(value,id) {
        const mysql = `UPDATE users SET password='${value}' WHERE id='${id}';`
        return pool.execute(mysql);
    }

    static destroy(id) {
        const mysql = `DELETE FROM users WHERE id="${id}";`;
        return pool.execute(mysql);
    }
 
}

module.exports = User;