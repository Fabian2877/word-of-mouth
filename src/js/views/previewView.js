import View from './View';
import icons from 'url:../../img/icons.svg'; 



class PreviewView extends View  {
   constructor() {
       super();
 
   }

   _generateMarkup({publisher, image_url, title, id}) {
    const hash = window.location.hash.slice(1);


       return `<li class="preview">
       <a class="preview__link ${hash === id ? 'preview__link--active' : ''}" href="#${id}">
         <figure class="preview__fig">
           <img src="${image_url}" alt="Test" />
         </figure>
         <div class="preview__data">
           <h4 class="preview__title">${title}</h4>
           <p class="preview__publisher">${publisher}</p>
           
           <div class="preview__user-generated ${this.data.key ? '' : 'hidden'}}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
           </div>

           </div>

       </a>

     </li>`
   }




}


export default new PreviewView();