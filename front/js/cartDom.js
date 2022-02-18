localStorageProducts = JSON.parse(JSON.stringify(localStorage));

for (var [key, value] of Object.entries(localStorageProducts)){
    let storedProduct = JSON.parse(value);
    launchFetch(storedProduct);
}

function launchFetch(storedProduct){    
    fetch(createProductUrl(storedProduct.id))
    .then(response => {
        let data = response.json();
        data.then(post =>{
            createProductCart(post, storedProduct);
        })  
    })
}

function createProductCart(product, storedProduct) { 
        let cartIems = document.getElementById('cart__items');
        let article = createArticle(product);
        article.append(createImage(product));
        article.append(createItemContent(product, storedProduct));
        cartIems.append(article);
    }



function createArticle(product) {
    let article = document.createElement('article');
    article.class = 'cart__item';
    article.id = product._id;
    article.color = product.color;
    return article;
    }
    
function createImage(product) {
    let imageContainer = createImageContainer();
    let img = createImg(product);
    imageContainer.append(img);
    return imageContainer;
}
function createImageContainer() {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'cart__item__img';
    return imageContainer;
}
function createImg(product) {
    let img = document.createElement('img');
    img.alt = product.altTxt;
    img.src = product.imageUrl;
    return img;
}

function createItemContent(product, storedProduct){    
    let itemContentContainer = document.createElement('div');
    itemContentContainer.className = 'cart__item__content';
    itemContentContainer.append(CreateItemContentDescription(product, storedProduct));
    itemContentContainer.append(createItemContentSettings(product, storedProduct));
    return itemContentContainer;
}

function CreateItemContentDescription(product, storedProduct) {
    let itemContentDescription = document.createElement('div');
    let itemContentName = document.createElement('h2');
    let itemContentColor = document.createElement('p');
    let itemContentPrice = document.createElement('p');
    itemContentName.textContent = product.name;
    itemContentColor.textContent = storedProduct.color;
    itemContentPrice.id = 'price';
    itemContentPrice.textContent = calculatePrice(product.price, storedProduct.quantity);
    itemContentDescription.className = 'cart__item__content__description';

    itemContentDescription.append(
        itemContentName, itemContentColor, itemContentPrice);
    return itemContentDescription;
}
function createItemContentSettings(product, storedProduct){
    let itemContentSettings = document.createElement('div');
    let itemContentSettingsQuantity = document.createElement('div');
    let quantityTitle = document.createElement('p');
    let quantityInput = document.createElement('input');
    let deleteContainer = document.createElement('div');
    let deleteOption = document.createElement('p');    
    let id = storedProduct.id + '_' + storedProduct.color;

    itemContentSettings.className = 'cart__item__content__settings';
    quantityTitle.textContent = 'Qte :';
    quantityInput.type = 'number';
    quantityInput.className = 'itemQuantity';
    quantityInput.name = 'itemQuantity';
    quantityInput.min = '1';
    quantityInput.max = '100';
    quantityInput.id = 'input_' + id;
    quantityInput.value = storedProduct.quantity;
    deleteContainer.className = 'cart__item__content__settings__delete';
    deleteOption.textContent ='delete';
    deleteOption.className = 'deleteItem';

    quantityInput.addEventListener('input', () => { 
        let itemContentPrice = document.getElementById('price');    
        checkValue(quantityInput);     
        updateCartQuantity(id);
        itemContentPrice.textContent = calculatePrice(quantityInput.value, product.price);
    })
    deleteOption.addEventListener(('click'), () =>  {        
        removeFromCart(storedProduct);
    })

    itemContentSettingsQuantity.append(quantityTitle,quantityInput);
    deleteContainer.append(deleteOption);
    itemContentSettings.append(itemContentSettingsQuantity, deleteContainer);
    
    return itemContentSettings;
}
function updateCartQuantity(id) {
    let input = document.getElementById('input_' + id);
    let product = JSON.parse(localStorage.getItem(id));
    product.quantity = input.value;
    localStorage.setItem(id, JSON.stringify(product));
}
function calculatePrice(price, quantity){
    return (parseInt(price) * parseInt(quantity)).toString();
}
function removeFromCart(product) {
    let article = document.getElementById(product.id);
    localStorage.removeItem(product.id + '_' + product.color);
    article.remove();
}

function createProductUrl(id){
    const  product = 'http://localhost:3000/api/products/' + id;
    return product;
}

function checkValue(input){
    if (input.value < 1){
        input.value = 1;
    }
    if (input.value > 100){
        input. value = 100;
    }
}