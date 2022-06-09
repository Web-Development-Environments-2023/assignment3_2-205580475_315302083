var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT username FROM users").then((users) => {
      if (users.find((x) => x.username === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});




/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    //let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];

    recipes_id.map((element) => {recipes_id_array.push(element.recipe_id)}); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipebyID(recipes_id_array);
   // const results = await recipe_utils.getRecipeDetails(recipes_id_array[0]);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});




router.post('/FamilyRecipes', async (req,res,next) => {
  try{
    const username = req.session.user_id;
    const recipe_Name = req.body.recipeName;
    const recipe_url = req.body.recipe_url;
    const recipe_time_to_make = req.body.time_to_make;
    const recipe_popularity = req.body.popularity;
    const recipe_is_vegeterian = req.body.is_vegeterian;
    const recipe_is_vegan = req.body.is_vegan;
    const recipe_containsgluten = req.body.containsgluten;
    const recipe_ingredients = req.body.ingredients;
    const recipe_instructions= req.body.instructions;
    const recipe_Number_of_portions = req.body.Number_of_portions;
    await user_utils.AddFamilyRecipe(username,recipe_Name,recipe_url,recipe_time_to_make,recipe_popularity,
    recipe_is_vegeterian,recipe_is_vegan,recipe_containsgluten,recipe_ingredients,recipe_instructions,recipe_Number_of_portions);
    res.status(200).send("New Family Recipe was added");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/FamilyRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getFamilyRecipesId(user_id);
    //let recipes_id_array = [];
    //recipes_id.map((element) => {recipes_id_array.push(element.id)}); //extracting the recipe ids into array
    const results = await recipe_utils.getFamilyRecipebyID(recipes_id);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post('/MyRecipes', async (req,res,next) => {
  try{
    const username = req.session.user_id;
    const title = req.body.title;
    const readyInMinutes = req.body.readyInMinutes;
    const image = req.body.image;
    const popularity = req.body.popularity;
    const vegan = req.body.vegan;
    const vegetarian=req.body.vegetarian;
    const glutenFree = req.body.glutenFree;
    const extendedIngredients = req.body.extendedIngredients;
    const instructions= req.body.instructions;
    const servings = req.body.servings;
    await user_utils.AddMyRecipe(username,title,readyInMinutes,image,popularity,vegan,
      vegetarian,glutenFree,extendedIngredients,instructions,servings);
    res.status(200).send("New My Recipe was added");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/MyRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getMyRecipesId(user_id);
    //let recipes_id_array = [];
    //recipes_id.map((element) => {recipes_id_array.push(element.id)}); //extracting the recipe ids into array
    const results = await recipe_utils.getMyRecipebyID(recipes_id);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


router.get('/LastViewed', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipes_id = await user_utils.getWatchedRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => {recipes_id_array.push(element.recipe_id)}); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipebyID(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post('/LastViewed', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsWatched(user_id,recipe_id);
    res.status(200).send("The Recipe was marked as watch");
    } catch(error){
    next(error);
  }
})


module.exports = router;
