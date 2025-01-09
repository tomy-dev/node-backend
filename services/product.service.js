const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
class ProductService {
    
    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        for (let index = 0; index < 100; index++) {
            this.products.push({
                id: faker.string.uuid(),
                name:faker.commerce.productName(),
                price:parseInt(faker.commerce.price()),
                image:faker.image.url(),
                isBlock:faker.datatype.boolean()

            })
        }
    }

    getAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        });
             
    }
    async getById(id) {
        let index = this.products.findIndex(product => product.id === id);
        if(index === -1) {
            throw boom.notFound('Product not found');
        }
        return this.products[index];
    }
    create({name, price, image}) {
        const product = {
            id: this.products.length + 1,
            name,
            price,
            image
        }
        this.products.push(product);
        return product;
    }

    update(id, {name, price, image}) {
        const index = this.products.findIndex(product => product.id === id);
        if(index === -1) {
            throw boom.notFound('Product not found');
        }
        if(name === undefined || price === undefined || image === undefined) {
            throw boom.badRequest('Missing fields');
        }
        const product = this.products[index];
        if(product.isBlock) {
            throw boom.conflict('Product is blocked');
        }
        product.name = name;
        product.price = price;
        product.image = image;
        this.products[index] = product;
        return product;
    }
    delete(id) {
        const index = this.products.findIndex(product => product.id === id);
        if(index === -1) {
            throw boom.notFound('Product not found');
        }
        console.log(this.products.splice(index, 1));
        
        return {message: 'Product deleted'};
    }

}

module.exports = ProductService;