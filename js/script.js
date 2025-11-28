const slider = document.getElementById("slider");
const image = slider.querySelectorAll("img");

let count = 0;

function showSlide(i) {
    if (i < 0) {
        count = image.length - 1;
    }
    else if (i >= image.length) {
        count = 0;
    }
    else {
        count = i;
    }

    

    slider.style.transform = `translateX(${-count * 100}vw)`;
}

// const backbutton = document.querySelector(".back")
// backbutton.addEventListener("click", () => {
//     showSlide(count - 1);
// });

// const nextbutton = document.querySelector(".next")
// nextbutton.addEventListener("click", () => {
//     showSlide(count + 1);
// });


setInterval(function(){
    showSlide(count + 1)
},5000)







let plist = document.getElementById("product-list")


let products = [
    { id: 1, name: "Orang", price: 29.99, image: "ch1.png" },
    { id: 2, name: "Apple", price: 19.99, image: "ch2.png" },
    { id: 3, name: "Mango", price: 9.99, image: "ch3.png" },
    { id: 4, name: "Grapes", price: 24.99, image: "ch4.png" },
    { id: 4, name: "Banana", price: 13.99, image: "ch5.png" },
]

products.forEach(products => {
    let item = document.createElement("div")
    item.className = "Product"
    item.innerHTML = `
       <img src="${products.image}" alt="${products.name}">
       <h3>${products.name}</h3>
       <p>Price: $${products.price}</p>
       <button>Add to Cart</button>
       `
    plist.appendChild(item)

})