
fetch(createProductUrl())
.then(response => {
    let data = response.json();
    data.then(post =>{ 
        storeProduct(createProductArray());
        //createProductsCart();
    })  
})


function createProductsCart() {
    localStorageProducts = JSON.parse(JSON.stringify(localStorage));

    for (var [key, value] of Object.entries(localStorageProducts)) {
        let product = JSON.parse(value);
        let cartIems = document.getElementById('cart__items');
        let article = createArticle(product);
        let imageContainer = createImageContainer();
        let img = createImg(product);
        imageContainer.append(img);
        article.append(imageContainer);
        cartIems.append(article);
    }

function createArticle(product) {
    let article = document.createElement('article');
    article.class = 'cart__item';
    article.id = product._id;
    article.color = product.color;
    return article;
    }
}

function createImageContainer() {
    let imageContainer = document.createElement('div');
    imageContainer.class = 'cart__item__img';
    return imageContainer;
}
function createImg(product) {
    console.log(product);
    let img = document.createElement('img');
    img.alt = product.altText;
    console.log(product.altText);
    img.src = product.imageUrl;
    return img;
}

function storeProduct(product){
    localStorage.setItem(product._id, JSON.stringify(product));
}

function createProductArray()
{
    let product;
    product.id = getUrlParameter('id');
    product.color = getUrlParameter('color');
    product.quantity= getUrlParameter('quantity');
    return product;
}

function getProducts()
{
}
function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramenter = urlParams.get(key);
    return paramenter;
}
function createProductUrl(){
    const  product = 'http://localhost:3000/api/products/' + getUrlParameter('id');
    return product;
}