import View from './View';
import icons from 'url:../../img/icons.svg'; 


class PaginationView extends View {
    constructor() {
        super();
        this.parentElement = document.querySelector('.pagination')
    }

    _generateMarkup() {
        const {results, page, resultsPerPage} = this.data;
        const numPages = Math.ceil(results.length/ resultsPerPage);

        if(page === 1 && numPages > 1) {
            return this._generateBtnMarkup('next', page)
        }
        


        if(page === numPages && numPages > 1)  {
            return this._generateBtnMarkup('prev', page)
        }
        
        if(page < numPages) {
            return `
             ${this._generateBtnMarkup('prev', page)}
             ${this._generateBtnMarkup('next', page)}
            
          `
        }



        return '';
    }

    _generateBtnMarkup(type, page) {
        if(type === 'prev') {
            return `<button data-goto="${page - 1}" class="btn--inline pagination__btn--${type}">
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${page - 1}</span>
          </button>`
        } else if(type === 'next') {
            return  `<button data-goto="${page + 1}" class="btn--inline pagination__btn--${type}">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
        }

    }

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function(e) {
         const btn = e.target.closest('.btn--inline'); 

         if(!btn) return;

         const goToPage = parseInt(btn.dataset.goto) 
         console.log(goToPage)
         handler(goToPage);

        })

    }

  
}


export default new PaginationView();