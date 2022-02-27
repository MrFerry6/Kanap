/*Call to fetch funtion calling 
to api for the products array.*/
fetch('http://localhost:3000/api/products/')

/*A for loop iterates trough the products and 
  create the Doom for each. */
.then(response => {
    let data = response.json();
    data.then(post =>{ 
        generateProductsDoom(post);
    })  
})

/*Catch the errors from the api.*/
.catch(function(error){    
    createProductError(error.message);
})

/*A for loop iterates trough the products and 
  create the Doom for each. */
function generateProductsDoom(post){
    let itemSection = document.getElementById('items');
    for( i=0; i < post.length; i++ ){
        let article = document.createElement('article');
        let productLink = createProductLink(post[i]._id);
        
        article.appendChild(
            createProductImg(post[i].imageUrl, post[i].altTxt));
        article.appendChild(
            createProductName(post[i].name));
        
        article.appendChild(
            createProductDescription(post[i].description));           
        
        productLink.appendChild(article);
        itemSection.appendChild(productLink);
    }
}

/*Return a linck element that redirect to product
  page whit the Id of the selected product. */
function createProductLink(id){
    let productLink = document.createElement('a');
    productLink.href = './product.html?id=' + id;
    return productLink;
}

/*Return the image element. */
function createProductImg(src, alt){
    let img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}

/*Return an h3 element with the name of 
  the product. */
function createProductName(text){
    let h3 = document.createElement('h3');
    h3.className = 'productName';
    h3.textContent = text;
    return h3;
}

/*Return a p element with the 
  description of the product. */
function createProductDescription(text){
    let p = document.createElement('p');
    p.className = 'productName';
    p.textContent = text;
    return p;
}

/*Generate an alert with the error 
  description. */
function createProductError(text){  alert(
        "ERROR: " + text);
}