const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select distinct recipe_id from FavoriteRecipes where username='${user_id}'`);
    return recipes_id;
}
async function markAsWatched(user_id, recipe_id){
    await DButils.execQuery(`insert into WatchedRecipes values ('${user_id}',${recipe_id},NOW())`);
}
async function getWatchedRecipes(user_id){
    const recipes_id = await DButils.execQuery(`SELECT recipe_id FROM watchedrecipes where username='${user_id}' ORDER BY date_time DESC LIMIT 3`);
    return recipes_id;
}

async function AddFamilyRecipe(username,recipe_Name,recipe_url,recipe_time_to_make,recipe_popularity,
    recipe_is_vegeterian,recipe_is_vegan,recipe_containsgluten,recipe_ingredients,recipe_instructions,
    recipe_Number_of_portions){

    num_of_rows=await DButils.execQuery(`select * from FamilyRecipes`);
    await DButils.execQuery(`insert into FamilyRecipes values (${num_of_rows.length+1},'${recipe_Name}','${recipe_url}','${recipe_time_to_make}','${recipe_popularity}','${recipe_is_vegeterian}','${recipe_is_vegan}','${recipe_containsgluten}','${recipe_ingredients}','${recipe_instructions}','${recipe_Number_of_portions}','${username}')`);    
}

async function getFamilyRecipesId(user_id){
    const recipes_id = await DButils.execQuery(`SELECT * FROM FamilyRecipes where username='${user_id}'`);
    return recipes_id;
}

async function getFamilyRecipesRecipeByID(user_id,recipeId){
    const recipes_id = await DButils.execQuery(`SELECT * FROM FamilyRecipes where username='${user_id} and id='${recipeId}''`);
    return recipes_id;
}


async function AddMyRecipe(username,title,readyInMinutes,image,popularity,vegan,
    vegetarian,glutenFree,extendedIngredients,instructions,servings){

    num_of_rows=await DButils.execQuery(`select * from MyRecipes`);
    await DButils.execQuery(`insert into MyRecipes values (${num_of_rows.length+1},'${title}','${readyInMinutes}','${image}','${popularity}','${vegan}','${vegetarian}','${glutenFree}','${extendedIngredients}','${instructions}','${servings}','${username}')`);    
}

async function getMyRecipesId(user_id){
    const recipes_id = await DButils.execQuery(`SELECT * FROM MyRecipes where username='${user_id}'`);
    return recipes_id;
}

async function getMyRecipesRecipeByID(user_id,recipeId){
    const recipes_id = await DButils.execQuery(`SELECT * FROM MyRecipes where username='${user_id}' and id='${recipeId}'`);
    return recipes_id;
}


exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsWatched = markAsWatched;
exports.getWatchedRecipes = getWatchedRecipes;
exports.AddFamilyRecipe=AddFamilyRecipe;
exports.getFamilyRecipesId=getFamilyRecipesId;
exports.AddMyRecipe=AddMyRecipe
exports.getMyRecipesId=getMyRecipesId
exports.getMyRecipesRecipeByID=getMyRecipesRecipeByID
exports.getFamilyRecipesRecipeByID=getFamilyRecipesRecipeByID