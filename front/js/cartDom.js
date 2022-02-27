localStorageProducts = JSON.parse(JSON.stringify(localStorage));

/*loop to iterate for each product at local storage to 
  launch the fetch */
for (var [key, value] of Object.entries(localStorageProducts)){
    let storedProduct = JSON.parse(value);
    launchFetch(storedProduct);
}

/*Call to fectch whit the product id paramenter,
  then call create the product Doom whit the product.  */
function launchFetch(storedProduct){    
    fetch(createProductUrl(storedProduct.id))
    .then(response => {
        let data = response.json();
        data.then(post =>{
            createProductCart(post, storedProduct);
        })  
    })
    /*Catch the errors from the api.*/
    .catch(function(error){ 
        createProductError(error.message);
})
}

/*Generate the product Doom items. */
function createProductCart(product, storedProduct) {   
        let cartIems = document.getElementById('cart__items');
        let article = createArticle(product,storedProduct);        
        let itemContentTotaltQuantity = document.getElementById('totalQuantity');
        let itemContentTotaltPrice  = document.getElementById('totalPrice');
        article.append(createImage(product, storedProduct));
        article.append(createItemContent(product, storedProduct));
        cartIems.append(article);
        itemContentTotaltQuantity.textContent = getTotalQuantity().toString();
        itemContentTotaltPrice.textContent = getTotalPrice().toString();
        
    }


/*Returns an article item for the product. */
function createArticle(product, storedProduct) {
    let article = document.createElement('article');
    article.class = 'cart__item';
    article.id = product._id + '_' + storedProduct.color;
    article.color = product.color;
    return article;
}

/*Returns an image container with the img element. */    
function createImage(product) {
    let imageContainer = createImageContainer();
    let img = createImg(product);
    imageContainer.append(img);
    return imageContainer;
}

/*Returns an image container. */
function createImageContainer() {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'cart__item__img';
    return imageContainer;
}

/*Returns an img element. */
function createImg(product) {
    let img = document.createElement('img');
    img.alt = product.altTxt;
    img.src = product.imageUrl;
    return img;
}

/*Returns product content Dom */
function createItemContent(product, storedProduct){    
    let itemContentContainer = document.createElement('div');
    itemContentContainer.className = 'cart__item__content';
    itemContentContainer.append(CreateItemContentDescription(product, storedProduct));
    itemContentContainer.append(createItemContentSettings(product, storedProduct));
    return itemContentContainer;
}

/*Return product description section Dom */
function CreateItemContentDescription(product, storedProduct) {
    let itemContentDescription = document.createElement('div');
    let itemContentName = document.createElement('h2');
    let itemContentColor = document.createElement('p');
    let itemContentPrice = document.createElement('p');   
    let id = storedProduct.id + '_' + storedProduct.color;

    itemContentName.textContent = product.name;
    itemContentColor.textContent = storedProduct.color;
    itemContentPrice.id = 'price' + id;
    itemContentPrice.textContent = calculatePrice(product.price, storedProduct.quantity);
    itemContentDescription.className = 'cart__item__content__description';

    itemContentDescription.append(
        itemContentName, itemContentColor, itemContentPrice);
    return itemContentDescription;
}

/*Returns Product Settings Dom' */
function createItemContentSettings(product, storedProduct){
    let itemContentSettings = document.createElement('div');
    let itemContentSettingsQuantity = document.createElement('div');
    let quantityTitle = document.createElement('p');
    let quantityInput = document.createElement('input');
    let deleteContainer = document.createElement('div');
    let deleteOption = document.createElement('p');    
    let id = storedProduct.id + '_' + storedProduct.color;    
    let itemContentTotaltQuantity = document.getElementById('totalQuantity');
    let itemContentTotaltPrice  = document.getElementById('totalPrice');

    itemContentSettings.className = 'cart__item__content__settings';
    quantityTitle.textContent = 'Qte :';
    setQuantityInput(quantityInput, id, storedProduct);
    deleteContainer.className = 'cart__item__content__settings__delete';
    setDeleteOption(deleteOption);

    setQuantityInputListener(quantityInput, id, product, itemContentTotaltQuantity, itemContentTotaltPrice);
    setDeleteOptionListener(deleteOption, storedProduct, itemContentTotaltQuantity, itemContentTotaltPrice);

    itemContentSettingsQuantity.append(quantityTitle,quantityInput);
    deleteContainer.append(deleteOption);
    itemContentSettings.append(itemContentSettingsQuantity, deleteContainer);
    
    return itemContentSettings;
}

