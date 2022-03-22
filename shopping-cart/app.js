//variables

const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDom = document.querySelector('.products-center')


//cart
let cart = [];

//getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch('products.json')
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image}
            })
            return products;
        }catch (e) {
            console.log(e)
        }

    }
}

//display products
class UI {
 displayProducts(products){
    let result = '';
    products.forEach(product => {
        result += `
         <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart">add to bag</i>
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$ ${product.price}</h4>
        </article>  
        `
    });
    productsDom.innerHTML = result;
 }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")]
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true
            }else{
                button.addEventListener('click',(event) => {
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;


                })
            }
        })

    }
}

//local storage
class Storage{
 static saveProducts(products){
     localStorage.setItem("products",JSON.stringify(products));
 }
}

document.addEventListener("DOMContentLoaded",() => {
    const ui = new UI();
    const products = new Products();


    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons()
    });



})

