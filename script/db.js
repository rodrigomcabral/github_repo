
import PocketBase from './pocketbase.min.js';
const client = new PocketBase()

const adminAuthData = await client.admins.authViaEmail('rodrigomatosc@hotmail.com', 'Fortal1994!'); client.authStore.clear();

// Why I don't need to specify the type of event?
await client.realtime.subscribe('meals', function (e) {
    console.log(e.record);
});

await client.realtime.subscribe('orders', function (e) {
    console.log(e.record);
}); 
    
const getMeals = await client.records.getFullList('meals', 200 /* batch size */, {
    sort: '-created',
});
console.log({adminAuthData, getMeals})


const getOrders = await client.records.getFullList('orders', 200 /* batch size */, {
    sort: '-created',
});
console.log({adminAuthData, getOrders})



const getMealsById = {id: string} => {
    return client.records("meals").getOne(id);
}

const getOrdersById = {id: string} => {
    return client.records("orders").getOne(id);
}

// How to do the same with the 'orders' Collections?

const addMeals = async(meal: Meal) => {
    return client.records("meals").create(meal);
}

const addOrders = async(order: Order) => {
    return client.records("orders").create(order);
}

const deleteMealsById = {id: string} => {
    return client.records("meals").delete(id)
}

const deleteOrdersById = {id: string} => {
    return client.records("orders").delete(id)
}

const updateMealById = {meal: Meal} => {
    return client.records("meals").update(meal.id)
}

const updateOrderById = {order: Order} => {
    return client.records("orders").update(order.id)
}


