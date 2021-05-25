
import {API_URL, API_KEY, API_URL_ALL, RESULTS_PER_PAGE} from './config';
import {AJAX} from './helpers';

const postURL = `${API_URL}?key=${API_KEY}`;


export const state = {
    recipe: {}, 
    searchRes: {
      results: [], 
      page: 1,
      resultsPerPage: RESULTS_PER_PAGE
    }, 
    bookmarks: []
    
}


const createRecipeObject = function(recipe) {
  return {
    image: recipe.image_url, 
    ingredients: recipe.ingredients, 
    publisher: recipe.publisher, 
    sourceURL: recipe.source_url,
    id: recipe.id,
    title: recipe.title, 
    cookingTime: recipe.cooking_time, 
    servings: recipe.servings, 
    bookmarked: false,
    ...(recipe.key && {key : recipe.key})
  }
}


export const loadRecipe = async function(id) {

    try {
      let bookmarkedRecipe = state.bookmarks.find(recipe => {
        return recipe.id === id;
      })

      if(bookmarkedRecipe !== undefined) {
        state.recipe = bookmarkedRecipe;
      } else {
          const res = await AJAX(`${API_URL}/${id}?key=${API_KEY}`)
          const {data} = res; 
    
          let {recipe} = data;
          console.log(data)
          state.recipe = createRecipeObject(recipe)

      }






    } catch(err) {
      throw err;

    }


}



export const loadSearchResults = async function(query) {
    try {
        const res = await AJAX(`${API_URL_ALL}${query}&key=${API_KEY}`)
        const {data} = res;
        state.searchRes.results = data.recipes.map(recipe => {

          return {
            ...recipe,
            ...(recipe.key && {key : recipe.key})
          }
        })
        

    } catch(err) {
      console.error(err); 
      throw err;
    }


    state.searchRes.page = 1;




}


export const updateServings = function(newServings) {
  console.log(state.recipe.servings)
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  })

  state.recipe.servings = newServings;
 

}


export const getSearchPage = function(pageNum = state.searchRes.page) {
  state.searchRes.page = pageNum;

  const start = (pageNum - 1) * state.searchRes.resultsPerPage;
  const end = state.searchRes.resultsPerPage * pageNum;



  return state.searchRes.results.slice(start, end)

}



export const addBookmark = function(recipe) {
     
      if(recipe.bookmarked === true) return;
    
        state.bookmarks.push(recipe)
        console.log(state.bookmarks)
        
      
        if(recipe.id === state.recipe.id) {
          state.recipe.bookmarked = true;
        }

        persistBookmarks();

}



export const removeBookmark = function(recipe) {
   
    recipe.bookmarked = false;

   let filteredBookmarks = state.bookmarks.filter(bookedRecipe => {
      return bookedRecipe.id !== recipe.id
  })

    state.bookmarks = filteredBookmarks;

    persistBookmarks();
  
}


export const uploadRecipe = async function(newRecipeData) {

  try {
    const ingredients = Object.entries(newRecipeData).filter(item => {
      let key = item[0];
      let value = item[1];
  
       if(key.startsWith('ing') && value !== '') {
         return item
       }
    }).map(ing => {
      const ingArr = ing[1].replaceAll(' ', '').split(',');
      const [quantity, unit, description] = ingArr;
      if(ingArr.length < 3) throw new Error('Wrong ingredient format!')
  
      return {
        quantity: quantity ? +quantity : null,
        unit : unit ? unit : null,
        description: description ? description : ''
      }
    });


    const newRecipe = {
      title: newRecipeData.title, 
      source_url : newRecipeData.sourceUrl, 
      image_url: newRecipeData.image, 
      publisher: newRecipeData.publisher, 
      cooking_time: +newRecipeData.cookingTime, 
      servings: +newRecipeData.servings,
      ingredients
    }




    const res = await AJAX(postURL, newRecipe)


    const {recipe} = res.data;

    state.recipe = createRecipeObject(recipe);
    addBookmark(state.recipe)






  } catch(err) {
    throw err

  }





}



const persistBookmarks = function() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}


const clearBookmarks = function() {
   localStorage.clear('bookmarks')
}


const init = function() {
 const storage = localStorage.getItem('bookmarks'); 
 if(storage) {
   state.bookmarks = JSON.parse(storage);
 }
}



init();

