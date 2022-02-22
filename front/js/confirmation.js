let orderIdItem = document.getElementById('orderId');
orderIdItem.textContent = getUrlParameter('orderId');

function getUrlParameter(key){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const parameter = urlParams.get(key);
    return parameter;
}