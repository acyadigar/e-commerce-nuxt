module.exports = class Service {
  async add(item){
    return this.model.create(item)
  }
  async findAll() {
    return this.model.find();
  }
  async del(itemId) {
    return this.model.deleteOne({ _id: itemId });
  }
  async find(itemId) {
    return this.model.findById(itemId);
  }
  async update(id, newItem) {
    return this.model.findByIdAndUpdate(id, newItem, {new: true});
  }
};