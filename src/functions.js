
const filterText = (str) => {




    //Filtering for Amount
    let start = str.indexOf('(');
    let end = str.indexOf(')');
   
    let amount = str.slice(start + 1, end); 
   
    if(amount[amount.length - 1] !== 's') {
      amount = amount + 's';
    }
   
   
    //Filtering for Ingredients
     
    let ingredient = str.slice(end + 1, str.length - 1)
    
     return {
       amount, 
       ingredient
     }
}
