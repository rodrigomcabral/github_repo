import PocketBase from './pocketbase.min.js';

const client = new PocketBase('http://127.0.0.1:8090'); 

// creating a new form
// getting the data from the filled form id and storing in a variable
let form = document.getElementById("new-cheffe");
// creating an event handler to deal with the submitted form 
// event listeners can run multiple event handlers(actions) inside  
form.addEventListener('submit', async event=> {
  event.preventDefault();
  // creating an array object to store the data inside each created form 
  // handles the HTML by using the element as key and the inputs as the values
  const data = Object.fromEntries(new FormData(form))
  // storing the data in a variable once iterated over the inputs from the array by calling a function
  const inputs = Object.fromEntries([...form].map(i=> [i.name, i]))
  // in the same event, try to catch any errors commited while creating the form
  // ANYWAYS, WHY CREATE A VARIABLE USER TO CATCH THE ERRORS? ISN'T IT THE USER THE CLIENT? 
  try {
    const user = await client.users.create(data);
  // console.log("Step 1:", client.users, "Step 2:", user)
  // why the "err" is automatic runned as an error?
  } catch (err) {
    // reporting and displaying errors handlers by creating a variable to catch the errors
    const el = document.getElementById('user-create-error')
    // didn't understand this condition...
    if (err.data && err.data.message) {
      el.textContent = err.data.message
      const inputErrorDetails = err.data.data
      if (inputErrorDetails) {
        for (const [inputName, { message }] of Object.entries(inputErrorDetails)) {
          const input = inputs[inputName]
          if (!input) continue
          input.setCustomValidity(message)
          input.reportValidity()
          input.addEventListener("input", e => {
            input.setCustomValidity("")
          }, { once: true })
          break
        }
      }
    } else {
      // handle unexpected errors
      el.textContent = err.message
    }
    console.dir(err)
  }
});


// Define a variable to each element that need to be editable
const cart = document.querySelector()

let menuStatus = false;






