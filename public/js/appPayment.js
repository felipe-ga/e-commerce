
import Payment from './Payment.js'

(() => {
    const payment = new Payment();
    const process = document.getElementById('process');
    process.onclick = (e) => payment.executePayment();
    const back = document.querySelector('#backPurchase')
})();
