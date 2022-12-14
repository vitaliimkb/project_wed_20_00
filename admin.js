let adminForm = document.getElementById("admin-form");

adminForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let data = JSON.stringify({
        "name": event.target["name"].value,
        "description": event.target["desc"].value,
        "price": event.target["price"].value,
        "photo_url": event.target["photo_url"].value,
    });
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://wed20-73d0.restdb.io/rest/product");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "639a15d6f43a573dae095560");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
    xhr.onload = function () {
        window.open("index.html", "_self")
    }
})