/*creating events to open and close the menu-sidebar
function menuToggle() {
  if (menuStatus === false) {
    menuSidebar.style.transform = 'translate(0%)'
    menuStatus = true;
  } else if (menuStatus === true) {
    menuSidebar.style.transform = 'translate(-100%)'
    menuStatus = false;
  }
}

// important to not add the () after refering to a function, 
otherwise it will run imediatly
btnMenuSidebar.onclick = menuToggle;

// To get the details of all dishes and store them inside
separate objects
class Dish {
  async getproduct() {
    const response = await fetch("dishes.json");
    const data = await response.json();
    let dishes = data.items;
    dishes = dishes.map(item=> {
      const {title, price} = item.fields;
      const{id} = item.sys;
      const image = item.fields.image.fields.file.url;
      return {title, price, id, image};
    })
    return dishes;
  }
}

// Creating a user interface of the dishes:
adding and deleting dishes from the cart
class UI {
  displayProducts(dishes) {
    let result = "";
    dishes.forEach(dish=> {
      const dishDiv = document.createElement("div")
      // showing the number of items over the cart items
      dishDiv.innerHTML = `<div class="dish-card">
                              <img src="${dish.image}" alt="dish">
                              <span class="add-to-cart" data-id="${dish.id}">
                              <i class="fa fa-cart--plus fa-1x"
                              style="margin-right: 0.1em; font-size: 1em;"></i>
                              Add to cart
                              </span>
                              <div class="dish-name">${dish.title}</div>
                              <div class="dish-pricing">${dish.price}</div>
                            </div>`
      // accessing the dish query                       
      const p = document.querySelector(".dish")
      // append the selected item inside the cart
      p.append(dishDiv)
    })
  }
}

getButtons() {
  const btns = document.querySelectorAll(".add-to-cart")
  Array.from(btns)
  buttonsDOM = btns;
  btns.forEach((btn)=> {
    let id = btn.dataset.id
    let inCart = Cart.find((item)=>item.id===id);
    if (inCart) {
      btn.innerHTML = "In Cart"
      btn.dissabled = true
    }
    btn.addEventListener("click", (e)=> {
      e.currentTarget.innerHTML = "In Cart"
      e.currentTarget.style.color = "white"
      e.currentTarget.style.pointerEvents = "none"
      // store the dishes into cart
      let cartItem = {...Storage.getStorageProducts(id), 'amount': 1}
      Cart.push(cartItem)
      Storage.saveCart(Cart)
      // calculate and set the total items
      this.setCartValues(Cart)
      this.addCartItem(cartItem)
    })
  })
}

getSingleButton(id) {
  let btn;
  buttonsDOM.forEach((button)=> {
    if (button.dataset.id===id) {
      btn = button
    }
  })
  return btn;
}

class Storage {
  static saveProducts(dishes) {
    localStorage.setItem("dishes", JSON.stringify(dishes))
  }
  static getStorageProducts(id) {
    let dishes = JSON.parse(localStorage.getItem('dishes'))
    return dishes.find((item)=>item.id===id)
  }
  static saveCart(Cart) {
    localStorage.setItem('Cart', JSON.stringify(Cart))
  }
  static getCart() {
    return localStorage.getItem('Cart')? JSON.parse(localStorage.getItem("Cart")):[]
  }
}

document.addEventListener("DOMContentLoaded", ()=> {
  const dishes = new Dish();
  const ui = new UI();
  ui.setupApp()
  dishes.getproduct().then(dishes=> {
    ui.displayProducts(dishes)
    Storage.saveProducts(dishes)
  }).then(()=> {
    ui.getButtons();
    ui.cartLogic();
  })
})

// manipulate css by grabbing menu sidebar
elements while opening and closing
let toggleNavStatus = false;

let toggleNav = function() {
  // classes = '.' / id's = '#'
  let getSidebar = document.querySelector(".menu-sidebar");
  let getSidebarUl = document.querySelector(".menu-sidebar ul");
  //let getSidebarTitle = document.querySelector(".menu-sidebar span");
  let getSidebarLinks = document.querySelectorAll(".menu-sidebar a");
  
  if (toggleNavStatus === false) {
    // show the content after clicking the sidebar
    getSidebarUl.style.visibility = "visible";
    getSidebar.style.width = "272px";
    //getSidebarTitle.style.opacity = "0.5";

    // run a loop for as much indexes we have inside the array
    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i <arrayLength; i++) {
   // we want to grab the first link/index and change it's style
      getSidebarLinks[i].style.opacity = "1";
    }
    // change our nav status to true 
    toggleNavStatus = true;
  }
  else if (toggleNavStatus === true) {
    getSidebar.style.width = "50px";
    //getSidebarTitle.style.opacity = "0px";

    let arrayLength = getSidebarLinks.length;
    for (let i = 0; i <arrayLength; i++) {
     getSidebarLinks[i].style.opacity = "0"
    }
  }
  getSidebarUl.style.visibility = "hidden";
  toggleNavStatus = false;
}

// declare a variable so we can create a new cooks object 
//  and switch accordingly to the chosen cook

let cooksManager() {
  setNewCook: function(classType) {
    this.resetCook(classType);
    this.applyCook(classType);
  },
  resetCook: function(classType) {
    switch (classType) {
      // get the info about the new cook that it's going to join
      case document.querySelector(".new_cheffe"):
        // fill the new cook with the caractetistics attributed to Cooks
        cooks = new Cooks(classType, );

        break;
    } 
    // after the selections we need to change the interface to the cheffe
    let getInterface (meaning the div related to the new cook) = document.querySelector(".interface");
    getInterface.innerHTML = `<img src="" + classType.toLowerCase() + '. ' class=""> `;
    
  },
  applyCook: function(classType, ) {

  }
}

let cooks;

function Cooks(classType, name, nationality, history, picture) {
  // insert the properties and method related to the cooks
  this.classType = classType;
  this.name = name;
  this.nationality = nationality;
  this.dishes = dishes; 
  this.history = history;
  this.picture - picture;
  // create a link to jump to the Dishes offered per each 
}

function Dishes(classType, dishName, price, cook, ingredientes) {
  this.classType = classType;
  this.dishName = dishName;
  this.price = price;
  this.cook = Cooks.name;
  this.ingredientes = ingredientes; 

}








/* creating a new user

let user = document.getElementById("");
form.addEventListener('submit', async event=> {
  event.preventDefault()
  const data = Object.fromEntries(new FormData(form))
  const inputs = Object.fromEntries([...form].map(i=> [i.name, i]))
  try {
    const user = await client.users.create(data);
  } catch (err) {
    // In the case of an error while trying to create the user
    // this is to build the reporting and display the error
    const el = document.getElementById('user-create-error')
    if (err.data && err.data.message) {
      el.textContent = err.data.message
      const inputErrorDetails = err.data.data
      if (inputErrorDetails) {
        for (const [inputName, { message }] of Object.entries(inputErrorDetails)) {
          const input = inputs[inputName]
          if (!input) continue
          input.setCustomValidity(message)
          input.reportValidity()
          input.addEventListener("input", e => {
            input.setCustomValidity("")
          }, { once: true })
          break
        }
      }
    } else {
      // handle unexpected errors
      el.textContent = err.message
    }
    console.dir(err)
  }
});
*/






//ABOUT CART (ecommerce)

