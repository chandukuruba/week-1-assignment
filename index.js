const productDetails=[
    {id:1,name:"T-Shirt",price:200,image:"https://m.media-amazon.com/images/I/61QPTn80AHL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:2,name:"Women-Shirt",price:500,image:"https://m.media-amazon.com/images/I/71GTAZtedKL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:3,name:"Shot",price:400,image:"https://m.media-amazon.com/images/I/61ZagNkDSNL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:4,name:"Kids-Wear",price:299,image:"https://m.media-amazon.com/images/I/71yEHc7P9wL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:5,name:"Yello-T-Shirt",price:199,image:"https://m.media-amazon.com/images/I/71fyw1U54GL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:6,name:"Girl-Wear",price:999,image:"https://m.media-amazon.com/images/I/61-nMKt5HFL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:7,name:"Trousher",price:99,image:"https://m.media-amazon.com/images/I/51j72vIcigL._AC_UL480_FMwebp_QL65_.jpg",quantity:1},
    {id:8,name:"Night dress for children",price:199,image:"https://m.media-amazon.com/images/I/81TbU05ebxL._AC_UL480_FMwebp_QL65_.jpg",quantity:1}]

var shoppingCart=[]


const productCard=document.querySelector("#product-details")
const cartContainer=document.querySelector("#cart-page")
const containerElement=document.createElement("div")
containerElement.classList.add("product-page")



function removeFromCart(productId) {
    const indexToRemove = shoppingCart.findIndex(item => item.id === productId);

    if (indexToRemove !== -1) {
        shoppingCart.splice(indexToRemove, 1); // Remove 1 item at the found index
        updateCartDisplay(); // Update the cart display after removal
    }
}

function onsubmitForm(){
    const inputElement=document.querySelector("#input")
    const selectElement=document.querySelector("#select")

    var filteredCartItems=shoppingCart.filter(each => each.price <= parseInt(inputElement.value))

    console.log(filteredCartItems)
}

function clearCart(){
    shoppingCart=[]
    updateCartDisplay()
}

function onChangeSelect(e){
    const element=document.getElementById("select")
    const order=element.value
    if (order === 'ASC') {
        shoppingCart.sort((a, b) => a.price - b.price);
    } else if (order === 'DESC') {
        shoppingCart.sort((a, b) => b.price - a.price);
    }
    updateCartDisplay()
}


// Function to update the cart display
function updateCartDisplay() {
    console.log(shoppingCart)
    if (shoppingCart.length === 0) {
        // Cart is empty, display a message
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {

        const filterContainer=document.createElement("div")

        filterContainer.innerHTML=`
        <form>
        <input type="text" id="input"/>
        <button class="add-button" onclick={onsubmitForm()}>Search</button>
        <select value="ASC" id="select" onchange={onChangeSelect()}>
        <option value="ASC" name="filter">ASC</option>
        <option value="DESC" name="filter">DESC</option>
        </select>
        </form>
        <button class="clear-button" onclick={clearCart()}>Clear Cart</button>
        `

        const cartProductsContainer=document.createElement("div")
        cartProductsContainer.classList.add("product-page")

        cartContainer.innerHTML=""
        shoppingCart.forEach(item => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // You can customize the display of each item here
            productItem.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="Product Image">
            </div>
            <div class="product-details-container">
            <div class="product-details">
                <p>Name: ${item.name}</p>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button class="add-button" onclick={removeFromCart(${item.id})} >Remove</button>
            </div>
            `;

            cartProductsContainer.appendChild(productItem);
        });

        const cartSummary=document.createElement("div")

        const totalAmount = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const averageAmount = totalAmount / shoppingCart.length;

        cartSummary.innerHTML = `
        <h2>Cart Summary</h2>
            <p>Total Amount: $${totalAmount}</p>
            <hr/>
            <p>Average Amount: $${averageAmount}</p>
            <hr/>
        `;


        cartContainer.appendChild(filterContainer)
        cartContainer.appendChild(cartProductsContainer)
        cartContainer.appendChild(cartSummary)

    }
}

// Call the function to initially display the cart content
updateCartDisplay();


// add to cart functionality

function addToCart(id){
    const existingProductIndex = shoppingCart.findIndex(item => item.id ===id);

if (existingProductIndex !== -1) {
    // Product is already in the cart, update quantity
    shoppingCart[existingProductIndex].quantity++;
    updateCartDisplay()
} else {
    // Product is not in the cart, add it
    const filteredProduct=productDetails.filter(each=>each.id === id)
    shoppingCart.push(filteredProduct[0]);
    updateCartDisplay()
}
}




// display product functionality

function displayProduct(product){
    const {id,name,price,image,quantity}=product

    const productContainer=document.createElement("div")
    productContainer.classList.add("product-item")

    const productDetailsCard=`
    <div class="product-image">
        <img src="${image}" alt="Product Image">
    </div>
    <div class="product-details-container">
    <div class="product-details">
        <p>Name: ${name}</p>
        <p>Price: $${price}</p>
        <p>Quantity: ${quantity}</p>
    </div>
    <button class="add-button" onclick=addToCart(${id}) >Add to Cart</button>
    </div>`

productContainer.innerHTML=productDetailsCard
containerElement.appendChild(productContainer)
}


productDetails.map(eachProduct=>displayProduct(eachProduct))
productCard.appendChild(containerElement)