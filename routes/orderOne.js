var express = require('express');
var router = express.Router();
const db = require('../dataBase/config');
const Order = require('../dataBase/order');


router.get('/orderOne', function (req, res, next) {


    res.render('orderOne', { dane: req.params.data, title: 'Zamówienia' });
});


router.get('/show/:data', function (req, res, next) {

    console.log(req.params.data);

    let tabProd = [];
    db.query(`SELECT a.price_product, b.name_order, b.amount_products_order, b.name_product FROM "productsDB" a RIGHT OUTER JOIN "ordersDB" b ON a.id_product=b.id_product WHERE b.name_order='` + req.params.data + `'`, (err, ress) => {
        if (err)
            console.log(err);
        else {
            for (var i = 0; i < ress.rows.length; i++) {
                let order = new Order();
                console.log(ress.rows[i]);
                order.name = ress.rows[i].name_order;
                order.id_product = ress.rows[i].id_product;
                order.amount_products_order = ress.rows[i].amount_products_order;
                order.product_name = ress.rows[i].name_product;
                order.price_product = ress.rows[i].price_product;
                tabProd.push(order);
            }

            res.render('orderOne', { dane: tabProd, title: req.params.data });
        }
    });



});

router.get('/delete/:data', function (req, res, next) {

    console.log('dziala?');
    db.query(`DELETE FROM "ordersDB" WHERE name_order='` + req.params.data + `'`, (err, ress) => {

        if(err)
        console.log(err);
      else{
        res.redirect('/orders');
      }
    });
});

module.exports = router;

