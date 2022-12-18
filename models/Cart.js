
const pool = require('../config/db');
class Cart {
    constructor(id,gender,size,price,star,name,image,discount,trademark,state,qty) {
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
    }
    async save() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        var createAt= "'"+today+"'";
        const mysql = `
        insert into cart(id,gender,size,price,star,name,image,discount,trademark,state,qty,createAt)
        values(${this.id},"${this.gender}",${this.size},"${this.price}",${this.star},"${this.name}","${this.image}",${this.discount},"${this.trademark}","${this.state}",${this.qty},${createAt});
        `
       return pool.execute(mysql);
    }

    static find() {
        const mysql =`select * from cart`;
        return pool.execute(mysql);
    }

    static findById(id) {
        const mysql = `select * from cart where id=${id}`;
        return pool.execute(mysql);
    }

    static update(id,qty) {
        const mysql =`update cart set qty=${qty} where id=${id};`;
        return pool.execute(mysql);
    }
    static delete(id) {
        const mysql =`delete from cart where id=${id};`;
        return pool.execute(mysql);
    }
}

module.exports = Cart;