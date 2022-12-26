
const pool = require('../config/db.js');
class Cart {
    constructor(id,gender,size,price,star,name,image,discount,trademark,state,qty , user_id ) {
        this.id = id;
        this.gender = gender;
        this.size = size;
        this.price = price;
        this.star = star;
        this.name = name;
        this.image = image;
        this.discount = discount;
        this.trademark = trademark;
        this.state = state;
        this.qty = qty;
        this.user_id = user_id;
    }
    async save() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        var createAt= "'"+today+"'";
        const mysql = `
        insert into cart(id,gender,size,price,star,name,image,discount,trademark,state,qty,createAt ,user_id)
        values(${this.id},"${this.gender}",${this.size},"${this.price}",${this.star},"${this.name}","${this.image}",${this.discount},"${this.trademark}","${this.state}",${this.qty},${createAt},'${this.user_id}');
        `
       return pool.execute(mysql);
    }
    static find(id) {
        const mysql =`select * from cart where user_id=${id};`;
        return pool.execute(mysql);
    }

    static findOne(id , userId) {
        const mysql = `select * from cart where id=${id} AND user_id=${userId};`;
        return pool.execute(mysql);
    }
    static findById(id) {
        const mysql = `select * from cart where id=${id};`;
        return pool.execute(mysql);
    }

    static update(id, qty , size,userId) {
        const mysql =`update cart set qty=${qty}, size=${size} where id=${id} and user_id=${userId};`;
        return pool.execute(mysql);
    }
    static delete(id) {
        const mysql =`delete from cart where id=${id};`;
        return pool.execute(mysql);
    }
}

module.exports = Cart;