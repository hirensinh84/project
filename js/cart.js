
function getdata() {
    let stordata = localStorage.getItem("cartany");
    if (!stordata) {
        return [];
    }
    return JSON.parse(stordata);
}



function setdata(cart) {
    localStorage.setItem("cartany", JSON.stringify(cart));
}



function showcart() {
    let cart = getdata()
    const cartproduct = document.querySelector(".product")
    cartproduct.innerHTML = '';

    let totalItemsQty = 0;
    let grandTotalPrice = 0;

    cart.forEach((item) => {

        totalItemsQty += item.qty;
        grandTotalPrice += (item.price * item.qty);

        const hr = document.createElement("hr");
        hr.className = "hr"
        const productdiv = document.createElement("div");
        productdiv.className = "productdiv";
        console.log(item);

        productdiv.innerHTML = `
  
    
        <div class="img-container">
        <img src=${item.img}></img>
        </div>

     <div class="cetagary-container">
     <p>Category : ${item.category}</p>
     </div>
     
     
     <div class="qty-container">
     <button class="min">-</button>
     <p class="result">${item.qty}</p>
     <button class="plu">+</button>
     </div>
     
     <div class="price-container">
      <p >Price : <span class="price">${item.totalprice}</span></p>
     </div>
    
     <div class="remove-container">
     <button class="remove">Remove</button>
     </div>
     
     `
        cartproduct.appendChild(hr);
        cartproduct.appendChild(productdiv)

        productdiv.querySelector(".plu").addEventListener("click", () => {
            if (item.qty < item.totalqty) {
                item.qty += 1;
                productdiv.querySelector(".result").textContent = item.qty;
                productdiv.querySelector(".price").textContent = item.price * item.qty;
                setdata(cart);
                showcart();
            }

        });

        // Minus button
        productdiv.querySelector(".min").addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty -= 1;
                productdiv.querySelector(".result").textContent = item.qty;
                productdiv.querySelector(".price").textContent = item.price * item.qty;
                setdata(cart);
                showcart();
            }
        });

        productdiv.querySelector(".remove").addEventListener("click", () => {
            const indexToRemove = cart.findIndex(product => product.id === item.id);

            if (indexToRemove !== -1) {
                cart.splice(indexToRemove, 1);
                setdata(cart);
                showcart();
            }
        });


    })

    if (cart.length > 0) {
        const total_summeryDiv = document.querySelector(".main-count");
        total_summeryDiv.innerHTML = "";
        const summaryDiv = document.createElement("div");
        summaryDiv.innerHTML = `
                <hr class="hr">
                <div>
                    <p class="summery_product">Total Products: <b>${cart.length}</b></p>
                    <p class="summery_total" >Total Quantity: <b>${totalItemsQty}</b></p>
                    <h3 class="grand_total ">Grand Total: ₹ ${grandTotalPrice}</h3>
                </div>
            `;
        total_summeryDiv.appendChild(summaryDiv);
    }
}



showcart();
