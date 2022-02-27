/*Set the order Id item at the Dom. */
let orderIdItem = document.getElementById('orderId');
orderIdItem.textContent = getUrlParameter('orderId');


/*returns a parameter from the Url. */
function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(key);
    return parameter;
}