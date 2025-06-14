document.addEventListener("DOMContentLoaded",()=>{

    const products = [
        {id:1, name : "Product 1" , price: 29.99},
        {id:2, name : "Product 2" , price: 49.99},
        {id:3, name : "Product 3" , price: 89.99},
    ];

    const cart =JSON.parse(localStorage.getItem('cart')) || []

    //hold the ids
   const productList = document.getElementById('product-list');//div1
   const cartItems = document.getElementById('cart-items');//div2
   const emptyCartMessage = document.getElementById('empty-cart'); //div2->p tag
   const cartTotalMessage = document.getElementById('cart-total');//div3(hidden)
   const totalPriceDisplay = document.getElementById('total-price');//div3->p tag
   const checkOutBtn = document.getElementById('checkout-btn');//div3-> button



   //function to save cart to local storage
    function saveCartToStorage(){
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    //render page on load
    renderCart();

   products.forEach( product =>{
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-card');
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
   })

   productList.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
      const productId = parseInt(e.target.getAttribute('data-id'))
      const product = products.find((p)=> p.id === productId);
      addToCart(product);
      
    }
   })

    function addToCart(product) {
        cart.push(product);
        saveCartToStorage();
        renderCart();
    }
     
    function removeFromCart(productId) {
        const index = cart.findIndex(p => p.id === productId);
        if (index !== -1) {
            cart.splice(index, 1);
            saveCartToStorage();
            renderCart();
        }
    }

    // code for rendering the cart
    function renderCart(){
        cartItems.innerHTML="";
        let totalPrice = 0;

        if(cart.length >0){
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            
            
            cart.forEach((item,index)=>{
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML=`
                ${item.name} -$${item.price.toFixed(2)}
                `;
                cartItem.classList.add('cart-item-design');

                //Created a remove button inside the div (cartItem)
                const removeBtn = document.createElement('button');
                removeBtn.textContent = `Remove`;
                removeBtn.classList.add('removeButton');

                // adding event listener to the remove Button
                removeBtn.addEventListener('click', (e) =>{
                    removeBtn.setAttribute('data-id', item.id); 
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    removeFromCart (productId);
                })

                cartItem.appendChild(removeBtn);
                

                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`
            });
        }else{
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    checkOutBtn.addEventListener(('click'), ()=>{
        cart.length = 0 ;
        saveCartToStorage();
        alert("Check out successfully");
        renderCart();
    })

   

});