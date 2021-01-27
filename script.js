

// Объект с продуктами
const products = {
    // Гамбургер простой
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcal: 400,
        amount: 0,
        get Sum() {
            return this.amount * this.price;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    },
    // Гамбургер FRESH
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcal: 500,
        amount: 0,
        get Sum() {
            return this.amount * this.price;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    },
    // FRESH COMBO
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcal: 700,
        amount: 0,
        get Sum() {
            return this.amount * this.price;
        },
        get Kcal() {
            return this.amount * this.kcal;
        }
    }
}

// Объект с начинками (модификации)
const fillings = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 500,
        kcal: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 300,
        kcal: 10
    },
    cheese: {
        name: 'Сыр',
        price: 400,
        kcal: 30
    }
}


const plusMinusButtons = document.querySelectorAll('.main__product-btn'),
    fillingsCheckbox = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptButton = document.querySelector('.receipt__window-btn');


for (let i = 0; i < plusMinusButtons.length; i++) {
    plusMinusButtons[i].addEventListener('click', function () {
        plusOrMinus(this);
    })
}

function plusOrMinus(button) {
    // closest() - метод, который подключается к родительскому элементу.
    // getAttribute() - метод, который берёт информацию из атрибута.

    const parent = button.closest('.main__product'), // Подключаемся к родителю
        parentId = parent.getAttribute('id'), // Берём значение атрибута id
        out = parent.querySelector('.main__product-num'), // Подключение к кол-ву
        price = parent.querySelector('.main__product-price span'), // Подключение к цене
        kcal = parent.querySelector('.main__product-kcall span'), // Подключение к калориям
        buttonSymbol = button.getAttribute('data-symbol'); // Получаем данные из data-symbol

    if (buttonSymbol === '+' && products[parentId].amount < 10) {
        products[parentId].amount++;
    } else if (buttonSymbol === '-' && products[parentId].amount > 0) {
        products[parentId].amount--;
    }

    // Вывод в HTML
    out.innerHTML = products[parentId].amount;
    price.innerHTML = products[parentId].Sum;
    kcal.innerHTML = products[parentId].Kcal;
}

for ( let i = 0; i < fillingsCheckbox.length; i++) {
    fillingsCheckbox[i].addEventListener('click', function (){
        addFilling(this)
    })
}

function addFilling(checkbox) {
    const parent = checkbox.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcal = parent.querySelector('.main__product-kcall span'),
        checkboxData = checkbox.getAttribute('data-extra');
     
    products[parentId][checkboxData] = checkbox.checked;
    
    if (products[parentId][checkboxData] === true) {
        products[parentId].price += fillings[checkboxData].price;
        products[parentId].kcal += fillings[checkboxData].kcal;
    } else {
        products[parentId].price -= fillings[checkboxData].price;
        products[parentId].kcal -= fillings[checkboxData].kcal;
    }
    
    price.innerHTML = products[parentId].Sum
    kcal.innerHTML = products[parentId].Kcal
        
        
}

let arrayProducts = [],
    totalName = '',
    totalPrice = 0,
    totalKcal = 0;

addCart.addEventListener('click', function () {
    for (const key in products) {
        const productObject = products[key];

        if (productObject.amount > 0) {
            arrayProducts.push(productObject)

            for (const key2 in productObject) {
                if (productObject[key2] === true) {
                    productObject.name += '\n' + fillings[key2].name
                }
            }
        }

        productObject.price = productObject.Sum
        productObject.kcal = productObject.Kcal
    }

    for (let i = 0; i < arrayProducts.length; i++) {
        totalPrice += arrayProducts[i].price
        totalKcal += arrayProducts[i].kcal
        totalName += '\n' + arrayProducts[i].name + '\n'
    }

    receipt.style.display = 'flex'
    setTimeout(function () {
        receipt.style.opacity = 1
        receiptWindow.style.top = 0
    }, 200)

    receiptOut.innerHTML = `Вы купили:\n${totalName}\nКалорийность: ${totalKcal}\nСтоимость покупки: ${totalPrice} сумов`
})


receiptButton.addEventListener('click', function () {
    location.reload() 
})

 






// let leveling = document.querySelector('.header__timer-extra'),
//     coeficient = 0;
    
// function rising() {
//     leveling.innerHTML = coeficient;
//     coeficient++;
    
//     if (coeficient <= 70) {
//         setTimeout(() => rising(), 10);
//     }
//     else if (coeficient <= 80){
//         setTimeout(() => rising(), 50);
//     }
//     else if (coeficient <= 90){
//         setTimeout(() => rising(), 100)
//     }
//     else if (coeficient <= 100){
//         setTimeout(() => rising(), 150)
//     }

// }
// rising()


// const pressBurger = document.querySelector('.main__product-info'),
//     viewBurger = document.querySelector('.view'),
//     viewBurgerImg = document.querySelector('.view img'),
//     viewBurgerClose = document.querySelector('.view__close');
    
// for ( a = 0; a < pressBurger.length; a++) {
//     pressBurger[a].addEventListener('dblclick', function() {
//         burgerExpand()
//         changeImage(this)
//     })
// }

// function burgerExpand() {
//     viewBurger.classList.add('active')
// }
// viewBurgerClose.addEventListener('click', function(){
//     burgerClose()
// })

// function burgerClose() {
//     viewBurger.classList.remove('active')
// }

// function changeImage(element) {
//     const path = element.querySelector('img').getAttribute('src');
//     viewBurgerImg.setAttribute('src', path)
// }












