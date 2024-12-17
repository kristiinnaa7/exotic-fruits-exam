import { Schema, model } from "mongoose";
const recipeSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,  
    },
    ingredients: {
      type: Array,
      required: true,  
    },
    image: {
      type: String,  
      required: false,  
    },
  
  }, { timestamps: { createdAt: 'created_at' } });


const Recipe = model('Recipe', recipeSchema)
export default Recipe;