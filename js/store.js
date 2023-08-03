let products = [
    {
        id: 1,
        title: 'Album 1',
        price: 13.45,
        img: "Images/Album 1.png",
        count: 1
    },
    {
        id: 2,
        title: 'Album 2',
        price: 19,
        img: "Images/Album 2.png",
        count: 1
    },
    {
        id: 3,
        title: 'Album 3',
        price: 18,
        img: "Images/Album 3.png",
        count: 1
    },
    {
        id: 4,
        title: 'Album 4',
        price: 13,
        img: "Images/Album 4.png",
        count: 1
    },
    {
        id: 5,
        title: 'Album 5',
        price: 15,
        img: "Images/Cofee.png",
        count: 1
    },
    {
        id: 6,
        title: 'Album 6',
        price: 45,
        img: "Images/Shirt.png",
        count: 1
    }
];

let basket = []
let $ = document
let shopItemsContainer = $.querySelector('.shop-items')
let bastekProductsContainer = $.querySelector('.cart-items')
let cartTotalPrice = $.querySelector('.cart-total-price')

let productFragment = document.createDocumentFragment()

products.map(function(product){
    shopItemsContainer.insertAdjacentHTML('beforeend', '<div class="shop-items"><div class="shop-item"><span class="shop-item-title">'+ product.title +'</span><img class="shop-item-image" src="'+ product.img +'"><div class="shop-item-details"><span class="shop-item-price">'+ product.price +'</span><button class="btn btn-primary shop-item-button" onclick="addToBasket('+ product.id +')">ADD TO CART</button></div></div></div>')
})

function addToBasket(productId){
    let mainProduct = products.find(function(item){
        return item.id === productId;
    })
    
    basket.push(mainProduct)

    basketProductsGenerator(basket)
    calcutePrice(basket)
}

function basketProductsGenerator (userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach (function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.setAttribute('min', '1')
        basketProductInput.addEventListener('change', function(){
            updatedcount(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'Remove'
        basketProductRemoveBtn.addEventListener('click', function(){
            removeProductFromBasket(product.id)

        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        productFragment.append(basketProductContainer)
        
    })
    bastekProductsContainer.append(productFragment)
}

function removeProductFromBasket(productId){
    basket = basket.filter(function(item){
        return item.id !== productId
    })
    basketProductsGenerator(basket)
    calcutePrice(basket)
}

function calcutePrice(arr){
    let totalPrice = 0
    arr.forEach(function(product){
        totalPrice += product.count * product.price
    })
    cartTotalPrice.innerHTML = totalPrice
}

function updatedcount(productId, newCount){
    basket.forEach(function(item){
        if(productId == item.id){
            item.count = newCount
        }
    })
    calcutePrice(basket)
}