// creating events to open and close the cart
// changing the style of the cart-sidebar
/*
cart.addEventListener("click", function() {
  cartSidebar.style.transform = "translate(0%)"
  const bodyOverlay = document.createElement("div")
  bodyOverlay.classList.add("overlay")
  setTimeout(function() {
    document.querySelector("body").append(bodyOverlay)
  }, 300)
})

closeCart.addEventListener("click", function() {
  cartSidebar.style.transform = "translate(100%)"
  const bodyOverlay = document.querySelector(".overlay")
  document.querySelector("body").removeChild(bodyOverlay)
})




// increasing/decreasing the cart products 
setCartValues(cart) {
  let tempTotal = 0;
  let itemsTotal = 0;
  Cart.map((item)=> {
    tempTotal += (item.price*item.amount);
    itemsTotal += item.amount;
    parseFloat(tempTotal.toFixed(2))
  })
  cartItemsTotal.innerHTML = itemsTotal
  cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}




// increase/decrease the cart quantity
addCartItem(cartItem) {
  let cartItemUi = document.createElement("div")
  cartItemUi.innerHTML = `<div class="cart-dish">
                          <div class="dish-image">
                            <img src="${cartItem.image} alt="dish">
                          </div>
                          <div class="cart-dish-content">
                          <div class="cart-dish-name"><h3>${cartItem.title}</h3></div>
                          <div class="cart-dish-price"><h3>$${cartItem.price}</h3></div>
                          <div class="cart-dish-remove" data-id="${cartItem.id}"
                            <a href="#" style="color: red;">remove</a></div>
                          <div class="plus-minus">
                          <i class="fa fa-angle-left add-amount"
                            data-id="${cartItem.id}"></i>
                          <span class="number-of-items">${cartItem.amount}"</span>
                            data-id="${cartItem.id}"</i>
                          </div>
                          </div>`
                          // append the cart content to cart item
                          cartContent.append(cartItemUi)
}

setupApp() {
  Cart = Storage.getCart()
  this.setCartValues(Cart)
  Cart.map((item)=> {
    this.addCartItem(item)
  })
}


cartLogic() {
    clearBtn.addEventListener("click", ()=> {
      this.closeCart()
})
  // logic to remove the button    
  cartContent.addEventListener("click", (event)=> {
    if (event.target.classList.contains("cart-dish-remove")) {
      let id = event.target.dataset.id
      this.removeItem(id)
      let div = event.target.parentElement.parentElement.parentElement.parentElement
      div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
    }
    else if (event.target.classList.contains("add-amount")) {
      let id = event.target.dataset.id
      let item = Cart.find((item)=>item.id===id)
      item.amount++
      Storage.saveCart(Cart)
      this.setCartValues(Cart)
      event.target.nextElementSibling.innerHTML = item.amount
    }
    // changing the number of products in the cart
    else if (event.target.classList.contains("reduce-amount")) {
      let id = event.target.dataset.id
      let item = Cart.find((item)=>item.id===id)
      if (item.amount > 1) {
        item.amount--
        Storage.saveCart(Cart)
        this.setCartValues(Cart)
        event.target.previousElementSibling.innerHTML = item.amount
     }
      else {
        this.removeItem(id)
        let div = event.target.parentElement.parentElement.parentElement.parentElement
        div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
      }
    }
})
}

addAmount() {
    const addBtn = document.querySelectorAll(".add-amount")
    addBtn.forEach((btn)=> {
      btn.addEventListener("click", (event)=> {
        let id = (event.currentTarget.dataset.id)
        Cart.map((item)=> {
          if (item.id===id) {
          item.amount++
          Storage.saveCart(Cart)
          this.setCartValues(Cart)
          const amountUi = event.currentTarget.parentElement.children[1]
          amountUi.innerHTML = item.amount
        }
        })
      })
    })
}

reduceAmount() {
  const reduceBtn = document.querySelectorAll(".reduce-amount")
  reduceBtn.forEach((btn)=> {
    btn.addEventListener("click", (event)=> {
      let id = (event.currentTarget.dataset.id)
      Cart.map((item)=> {
        if (item.id===id) {
          item.amount--
          if (item.amount > 0) {
            Storage.saveCart(Cart)
            this.setCartValues(Cart)
            const amountUi = event.currentTarget.parentElement.children[1]
            amountUi.innerHTML = item.amount
          } else {
            event.currentTarget.parentElement.parentElement.parentElement.removeChild(event.currentTarget.parentElement.parentElement)
            this.removeItem(id)
          }
         }
      })
    })
  })
}

clearCart() {
  let cartItem = Cart.map(item=>item.id)
  cartItem.forEach((id)=>this.removeItem(id))
  const cartDish = document.querySelectorAll(".cart-dish")
  cartDish.forEach((item)=> {
    if (item) {
      item.parentElement.removeChild(item)
    }
  })
}

removeItem(id) {
  Cart = Cart.filter((item)=>item.id!==id)
  this.setCartValues(Cart)
  Storage.saveCart(Cart)
  let button = this.getSingleButton(id)
  button.style.pointerEvents = "unset"
  button.innerHTML = `<i class="fa fa-cart-plus"></i>Add To Cart`
}
*/


