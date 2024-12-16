import { Schema, model, Types } from "mongoose";
const fruitSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,  
    },
    origin: {
      type: String,
      required: true,  
    },
    description: {
      type: String,
      required: true,  
    },
    image: {
      type: String,  
      required: false,  
    },
  
  }, { timestamps: { createdAt: 'created_at' } });

// const fruitSchema = new Schema({
//     make: String,
//     price: {
//         type: Number,
//         min: 0,
//     },
//     model: {
//         type: String,
//         minLength: 4,
//     },
//     img: {
//         type: String,
//         required: true,
//     },
//     year: {
//         type: Number,
//         min: 1950,
//         max: 2050,
//     },
//     material: String,
//     description: {
//         type: String,
//         minLength: 10,
//     },
//     _ownerId: {
//         type: Types.ObjectId,
//         ref: 'User',
//     }
// });

// const Furniture = model('Furniture', furnitureSchema);
const Fruit = model('Fruit', fruitSchema)
export default Fruit;
