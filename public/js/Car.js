class Car {
    constructor(localStorage){
        this.listProducts = document.querySelector('#list-car tbody')
        this.localStorage = localStorage;
    }

    readLocalStorage(){
        let products;
        products = this.localStorage.getLocalStorage("products");
        products.forEach(p => 
            this.addRow(p)
        );
    }

    getListProductSelector(){
        return this.listProducts;
    }

    add(e){
        e.preventDefault();
        if(e.target.classList.contains('add-car')){
            const product = e.target.parentElement.parentElement;
            this.buildProduct(product);
        } 
    }

    buildProduct(product){
        let priceTmp = String(product.querySelector('.price').textContent);
        const detailProduct = {
            img : product.querySelector('img').src,
            title : product.querySelector('.name').textContent,
            price : parseFloat(priceTmp.substring(1)),
            discount : parseInt(product.querySelector('.discount').textContent),
            id : String(product.querySelector('h1').textContent).trim(),
            quantity : 1
        }
        let productsLs = this.localStorage.getLocalStorage("products");
        let exist = false;
        productsLs.forEach(function(p){
            if(detailProduct.id === p.id){
                exist= true;
            }
        });
        if(exist){
            detailProduct.quantity = detailProduct.quantity + 1;
            this.localStorage.saveProductLocalStorage(detailProduct);
            Swal.fire('This product exist')
        }else{
            this.insert(detailProduct);
            Swal.fire('This product was added')
        }
    }

    insert(product){
        this.addRow(product)
        this.localStorage.saveProductLocalStorage(product);
    }

    delete(e){
        e.preventDefault();
        let product, productId;
        if(e.target.classList.contains('delete-product')){
            e.target.parentElement.parentElement.remove();
            product = e.target.parentElement.parentElement;
            productId = product.querySelector('a').getAttribute('data-id');
            this.localStorage.deleteProductLocalStorage(productId);
        }
    }

    deleteAllProducts(e){
        e.preventDefault();
        while(this.listProducts.firstChild){
            this.listProducts.removeChild(this.listProducts.firstChild);
        }
        this.localStorage.deleteAllLocaStorage();
        return false;
    }

    addRow(product){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${product.img}" class="w-10 ml:w-50 lg:h-50 ml:w-50 lg:h-50 ">
            </td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <a href="#" class="delete-product fa fa-times" data-id="${product.id}"></a>
            </td>
        `;
        this.listProducts.append(row);
    }
    checkout(e){
        e.preventDefault();
        if(this.localStorage.getLocalStorage("products").length > 0){
            location.href = "purchase.html";
        }else{
            Swal.fire('Shooping car is empty')
        }
    }
}

export default Car;
