import View from './View';
import icons from 'url:../../img/icons.svg'; 



class BookmarksView extends View  {
   constructor() {
       super();
       this.parentElement = document.querySelector('.bookmarks__list')
       this.errorMessage = 'No bookmarks yet';
       this.successMessage;
   }
   _generateMarkup() {
      return this.data.map(recipe => {
          return this._generatePreview(recipe)
      }).join('')
   }


   _generatePreview({publisher, image, title, id}) {
       const hash = window.location.hash.slice(1);

    return `<li class="preview">
    <a class="preview__link ${hash === id ? 'preview__link--active' : ''}" href="#${id}">
      <figure class="preview__fig">
        <img src="${image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${title}</h4>
        <p class="preview__publisher">${publisher}</p>
       </div>
    </a>
  </li>`
   }

   addHandlerRender(handler) {
     window.addEventListener('load', handler)
   }

   





}


export default new BookmarksView();