var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("./utils/DButils");


router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */

 router.get("/random", async (req, res, next) => {
 
  try {
    const recipes_info = await recipes_utils.getThreeRandomRecipes();
    res.send(recipes_info);
  } catch (error) {
   next(error);
  }
  });
  
  router.get("/recipesByName/:recipesName/:number?", async (req, res, next) => {
    try {
      const recipe = await recipes_utils.getRecipeByName(req.params.recipesName,req.params.number);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  
  });
  
  router.get("/FullRecipe/:recipeId", async (req, res, next) => {
    try {
      const recipe = await recipes_utils.getRecipeFullDetails(req.params.recipeId);
      res.send(recipe);
    } catch (error) {
      next(error);
    }
  });

router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }

});


module.exports = router;
