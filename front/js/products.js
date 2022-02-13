
fetch('http://localhost:3000/api/products/')
.then(response => {
    let data = response.json();
    data.then(post =>{ 
        createProductsList(post);
    })  
})
.catch(function(error){    
    let itemSection = document.getElementById('items');
    itemSection.appendChild(createProductError(error.message));
})

function createProductsList(post){
    let itemSection = document.getElementById('items');
    for( i=0; i < post.length; i++ ){
        let article = document.createElement('article');
        let productLink = createProductLink(post[i].id);
        
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
function createProductLink(id){
    let productLink = document.createElement('a');
    productLink.href = './product.html?id=' + id;
    return productLink;
}
function createProductImg(src, alt){
    let img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}
function createProductName(text){
    let h3 = document.createElement('h3');
    h3.className = 'productName';
    h3.textContent = text;
    return h3;
}
function createProductDescription(text){
    let p = document.createElement('p');
    p.className = 'productName';
    p.textContent = text;
    return p;
}
function createProductError(text){
    let h2 = document.createElement('h2');
    h2.textContent = 'Se fue a la mierda: ' + text;
    return h2;
}