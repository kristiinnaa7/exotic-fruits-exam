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


const Fruit = model('Fruit', fruitSchema)
export default Fruit;
