/*Call storeItem fuction parsing the
  the createProductObjet result.  */
storeItem(createProductObject());
/*Clear the url parameters to prevent unwanted 
  behaviors when the user user refresh the page. */
clearUrl();

/*If createProductObject returns an object,
  clear the url parameters. */
function clearUrl(){
    if(createProductObject() !=  null){
        window.location.href = 'http://127.0.0.1:5500/front/html/cart.html';
    }
}

/*If the product is not null, the product will added to
  car (localStorage), the id is generate with the product 
  id plus product's color.  */
function storeItem(product){
    if(product !==null){
        let id = product.id + '_' + product.color;
        addToCart(id, product);
    }
}

/*if the product exist at local storage,
  will be update the quantity parameter,
  if not, a new product will be added to
  card. */
function addToCart(id, product) {
    if (checkInCart(id) === true) {
        addQuantitytoExisting(id, product);
    } else {
        localStorage.setItem(id, JSON.stringify(product));
    };
}

/*Refresh the product whit the correct quantity. */
function addQuantitytoExisting(id, product) {
    let storedProduct = JSON.parse(localStorage.getItem(id));
    storedProduct.quantity =
        (parseInt(storedProduct.quantity) +
            parseInt(product.quantity)).toString();
    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(storedProduct));
}

/*A loop checks if the product is in the
  local storage, return a bolean value. */
function checkInCart(id) {
    localStorageProducts = JSON.parse(JSON.stringify(localStorage));
    let isInCart = false
    for (var [key, value] of Object.entries(localStorageProducts)) {
        if (checkStorageId(key, id)){
            isInCart = true;
        }
    }
    return isInCart;
}

/*chek if the id is the same that the key. */
function checkStorageId(key, id) {
    if (key === id) {
        return true;
    } else {
        return false;
    }
}

/*Create a product object. */
function createProductObject()
{
    if(getUrlParameter('id') !== null){
        let product = {
            id : getUrlParameter('id'),
            color : getUrlParameter('color'),
            quantity :  getUrlParameter('quantity')
        };
        return product;
    }else{
        return null;
    }
}

/*returns an url parameter. */
function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramenter = urlParams.get(key);
    return paramenter;
}