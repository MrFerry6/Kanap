let orderButton = document.getElementById('order');


orderButton.addEventListener('invalid', (error) =>
{
    alert(error.target.value);
});
orderButton.addEventListener('click', (event) => {

    const contact = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city').value,
        email : document.getElementById('email').value
    }
    let products = [];
    
    localStorageProducts = JSON.parse(JSON.stringify(localStorage));
    for (var [key, value] of Object.entries(localStorageProducts)){
        products.push(value.id);
    }

    
    fetch('http://localhost:3000/api/products/order')
    
    .then(response => {
            window.location.href =
            'confirmation.html'  
        
    })
})