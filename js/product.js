const output = document.querySelector(".product-container");

import { product } from './allproduct.js';


// ------------------ SHOW PRODUCTS ------------------
product.forEach((p) => {

    const card = document.createElement("div");
    card.className = "cartvalue";

    card.innerHTML = `
        <img src=${p.img}>
        <h2>${p.name}</h2>
        <div><span>₹${p.price}</span> <span class="delte-mony">₹${p.price * 3}</span></div>

        <div class="total-stocks">
            <p>Total Stocks Available :</p>
            <p>${p.totalstocks}</p>
        </div>

        <div class="quantity-container">
            <button class="minusbtn">-</button>
            <p class="quantity">1</p>
            <button class="plusbtn">+</button>
        </div>

        <button class="add">Add to Cart</button>
    `;

    output.append(card);

    // Quantity controls
    const quantity = card.querySelector(".quantity");
    const plusbtn = card.querySelector(".plusbtn");
    const minusbtn = card.querySelector(".minusbtn");

    let qty = 1;

    plusbtn.addEventListener("click", () => {
        if (qty < p.totalstocks) {
            qty++;
            quantity.textContent = qty;
        }
    });

    minusbtn.addEventListener("click", () => {
        if (qty > 1) {
            qty--;
            quantity.textContent = qty;
        }
    });

    // ------------------ ADD BUTTON CLICK ------------------
    const addbtn = card.querySelector(".add");

    addbtn.addEventListener("click", () => {
        addcart(p, qty);
        console.log(p);
        // console.log(qty);

    });

});


// ------------------ LOCAL STORAGE FUNCTIONS ------------------

function getdata() {
    let stored = localStorage.getItem("cartany");
    return stored ? JSON.parse(stored) : [];
}

function savedata(cart) {
    localStorage.setItem("cartany", JSON.stringify(cart));
}


// ------------------ ADD TO CART FUNCTION ------------------

function addcart(p, qty) {

    let cart = getdata();

    let existing = cart.find(item => item.id === p.id);

    if (existing) {
        existing.qty += qty;  // update quantity
        existing.totalprice += p.price * qty

    } else {
        cart.push({
            id: p.id,
            price: p.price,
            img:p.img,
            qty: qty,
            totalprice: p.price * qty
        });
    }

    savedata(cart);
    // console.log("Cart Updated:", cart);
    alert("Added to Cart!");
}
