
import Customer from './Customer.js';
(() => {
    
    const process = document.getElementById('process');
    
    const listPurchase = document.querySelector('#listPurchase tbody');
    const car = document.getElementById('containerCar');
    const customer = new Customer(document.getElementById('nameCustomer'),document.getElementById('emailCustomer'));
    process.onclick = (e) => customer.checkoutPurchase(e);
    car.onclick = (e) => customer.deleteProduct(e);
    
    document.addEventListener('DOMContentLoaded', customer.loadShoopingCarCurrent());
    customer.calculateTotal();
    customer.checkExistCustomerLocalStorage();
    
})();





