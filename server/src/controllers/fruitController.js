import { Router } from 'express';
import fruitService from '../services/fruitService.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const fruitController = Router();

fruitController.get('/', async (req, res) => {
    const query = req.query;

    const fruits = await fruitService.getAll(query);

    res.json(fruits);
});

fruitController.post('/', async (req, res) => {
    // const userId = req.user._id;
    const fruitData = req.body;

    try {
        const fruits = await fruitService.create(fruitData);
        // const fruits = await fruitService.create(fruitData, userId);
        res.json(fruits);
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }

});

fruitController.get('/:fruitId', async (req, res) => {
    const fruit = await fruitService.getOne(req.params.fruitId);

    res.json(fruit);
});

fruitController.delete('/:fruitId', async (req, res) => {
    try {
        await fruitService.delete(req.params.fruitId);

        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

fruitController.put('/:fruitId', async (req, res) => {
    const fruitData = req.body;
    const fruitId = req.params.fruitId;

    try {
        const updatedFruit = await fruitService.update(fruitId, fruitData);

        res.json(updatedFruit)
    } catch (err) {
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

export default fruitController;
