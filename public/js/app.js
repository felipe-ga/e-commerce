
import UriApi from './UriApi.js'
import Product from './Product.js'
import Car from './Car.js'
import LocalStorage from './LocalStorage.js'


(() => {
    const urlApi = new UriApi(true);
    const product = new Product(urlApi.getUri());
    
    const localStorage = new LocalStorage();

    product.getAllProducts();

    const listCar = document.getElementById('car');
    const products = document.getElementById('list-products');
    const login = document.getElementById('login');
    const listProducts = document.querySelector('#list-car tbody')
    const removeCard = document.querySelector('#remove-all-car')
    const checkout = document.querySelector('#checkout')

    const car = new Car(localStorage);
    removeCard.onclick = (e) => car.deleteAllProducts(e);
    products.onclick = (e) => car.add(e);
    listProducts.onclick = (e) => car.delete(e);
    document.addEventListener('DOMContentLoaded', car.readLocalStorage());
    checkout.onclick = (e) => car.checkout(e);
})();