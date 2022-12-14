/*639a15d6f43a573dae095560 */
let productsGrid = document.getElementById("products-grid");
let productsArray = [];
//let url = "https://my-json-server.typicode.com/vitaliimkb/project_wed_20_00/db";
let xhr = new XMLHttpRequest();
//xhr.open("GET", url);

xhr.open("GET", "https://wed20-73d0.restdb.io/rest/product");
xhr.responseType = "json";
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "639a15d6f43a573dae095560");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send();
xhr.onload = function() {
    let products = xhr.response;
    productsArray = products;
    productsGrid.innerHTML = null;
    for (const product of products) {
        let productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2 class="product-name">${product.name}</h2>
            <img class="product-img" src="${product.photo_url}" alt="${product.name}">
            <p class="product-desc">${product.description}</p>
            <p class="product-price">Price: ${product.price}UAH</p>
            <button onclick="addProductToCart(${product.id})">Buy</button>
        `;
        productsGrid.append(productElement);
    }
}

let cartProd = document.getElementById("cart-products");
function openCart() {
    cartProd.classList.toggle("hide");
}
let cart = [];

function showCartProducts() {
    if (cart.length == 0) return cartProd.innerHTML = "Cart is empty";
    cartProd.innerHTML = null;
    let sum = 0;
    for (const product of cart) {
        cartProd.innerHTML += `
            <p>
                <img src="${product.photo_url}"> 
                ${product.name} |${product.price}UAH
                <hr>
            </p>
        `;
        sum += product.price;
    }
    cartProd.innerHTML += `
        <p>Total price: <b>${sum}UAH</b></p>
        <button onclick="buyAll()">Buy all</button>
    `
}

function buyAll() {
    cart = [];
    cartProd.innerHTML = "Money was withdrawn from your card";
    localStorage.setItem("cart", "[]");
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    showCartProducts();
}

function addProductToCart(id) {
    let product = productsArray.find(function (p) {
        return p.id == id;
    })
    cart.push(product);
    showCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cart-button").classList.add("active");
    setTimeout(function () {
        document.getElementById("cart-button").classList.remove("active");
    }, 500);
}