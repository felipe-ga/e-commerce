class Product {
    constructor(uri){
        this.url = `${uri}product/`;
    }

    
    getAllProducts(){
        axios.get(this.url)
        .then(res => {
            let container = document.querySelector('.cards');
            let html = '';
            this.products = res.data;
            this.products.forEach(product => {
                let htmlSegment = `<div class="bg-white shadow p-1 rounded" id="${product.idProduct}">
                                        <div class="text-center mt-4">
                                            <h1 class="hidden idproduct"> ${product.idProduct}</h1>
                                            <p class="text-gray-600 font-bold name">${product.name}</p>
                                            <p class="text-sm font-hairline text-gray-600 mt-1">sku : ${product.sku}</p>
                                        </div>
                                        <div class="flex justify-center items-center mt-4">
                                            <img class="w-1/2 h-1/2 ml:w-1/2 ml:h-1/2 sm:w-1/2 sm:h-1/2" src="${product.img}" alt="${product.name}" />
                                            </div>
                                            <div class="mt-6 flex justify-around text-center">
                                            <div>
                                                <p class="text-gray-700 font-bold discount">${product.discount}%
                                                </p>
                                                <p class="text-xs mt-2 text-gray-600 font-hairline">Descuento
                                                </p>
                                            </div>
                                            <div>
                                            <p class="text-gray-700 font-bold"><p class="price">$${product.price}</p>
                                                </p>
                                                <p class="text-xs mt-2 text-gray-600 font-hairline">precio
                                                </p>
                                            </div>
                                            </div>
                                            <div class="mt-6">
                                            <button class="add-car rounded shadow-md w-full items-center shadow bg-green-500 px-4 py-2 text-white hover:bg-green-400">
                                                Add Car
                                            </button>
                                            </div>
                                        </div>`;
        
                html += htmlSegment;
        });
        container.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
    }
}
export default Product;