module.exports = class Category {
    constructor(id, name, parent){
        this._id = id; 
        this.name = name; 
        this.parent = parent; 
    }
}