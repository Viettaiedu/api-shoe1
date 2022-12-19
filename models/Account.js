
const pool = require('../config/db');
class Account {
    constructor(username,password ){
        this.username = username;
        this.password = password;
    }
    async save() {
       const mysql = `insert into account (username,password) values('${this.username}', '${this.password}');`
       return pool.execute(mysql)
    }
    static find() {
        const  mysql = 'select * from account;';
        return pool.execute(mysql);
    }
    static findOne(username) {
      const  mysql = `select * from account where username='${username}';`
      return  pool.execute(mysql);
    }
}

module.exports = Account;