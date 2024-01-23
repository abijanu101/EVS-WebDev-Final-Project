module.exports = class User {
    constructor(id, name, isAdmin = false) {
        this._id = id;
        this.name = name;
        this.isAdmin = isAdmin;
    }
}