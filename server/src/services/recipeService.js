import querystring from 'querystring';
import Recipe from "../models/recipeModel.js";


const recipeService = {
    getAll(filter = {}) {
        const query = Recipe.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))

            query.find(q)
        }

        return query;
    },
    getOne(recipeId) {
        return Recipe.findById(recipeId);
    },
    create(recipeData) {
        return Recipe.create({ ...recipeData,});
    },
    delete(recipeId) {
        return Recipe.findByIdAndDelete(recipeId);
    },
    update(recipeId, recipeData) {
        return Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true });
    }
};

export default recipeService;
