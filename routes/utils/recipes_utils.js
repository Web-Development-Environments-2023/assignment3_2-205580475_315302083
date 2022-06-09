const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";




/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getMultipleRecipeInformation(recipe_name,number_of_recipes) {
    return await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: recipe_name,
            number:number_of_recipes,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRandomInformation() {
    return await axios.get(`${api_domain}/random`,
    {params: {
        number: 3,
        apiKey: process.env.spooncular_apiKey}
    });
}


async function getRecipebyID(recipe_id) {
    let recipes_info =[];
    recipe_id.map((element) =>{recipes_info.push(getRecipeDetails(element))});
    let p = await Promise.all(recipes_info);
    return getMultipleRecipesPreview(p);
    }


async function getRecipeByName(recipe_name,num_of_recipes) {
        
        if (!num_of_recipes){
            num_of_recipes=5;
        }
        const result = await getMultipleRecipeInformation(recipe_name,num_of_recipes);
        let list=[];
        result.data.results.map((element)=>{list.push(getRecipeDetails(element.id))});
        let l= await Promise.all(list);
        return getMultipleRecipesPreview(l);
        }    

        
async function getRecipeFullDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree,extendedIngredients,instructions,servings } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        extendedIngredients:extendedIngredients,
        instructions:instructions,
        servings:servings,
    }
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getFamilyRecipebyID(recipes_list) {
    return recipes_list.map((recipe_info)=> {
        let data=recipe_info;
        const{
        recipe_name,
        image_url,
        time_to_make,
        popularity,
        is_vegetarian,
        is_vegan,
        contains_gluten,
        ingredients,
        instructions,
        number_of_portions,
        }=data;
        return {
            recipe_name: recipe_name,
            image_url: image_url,
            time_to_make: time_to_make,
            popularity: popularity,
            is_vegetarian:is_vegetarian,
            is_vegan: is_vegan,
            contains_gluten: contains_gluten,
            ingredients: ingredients,
            instructions: instructions,
            number_of_portions: number_of_portions,   
        }

    });
    }

async function getMyRecipebyID(recipes_list) {
        return getMultipleRecipesPreview(recipes_list);}


function getMultipleRecipesPreview(recipes_list) {
        return recipes_list.map((recipe_info)=> {
            let data=recipe_info;
            const{
            id,
            title,
            readyInMinutes,
            image,
            popularity,
            vegan,
            vegetarian,
            glutenFree,}=data;
            return {
                id: id,
                title: title,
                readyInMinutes: readyInMinutes,
                image: image,
                popularity: popularity,
                vegan: vegan,
                vegetarian: vegetarian,
                glutenFree: glutenFree,
            }

        });
    }
        

async function getThreeRandomRecipes() {

    let threeRecipes= await getRandomInformation();
    return getMultipleRecipesPreview(threeRecipes.data.recipes);
}

exports.getRecipeDetails = getRecipeDetails;
exports.getThreeRandomRecipes = getThreeRandomRecipes;
exports.getRecipebyID=getRecipebyID;
exports.getRecipeByName=getRecipeByName;
exports.getFamilyRecipebyID=getFamilyRecipebyID;
exports.getRecipeFullDetails=getRecipeFullDetails
exports.getMyRecipebyID=getMyRecipebyID