


if(getUrlParameter('firstName') !== null){

    fetch("http://localhost:3000/api/products/order",{  

            method : 'post',

            body :JSON.stringify({
                contact : {
                    firstName : getUrlParameter('firstName'),
                    lastName : getUrlParameter('lastName'),
                    address : getUrlParameter('address'),
                    city : getUrlParameter('city'),
                    email : getUrlParameter('email')                    
                },
                products : getProductsIds()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        .then(response => {
            let data = response.json();
            data.then(post =>{
                if (response.ok === true){
                
                    localStorage.clear();

                    window.location.href =
                    'confirmation.html?orderId=' + post.orderId;
            }
            })
        })
 
    }
function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(key);
    return parameter;
}
function getProductsIds(){
    let products = [];
    localStorageProducts = JSON.parse(JSON.stringify(localStorage));
    for (var [key, value] of Object.entries(localStorageProducts)){
        let product =JSON.parse(value);
        products.push(product.id);
    }
    return products;
}