import querystring from 'querystring';
import Fruit from "../models/fruitModel.js";


const fruitService = {
    getAll(filter = {}) {
        const query = Fruit.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))

            query.find(q)
        }

        return query;
    },
    getOne(fruitId) {
        return Fruit.findById(fruitId);
    },
    create(fruitData) {
        return Fruit.create({ ...fruitData,});
    },
    delete(fruitId) {
        return Fruit.findByIdAndDelete(fruitId);
    },
    update(fruitId, fruitData) {
        return Fruit.findByIdAndUpdate(fruitId, fruitData, { runValidators: true });
    }
};

export default fruitService;
