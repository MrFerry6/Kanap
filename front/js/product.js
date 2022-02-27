
/*Call the fetch function, calling to 
  api whit the product passed from 
  products script */
fetch(createProductUrl())
/*When the response is done, is converted to
  a Json object and then call to 
  generateProductDoom funtion*/
.then(response => {
    let data = response.json();
    data.then(post =>{
        generateProductDoom(post);
    })
})

/*Catch the errors from the api.*/
.catch(function(error){ 
    createProductError(error.message);
})

/*Generate the Doom for the product*/
function generateProductDoom(post) {
    let imgContainers = document.getElementsByClassName('item__img');
    let itemQuantity = document.getElementById("quantity");
    let addToCartButton = document.getElementById('addToCart');

    imgContainers[0].appendChild(
        createProductImg(post.imageUrl, post.altTxt));
    addProductName(post.name);
    addProductPrice(post.price);
    addProductDescription(post.description);
    addProductColors(post.colors);

    itemQuantity.value = '1';
    itemQuantity.addEventListener(('input'), () => {
        checkValue(itemQuantity);
    });

    addToCartButton.addEventListener(('click'), () => {
        goToCart(isColorSelected());
    });
}

/*Is called from a Click EventListener.
  If a valid color is selected, redirect to 
  cart page parsing by Url the id of the product
  the color selected and the quantity value. */
function goToCart(isColorSelected) {    
    let select = document.getElementById('colors');
    if(isColorSelected === true){
        let quantity = document.getElementById('quantity');
        window.location.href =
            'cart.html?id=' + getUrlId() +
            '&color=' + select.value +
            '&quantity=' + quantity.value;
    }
    else{
        select.style.background = 'lightcoral';
    }
}

/*Returns the image of the product */
function createProductImg(src, alt){    
    let img = document.createElement('img');   
    img.src = src;
    img.alt = alt;
    return img;
}

/*Add name's product at h1 element */
function addProductName(text){
    let h1 = document.getElementById('title');
    h1.textContent = text;
}

/*Add price's product at span element */
function addProductPrice(value){
    let span = document.getElementById('price');
    span.textContent = value;
}

/*Add description's product at p element */
function addProductDescription(text){
    let p = document.getElementById('description');
    p.textContent = text;
}
/*Add the color's array to select element */
function addProductColors(colors){
    let select = document.getElementById('colors');
    for(i = 0; colors.length > i; i++){
        let option = document.createElement('option');
        option.value = colors[i];
        option.textContent = colors[i];
        select.appendChild(option);
    }
}

/*Generate an alert with the error 
  description. */
function createProductError(text){  alert(
    "ERROR: " + text);
}

/*Is called by Input EventListener.
  Check that the value at the input
  is between 1 and 100, even the user
  change it by the keyboard*/
function checkValue(input){
    if (input.value < 1){
        input.value = 1;
    }
    if (input.value > 100){
        input. value = 100;
    }
}

/*Check if a color is selected
  and return true, if not return false. */
function isColorSelected()
{
    let select = document.getElementById('colors');
    if(select.value === '' ){
        return false;
    }
    else{
        return true;
    }
}

/*Returns the Id of the product 
  from the Url parameters */
function getUrlId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}
/*Return the Url of the api product */
function createProductUrl(){
    const  product = 'http://localhost:3000/api/products/' + getUrlId();
    return product;
}
