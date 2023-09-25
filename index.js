import menuArray from './data.js';
const menuEle = document.getElementById('menu')
const cartItemEle = document.getElementById('cart-item')
const cartItemRemoveBtn = document.getElementsByClassName('cart-item-remove')
const cartQtyEle = document.getElementsByClassName('cart-item-qty')
const totalAmount = document.getElementById('total-amount')
const cartEle = document.getElementById('cart-table')
const cartArray = []


const menuData = menuArray.map((item) => {
    const { name, ingredients, id, price, emoji } = item
    return `<div class="ele-wrapper">
                <section class="ele-image">
                    <h1>${emoji}</h1>
                </section>
                <section class="ele-text">
                    <h1 class="ele-title">${name}</h1>
                    <h4 class="ele-toppings">${ingredients}</h4>
                    </section>
                    <section class="add-cart-section">
                        <h4>Add to Cart</h4>
                        <div class="circle">
                    <h2 class="ele-price">${"$" + price}</h2>
                </section>
            </div>
        </div>`;
}).join('');
menuEle.innerHTML = menuData;


const addCartEle = document.getElementsByClassName('add-cart-section')
for (let i = 0; i < addCartEle.length; i++) {
    addCartEle[i].addEventListener('click', addToCartHandler)
}

for (let i = 0; i < cartQtyEle.length; i++) {
    cartQtyEle[i].addEventListener('change', qtyChangeHandler)
}

function updateCartEventButtons() {
    for (let i = 0; i < cartItemRemoveBtn.length; i++) {
        cartItemRemoveBtn[i].addEventListener('click', cartRemoveHandler)
    }
}

function cartRemoveHandler(event) {
    const clickedButton = event.target
    const parentRow = clickedButton.parentElement.parentElement;
    parentRow.remove()
    updateTotalHandler()

}

function updateTotalHandler() {
    let cartItemContainer = document.getElementsByClassName('cart-table')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-item')

    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let row = cartRows[i]

        let priceEle = row.getElementsByClassName('cart-item-price')[0]
        let price = priceEle.textContent.replace('$', '')

        let qtyEle = row.getElementsByClassName('cart-item-qty')[0]
        let qty = qtyEle.value

        total += price * qty
    }
    totalAmount.textContent = '$' + total;
}

function qtyChangeHandler(e) {
    let val = e.target.value;
    if (val <= 0) {
        cartRemoveHandler(e)
    }
    updateTotalHandler()
}

cartEle.addEventListener('change', function (e) {
    qtyChangeHandler(e);
    updateTotalHandler();
});


function addToCartHandler(e) {

    let itemRow = e.target.parentElement.parentElement;
    let itemName = itemRow.getElementsByClassName('ele-title')[0].textContent


    let itemPrice = itemRow.getElementsByClassName('ele-price')[0].textContent
    itemPrice = parseFloat(itemPrice.replace('$', ''))

    if (cartArray.includes(itemName)) {
        const allItemsInCart = document.getElementsByClassName('cart-item')
        let i = 0;
        for (i = 0; i < allItemsInCart.length; i++) {
            let presentName = allItemsInCart[i].getElementsByClassName('cart-item-name')
            if (presentName[0].textContent == itemName) {
                console.log('found')
                break
            }
        }
        let row = allItemsInCart[i].parentElement;
        let qty = row.getElementsByClassName('cart-item-qty')[0]
        let value = parseFloat(qty.value)
        value += 1;
        qty.value = value;

    }
    else {
        cartArray.push(itemName)
        let newElement = `
            <tr class="cart-item" id="cart-item">
                <td>
                    <h3 class="cart-item-name">${itemName}</h3>
                </td>
                <td>
                    <input type="number" class="cart-item-qty" id="qty" value="1">
                </td>
                <td>
                    <h3 class="cart-item-price">$${itemPrice}</h3>
                    <button class="cart-item-remove">Remove</button>
                </td>
            </tr>
        `
        cartEle.innerHTML += newElement
        const cartQtyEle = document.getElementsByClassName('cart-item-qty')
        updateCartEventButtons()
    }
    updateTotalHandler()
}