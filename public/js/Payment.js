import UriApi from './UriApi.js'
import LocalStorage from './LocalStorage.js'
class Payment {
    constructor(){
        this.uriApi = new UriApi(true);
        this.localStorage = new LocalStorage();
        this.url = `${this.uriApi.getUri()}purchase/`;
    }

    backPurchase(e){
        loadHtml("purchase.html","render","./js/appPurchase.js")
    }

    executeService(json){
        fetch(this.url, {
                    method: "POST",
                    body: JSON.stringify(json),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(error =>{
                    console.log(error)
            });
            return true;
    }

    executePayment(){
        const card = document.getElementById('card');
        const dateEx = document.getElementById('date');
        const cvv = document.getElementById('cvv');
        if(card.value == '' || dateEx.value == '' || cvv.value == ''){
            Swal.fire('Please,empty fields');
        }else{
            let success = false;
            let array = [];
            let productsLs= this.localStorage.getLocalStorage("products");
            for(let i = 0;i<productsLs.length;i++){
                array.push({
                    "idProduct":productsLs[i].id,
                    "quantity":productsLs[i].quantity,
                    "total": productsLs[i].quantity * productsLs[i].price
                })
            }
            let date = new Date();
            
            let json = {
                    "idCustomer": "31000000-0000-0000-0000-000000000000",
                    "date":date,
                    "paymentMethod": "T",
                    "comment": "",
                    "status": "1",
                    "products" : array
                };
                console.log(json)
                success = this.executeService(json);
                if(success){
                    Swal.queue([{
                        title: 'Alert',
                        confirmButtonText: 'Continue',
                        text:
                          'Payment successufuly',
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            this.localStorage.deleteAllLocaStorage();
                            location.href = 'index.html';
                        }
                      }])
                      
                }
        }
    }
}

export default Payment;