class UriApi {
    constructor(dev){
        this.uri = "http://localhost/e-commerce/api/";
    }

    getUri(){
        return `${this.uri}`;
    }
}
export default UriApi;