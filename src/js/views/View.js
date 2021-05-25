import icons from 'url:../../img/icons.svg'; 


export default class View {
  

    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this.data = data;
        console.log(data)
        const markup = this._generateMarkup();
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup)
       }


       renderSpinner() {
        const markup = `
        <div class="spinner">
                <svg>
                    <use href="${icons}.svg#icon-loader"></use>
                </svg>
        </div>`
        
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup)
     }


     
     update(data) {
      this.data = data;
      const newMarkup = this._generateMarkup();
      

      //Virtual DOM in Memory
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'))
      const curElements = Array.from(this.parentElement.querySelectorAll('*'));
      newElements.forEach((newNode, i) => {
         const curNode = curElements[i];

         //Checking Values
         if(!newNode.isEqualNode(curNode) && newNode.firstChild?.nodeValue.trim() !== '') {
          curNode.textContent = newNode.textContent;
         }

         //Setting Attributes
         if(!newNode.isEqualNode(curNode)) {
           Array.from(newNode.attributes).forEach( attr => {
             curNode.setAttribute(attr.name, attr.value)
           })
         }
      })

     }

     
     renderError(message = this.errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`

          this._clear(); 
          this.parentElement.insertAdjacentHTML('afterbegin', markup)
    }




    renderMessage(message = this.successMessage) {
       const markup = `
         <div class="message">
           <div>
             <svg>
               <use href="${icons}#icon-smile"></use>
             </svg>
           </div>
           <p>${message}</p>
         </div>`

         this._clear(); 
         this.parentElement.insertAdjacentHTML('afterbegin', markup)
   }

   _clear() {
    this.parentElement.innerHTML = '';
}

   

}