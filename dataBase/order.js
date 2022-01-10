class Order{
    constructor (name, id_product, amount_products_order, product_name, price_product, amount_product){
        this.name=name;
        this.id_product=id_product;
        this.amount_products_order=amount_products_order;
        this.product_name=product_name;
        this.price_product=price_product;
        this.amount_product=amount_product;
    }

}

module.exports=Order;