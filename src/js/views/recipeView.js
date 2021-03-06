import icons from 'url:../../img/icons.svg'; 
import View from './View';



class RecipeView extends View{
    constructor() {
        super();
        this.parentElement =  document.querySelector('.recipe');
        this.errorMessage = 'Please Enter A Valid Item';
        this.successMessage;
    }



    _generateMarkup() {
            return `<figure class="recipe__fig">
    <img src="${this.data.image}" alt="${this.data.title}" class="recipe__img" />
    <h1 class="recipe__title">
    <span>${this.data.title}</span>
    </h1>
    </figure>

    <div class="recipe__details">
    <div class="recipe__info">
    <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${this.data.cookingTime}</span>
    <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
    <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${this.data.servings}</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
        <button data-update-to="${this.data.servings - 1}" class="btn--tiny btn--update-servings">
        <svg>
            <use href="${icons}#icon-minus-circle"></use>
        </svg>
        </button>
        <button data-update-to="${this.data.servings + 1}" class="btn--tiny btn--update-servings">
        <svg>
            <use href="${icons}#icon-plus-circle"></use>
        </svg>
        </button>
    </div>
    </div>

    <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
        <svg>
        <use href="${icons}#icon-user"></use>
        </svg>
    </div>

    <button class="btn--round bookmark-btn">
    <svg class="">
        <use href="${icons}#icon-bookmark${this.data.bookmarked ? '-fill': ''}"></use>
    </svg>
    </button>
    </div>

    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

        ${this.generateNewIngredient(this.data.ingredients)}


        </ul>
        </div>

        <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this.data.publisher}</span>. Please check out
        directions at their website.
        </p>
        <a
        class="btn--small recipe__btn"
        href="${this.data.sourceURL}"
        target="_blank"
        >
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </a>
        </div>`
    }


        
   


      generateNewIngredient(ingredients) {
          console.log(this.data.servings)
      return ingredients.map( ({quantity, unit, description}) => {
          return `
          <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${quantity ? quantity: ""}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${description}
          </div>
        </li>`
      }).join('')
    }

    


    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
    }

    addHandlerClick(handler) {
       
       this.parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--update-servings'); 
          if(!btn) return;
          console.log(btn.dataset.updateTo)
          const servingsUpdate = parseInt(btn.dataset.updateTo);
          
          if(servingsUpdate > 0) {
              handler(servingsUpdate);
          }
        })

    }



    addHandlerBookmark(handler) {

        this.parentElement.addEventListener('click', function(e) {
          const btn = e.target.closest('.bookmark-btn')
          if(!btn) return; 
          console.log(btn); 
          handler()

        })
      


    }


    findBookmark() {
        
    }
      

}



export default new RecipeView();








