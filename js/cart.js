
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

    cart.forEach((item) => {

        const hr = document.createElement("hr");
        hr.className="hr"
        const productdiv = document.createElement("div");
        productdiv.className = "productdiv";
        console.log(item);

        productdiv.innerHTML = `
  
    
        <div class="img-container">
        <img src=${item.img}></img>
        </div>

     <div class="cetagary-container">
     <p>cetegary:${item.qty}</p>
     </div>
     
     
     <div class="qty-container">
     <button class="min">-</button>
     <p class="result">${item.qty}</p>
     <button class="plu">+</button>
     </div>
     
     <div class="price-container">
      <p>price${item.price}</p>
     </div>
    
     <div class="remove-container">
     <button class="remove">Remove</button>
     </div>
     
     `
     cartproduct.appendChild(hr); 
     cartproduct.appendChild(productdiv)
 productdiv.querySelector(".plu").addEventListener("click", () => {
            item.qty += 1;
            productdiv.querySelector(".result").textContent = item.qty;
            setdata(cart); // store updated cart
        });

        // Minus button
        productdiv.querySelector(".min").addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty -= 1;
                productdiv.querySelector(".result").textContent = item.qty;
                setdata(cart);
            }
        });

        // Remove button
        productdiv.querySelector(".remove").addEventListener("click", () => {
            cart.splice(index, 1); // remove the clicked item
            setdata(cart); // update localStorage
            showcart(); // re-render cart
        });


    })
}

showcart();
