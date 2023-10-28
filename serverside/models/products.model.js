module.exports = class Category {
    constructor(id, name, price, details, categories = []){
        this._id = id; 
        this.name = name; 
        this.price = price;
        this.details = details;
        this.categories = categories; 
    }
}