/*Add the click listener to delete a product from the stored, 
  and update the quantity and price at Dom. */
function setDeleteOptionListener(deleteOption, storedProduct, itemContentTotaltQuantity, itemContentTotaltPrice) {
    deleteOption.addEventListener(('click'), () => {
        removeFromCart(storedProduct);
        itemContentTotaltQuantity.textContent = getTotalQuantity().toString();
        itemContentTotaltPrice.textContent = getTotalPrice().toString();
    });
}

/*Add the input listener to input element,
  updating price, quantity and total price at the Dom.*/
function setQuantityInputListener(quantityInput, id, product, itemContentTotaltQuantity, itemContentTotaltPrice) {
    quantityInput.addEventListener('input', () => {
        let itemContentPrice = document.getElementById('price' + id);
        checkValue(quantityInput);
        updateCartQuantity(id);
        itemContentPrice.textContent = calculatePrice(quantityInput.value, product.price);
        itemContentTotaltQuantity.textContent = getTotalQuantity().toString();
        itemContentTotaltPrice.textContent = getTotalPrice().toString();
    });
}

/*Set the parameters at the delete option element. */
function setDeleteOption(deleteOption) {
    deleteOption.textContent = 'delete';
    deleteOption.className = 'deleteItem';
}

/*Set the parameters at the quantityInput element. */
function setQuantityInput(quantityInput, id, storedProduct) {
    quantityInput.type = 'number';
    quantityInput.className = 'itemQuantity';
    quantityInput.name = 'itemQuantity';
    quantityInput.min = '1';
    quantityInput.max = '100';
    quantityInput.id = 'input_' + id;
    quantityInput.value = storedProduct.quantity;
}

/*update the product quantity at the local storage*/
function updateCartQuantity(id) {
    let input = document.getElementById('input_' + id);
    let product = JSON.parse(localStorage.getItem(id));
    product.quantity = input.value;
    localStorage.setItem(id, JSON.stringify(product));
}

/*Returns the price of the product by quantity. */
function calculatePrice(price, quantity){
    return (parseInt(price) * parseInt(quantity)).toString();
}

/*Returns the total quantity of all products. */
function getTotalQuantity(){
    let storageProducts =JSON.parse(JSON.stringify(localStorage));
    let totalQuantity = 0;
    for (var [key, value] of Object.entries(storageProducts)){       
        let storedProduct = JSON.parse(value);
        totalQuantity = totalQuantity + parseInt(storedProduct.quantity);
    }
    return totalQuantity;
}

/*Returns the total price of the products */
function getTotalPrice(){   
    let storageProducts =JSON.parse(JSON.stringify(localStorage));

    let totalPrice = 0;
    for (var [key, value] of Object.entries(storageProducts)){   
        let storedProduct = JSON.parse(value);           
        let id = storedProduct.id + '_' + storedProduct.color; 
        let itemPrice = document.getElementById('price' + id);

        if(itemPrice !== null){
        totalPrice = totalPrice + parseInt(itemPrice.textContent);}
    }
    
    return totalPrice;
}

/*Remove a product from the cart */
function removeFromCart(product) {
    let article = document.getElementById(product.id + '_' + product.color);
    localStorage.removeItem(product.id + '_' + product.color);
    article.remove();
}

/*Returns an url for the product. */
function createProductUrl(id){
    const  product = 'http://localhost:3000/api/products/' + id;
    return product;
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

/*Generate an alert with the error 
  description. */
  function createProductError(text){  alert(
    "ERROR: " + text);
}