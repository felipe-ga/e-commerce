import LocalStorage from './LocalStorage.js'
class Customer {
    constructor(nameCustomer,emailCustomer){
        this.localStorage = new LocalStorage();
        this.name = nameCustomer;
        this.email = emailCustomer;
    }
    loadShoopingCarCurrent(){
        const listProductsShoopingCar = document.querySelector('#listPurchase tbody');
        if(listProductsShoopingCar !== null){
            listProductsShoopingCar.innerHTML = "";
            let products;
            products = this.localStorage.getLocalStorage("products");
            const self = this;
            products.forEach(function(product){

                let subtotal = (product.price * product.quantity);
                let discount = 0;
                if(product.discount > 0){
                    discount = subtotal - ((product.discount * subtotal)/ 100);
                }
                const tr = document.createElement("tr");
                let row;
                row = `
                <td class=" w-full lg:w-1/3 p-3 text-gray-800 border border-b block lg:table-cell relative lg:static">
                        <center><img src="${product.img}" class="w-20 h-20 ml:w-20 ml:h-1/2 sm:w-20 sm:h-20"></center>
                    </td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">${product.title}</td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">${product.price.toFixed(2)}</td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <input class="product w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="number" min="1" value="${product.quantity}">
                    </td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        ${discount}
                    </td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">${parseFloat(subtotal - discount).toFixed(2)}</td>
                    <td class="w-full lg:w-1/3 p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <a id="${product.id}" href="#"  class="productID ml:w-50 lg:h-50 ml:w-50 lg:h-50 delete-product fa fa-times" data-id="${product.id}"></a>
                    </td>
                `;
                tr.addEventListener('change', (e) => function(el,customer){
                    let productId,value;
                    value = el.querySelector('.product').value;
                    productId  = el.querySelector('.productID').getAttribute('data-id');
                    let products,product;
                    products = customer.localStorage.getLocalStorage("products");
                    products.forEach(function(p){
                        if(String(productId).trim() === String(p.id).trim()){
                            p.quantity = value;
                            return;
                        }
                    });
                    localStorage.setItem('products',JSON.stringify(products));
                    customer.loadShoopingCarCurrent();
                    customer.calculateTotal()
                }(tr,self));
                tr.innerHTML = row;
                listProductsShoopingCar.appendChild(tr);
            });
            
        }
    }
    
    checkoutPurchase(e){
        e.preventDefault();
        if(this.localStorage.getLocalStorage("products").length === 0){
            Swal.fire('Shooping car is empty')
        }else if(this.name.value === '' || this.email.value === ''){
            Swal.fire('please fill the required elements')
        }else{
            this.saveCustomerLocalStorage({
                'name':this.name.value,
                'email':this.email.value
            })
            location.href = "payment.html";
        }
    }

    saveCustomerLocalStorage(json){
        localStorage.setItem('customer',JSON.stringify(json))
    }

    calculateTotal(){
        if(document.getElementById('total') != null){
            let products;
            let total = 0;
            let discount = 0;
            products = this.localStorage.getLocalStorage("products");
            for(let i = 0;i < products.length;i++){
                let element = Number(products[i].price * products[i].quantity);
                let discountTmp = Number((element * products[i].discount) / 100);
                total = total + element;
                discount = discount + discountTmp;
            }
            document.getElementById('total').innerHTML = "Total : " + parseFloat(total - discount).toFixed(2);
        }
    }

    deleteProduct(e){
        e.preventDefault();
        let product, productId;
        if(e.target.classList.contains('delete-product')){
            e.target.parentElement.parentElement.remove();
            product = e.target.parentElement.parentElement;
            productId = product.querySelector('a').getAttribute('data-id');
            this.localStorage.deleteProductLocalStorage(productId);
            this.calculateTotal();
        }
    }

    checkExistCustomerLocalStorage(){
        if(this.localStorage.getCustomerLocalStorage('customer') != null){
            let customerJson = this.localStorage.getCustomerLocalStorage('customer');
            document.getElementById('nameCustomer').value = customerJson.name;
            document.getElementById('emailCustomer').value = customerJson.email;
        }
    }

    calculateCantidad(e){
        console.log(e)
        let productId,value;
        value = e.querySelector('.product').value;
        productId  = e.querySelector('.productID').getAttribute('data-id');
        let products,product;
         products = this.localStorage.getLocalStorage();
         products.forEach(function(p){
             console.log(productId)
             if(String(productId).trim() === String(p.id).trim()){
                 p.quantity = value;
                 return;
             }
         });
         localStorage.setItem('products',JSON.stringify(products));
         purchase.readLocalStoragePurchase()
         purchase.calculateTotal()
     }
     
}

export default Customer;