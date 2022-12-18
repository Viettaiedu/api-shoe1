
const pool = require('../config/db');

class Product {
    constructor(gender ,size , price , star , name ,image , discount ,trademark ,state) {
        this.gender = gender;
        this.size = size;
        this.price = price;
        this.star = star;
        this.name = name;
        this.image = image;
        this.discount = discount;
        this.trademark = trademark;
        this.state = state;

    }

    async createOneProduct() {
        const sql = `INSERT INTO product (
            gender ,size , price , star , name ,image , discount,trademark,state
        )
        values('${this.gender}','${this.size}','${this.price}','${this.star}','${this.name}','${this.image}','${this.discount}','${this.trademark}','${this.state}');
        `;
        const [nike , _] = await pool.execute(sql);
        return nike;
    }
    static findAll() {
        const sql = 'select * from product;';
        return pool.execute(sql);
    }

    static findOtherBrands() {
        const sql = 'select * from `otherbrands`;';
        return pool.execute(sql);
    }

    static findPage(PAGES_SIZE,limit) {
        const sql = `select * from product limit ${PAGES_SIZE} offset ${limit};`
        return pool.execute(sql);
    }

    static findById(id) {
        const sql = `select * from product where id=${id};`;
        return pool.execute(sql);
    }
}

module.exports = Product;