var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");
const DButils = require("./utils/DButils");


router.get("/", (req, res) => res.send("im here"));


router.get("/w", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DButils.execQuery("SELECT username FROM users");
    if (users.find((x) => x.username === req.body.username))
      res.send(req.body.username);
  } catch (error) {
      next(error);
  }
});


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
  
  router.get("/recipesByName", async (req, res, next) => {
    try {
      const recipe = await recipes_utils.getRecipeByName(req.body.recipesName,req.body.number);
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
