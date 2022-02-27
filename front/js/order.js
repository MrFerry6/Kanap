/*if at the url exist a firstName parameter,
will call the fetch for made an order at the api,
implemeting the order paramameters at the fetch. */
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
        /*If the response if ok, the local storage will be clean 
          and will be redirect to a confirmation page parsing the
          order Id. */
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

/*Returns a parameter from url. */
function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(key);
    return parameter;
}

/*Returns an array with the products. */
function getProductsIds(){
    let products = [];
    localStorageProducts = JSON.parse(JSON.stringify(localStorage));
    for (var [key, value] of Object.entries(localStorageProducts)){
        let product =JSON.parse(value);
        products.push(product.id);
    }
    return products;
}