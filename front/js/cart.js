//localStorage.clear()
storeItem(createProductObject());
clearUrl();

function clearUrl(){
    if(createProductObject() !=  null){
        window.location.href = 'http://127.0.0.1:5500/front/html/cart.html';
    }
}

function storeItem(product){
    if(product !==null){
        let id = product.id + '_' + product.color;
        addToCart(id, product);
    }
}

function addToCart(id, product) {
    if (checkInCart(id) === true) {
        addQuantitytoExisting(id, product);
    } else {
        localStorage.setItem(id, JSON.stringify(product));
    };
}

function addQuantitytoExisting(id, product) {
    let storedProduct = JSON.parse(localStorage.getItem(id));
    storedProduct.quantity =
        (parseInt(storedProduct.quantity) +
            parseInt(product.quantity)).toString();
    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(storedProduct));
}

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

function checkStorageId(key, id) {
    if (key === id) {
        return true;
    } else {
        return false;
    }
}

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

function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramenter = urlParams.get(key);
    return paramenter;
}