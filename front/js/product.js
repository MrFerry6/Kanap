
fetch(createProductUrl())
.then(response => {
    let data = response.json();
    data.then(post =>{
        console.log(post); 
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

        addToCartButton.addEventListener(('click'), () => {
            goToCart();            
        })
    })
})
.catch(function(error){    
    let itemSection = document.getElementsByClassName('item');
    itemSection[0].appendChild(createProductError(error.message));
})



function goToCart() {
    let select = document.getElementById('colors');
    let quantity = document.getElementById('quantity');
    window.location.href =
        'cart.html?id=' + getUrlId() +
        '&color=' + select.value +
        '&quantity=' + quantity.value;
}

function createProductImg(src, alt){    
    let img = document.createElement('img');   
    img.src = src;
    img.alt = alt;
    return img;
}
function addProductName(text){
    let h1 = document.getElementById('title');
    h1.textContent = text;
}
function addProductPrice(value){
    let span = document.getElementById('price');
    span.textContent = value;
}
function addProductDescription(text){
    let p = document.getElementById('description');
    p.textContent = text;
}function addProductColors(colors){
    let select = document.getElementById('colors');
    for(i = 0; colors.length > i; i++){
        let option = document.createElement('option');
        option.value = colors[i];
        option.textContent = colors[i];
        select.appendChild(option);
    }
}

function createProductError(text){
    let h2 = document.createElement('h2');
    h2.textContent = 'Se fue a la mierda: ' + text;
    return h2;
}


function getUrlId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}
function createProductUrl(){
    const  product = 'http://localhost:3000/api/products/' + getUrlId();
    return product;
}
