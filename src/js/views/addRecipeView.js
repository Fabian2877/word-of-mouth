import View from './View';
import icons from 'url:../../img/icons.svg'; 



class addRecipeView extends View  {
    constructor() {
        super();
        this.parentElement = document.querySelector('.upload');
        this.successMessage = 'Recipe was successfully uploaded'

        this.window = document.querySelector('.add-recipe-window');
        this.overlay = document.querySelector('.overlay')
        this.btnOpen = document.querySelector('.nav__btn--add-recipe')
        this.btnClose = document.querySelector('.btn--close-modal');


        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
        this.addHandlerUpload();
        
    }


    toggleWindow() {
        this.overlay.classList.toggle('hidden'); 
        this.window.classList.toggle('hidden')
    }


      addHandlerShowWindow() {
          this.btnOpen.addEventListener('click', this.toggleWindow.bind(this))
      }

      addHandlerCloseWindow() {
          this.btnClose.addEventListener('click', this.toggleWindow.bind(this))
          this.overlay.addEventListener('click', this.toggleWindow.bind(this))
      }


      addHandlerUpload(handler) {
          this.parentElement.addEventListener('submit', function(e) {
              e.preventDefault();

              const dataArr= [...new FormData(this)]
              const data = Object.fromEntries(dataArr)

              handler(data)
             
              
          })


      }
    




}


export default new addRecipeView();