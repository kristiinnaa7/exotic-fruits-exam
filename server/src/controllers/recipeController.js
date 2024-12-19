import { Router } from 'express';
import recipeService from '../services/recipeService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const recipeController = Router();

recipeController.get('/', async (req, res) => {
    const query = req.query;

    const recipes = await recipeService.getAll(query);

    res.json(recipes);
});

recipeController.post('/', async (req, res) => {
    const recipeData = req.body;

    try {
        const recipes = await recipeService.create(recipeData);
        res.json(recipes);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }

});

recipeController.get('/:recipeId', async (req, res) => {
    const recipe = await recipeService.getOne(req.params.recipeId);

    res.json(recipe);
});

recipeController.delete('/:recipeId', async (req, res) => {
    try {
        await recipeService.delete(req.params.recipeId);

        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

recipeController.put('/:recipeId', async (req, res) => {
    const recipeData = req.body;
    const recipeId = req.params.recipeId;

    try {
        const updatedRecipe = await recipeService.update(recipeId, recipeData);

        res.json(updatedRecipe)
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

export default recipeController;
