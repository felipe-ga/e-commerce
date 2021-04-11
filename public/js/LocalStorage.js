class LocalStorage {

    getLocalStorage(name){
        if(localStorage.getItem(name) === null){
            return [];
        }else{
            return JSON.parse(localStorage.getItem(name));
        }
    }

    getCustomerLocalStorage(name){
        if(localStorage.getItem(name) === null){
            return null;
        }else{
            return JSON.parse(localStorage.getItem(name));
        }
    }

    saveProductLocalStorage(product){
        let products;
        products = this.getLocalStorage("products");
        let exist = false;
        products.forEach(function(p){
            if(product.id === p.id){
                exist= true;
            }
        });
        if(!exist){
            products.push(product);
        }
        localStorage.setItem('products',JSON.stringify(products));
    }

    deleteProductLocalStorage(productId){
        let products;
        products = this.getLocalStorage("products");
        localStorage.setItem('products',JSON.stringify(products.filter(p=> String(p.id).trim() !== String(productId).trim())));
    }

    deleteAllLocaStorage(){
        localStorage.clear("products");
    }
}

export default LocalStorage;