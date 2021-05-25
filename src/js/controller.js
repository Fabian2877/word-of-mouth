import * as model from './model';
import {MODAL_TIMEOUT_SECS } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';



// if(module.hot) {
//   module.hot.accept();
// }


const controlRecipes = async () => {
  
  
  try {
    const id = window.location.hash.slice(1);
    console.log(id)
    if(!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchPage())
    
    bookmarksView.update(model.state.bookmarks)
  


    await model.loadRecipe(id); 
    const {recipe} = model.state;    
    
    recipeView.render(recipe);




  } catch(err) {
    recipeView.renderError()
  }
}


const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    resultsView.renderSpinner();
    if(!query) return; 
     await model.loadSearchResults(query);
     const {page: curPage} = model.state.searchRes; 
     const currentPageResults = model.getSearchPage(curPage)
     resultsView.render(currentPageResults)

     paginationView.render(model.state.searchRes)
     
  } catch(err) {
    recipeView.renderError();

  }
}

const controlServings = function(newServings) {
  //Update Servings in model
  model.updateServings(newServings)
  //pass new state into render method for RecipeView
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);


}




const controlPagination = function(goToPage) {
  const currentPageResults = model.getSearchPage(goToPage)
  resultsView.render(currentPageResults); 
  paginationView.render(model.state.searchRes);
}


const controlBookmarks = function() {
  if(model.state.recipe.bookmarked === true) {
    model.removeBookmark(model.state.recipe)

  } else {
    model.addBookmark(model.state.recipe); 
  }
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
  
}


const controlInitalRender = function() {
  bookmarksView.render(model.state.bookmarks);
}


const controlRecipeUpload = async function(newRecipeData) {
     
   try {

      addRecipeView.renderSpinner();

      await model.uploadRecipe(newRecipeData); 
      recipeView.render(model.state.recipe); 
      addRecipeView.renderMessage()
      setTimeout(() => {
        addRecipeView.toggleWindow();
      }, MODAL_TIMEOUT_SECS * 1000)

      bookmarksView.render(model.state.bookmarks)

      //Changing URL without reloading
      window.history.pushState(null, '', `#${model.state.reciple.id}`)

   } catch(error) {
     console.error(error); 
     addRecipeView.renderError(error.message)
   }


  //Upload new recipe data through model function call


}



const init = function() {
  bookmarksView.addHandlerRender(controlInitalRender)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerClick(controlServings);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmark(controlBookmarks); 
  addRecipeView.addHandlerUpload(controlRecipeUpload);

  
}







init()


