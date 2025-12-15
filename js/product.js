import { product } from './allproduct.js';

const output = document.querySelector(".product-container");
const checkboxes = document.querySelectorAll(".filter-checkbox");



// ------------------ SHOW PRODUCTS ------------------
function showproducts(productshow) {

    output.innerHTML = "";


    productshow.forEach((p) => {

        const card = document.createElement("div");
        card.className = "cartvalue";

        card.innerHTML = `
        <img src=${p.img}>
        <p class="brand_name">${p.name}</p>

        <div class="price-container">
        <span class="main-price">₹${p.price}</span>
        <span class="delte-mony">₹${p.price * 3}</span>
        </div>

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
}


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
            img: p.img,
            qty: qty,
            totalprice: p.price * qty
        });
    }

    savedata(cart);
    // console.log("Cart Updated:", cart);
    alert("Added to Cart!");
}


showproducts(product)


// filter 



    checkboxes.forEach(cb => {
    cb.addEventListener("change", filterproducts);
});



function filterproducts() {
    const selectedArr = [];

    checkboxes.forEach((cb) => {
        if (cb.checked) {
            selectedArr.push(cb.value);
        }
    });

    if (selectedArr.length === 0) {
        // If no checkbox selected, show all
        showproducts(product);
    } else {
        // Filter products
        const filteredList = product.filter(item =>
            selectedArr.includes(item.category)
        );
        showproducts(filteredList);
    }
}