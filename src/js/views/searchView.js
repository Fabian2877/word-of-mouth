class SearchView {
    constructor() {
        this.parentElement = document.querySelector('.search')
        this.searchField =  this.parentElement.querySelector('.search__field');
    }

    getQuery() {
        const query = this.searchField.value;
        this.clearInput();
        return query;
    }

    clearInput() {
        this.searchField.value = ''
    }

    addHandlerRender(handler) {

        this.parentElement.addEventListener('submit', (e) => {
            e.preventDefault(); 
            handler();
        })


    }
}
















export default new SearchView();