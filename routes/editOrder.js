var express = require('express');
var router = express.Router();
const db = require('../dataBase/config');
const Product = require('../dataBase/product');
const Order = require(`../dataBase/order`);


/* GET home page. */
let tabOrderGeneral = [];

router.get('/:date', function (req, res, next) {
    let tabOrder = [];


    db.query(`SELECT a.price_product, a.amount_products, a.id_product, a.name_product, b.name_order, b.amount_products_order 
            FROM "productsDB" a 
            LEFT JOIN "ordersDB" b 
            ON a.id_product = b.id_product
            AND b.name_order='`+ req.params.date + `'`, (err, ress) => {
        if (err)
            console.log(err);
        else {
            for (var i = 0; i < ress.rows.length; i++) {
                let order = new Order();
                order.id = ress.rows[i].id_product;
                order.name_product = ress.rows[i].name_product;
                order.price = ress.rows[i].price_product;
                order.amount = ress.rows[i].amount_products;
                order.amount_products_order = ress.rows[i].amount_products_order;
                order.name = req.params.date;
                tabOrder.push(order);
            }

            tabOrderGeneral = tabOrder;

            console.log(tabOrderGeneral);

            res.render('editOrder', { dane: tabOrder, title: 'Edycja zamówienia' });
        }
    });
});


router.post('/:date', (req, res) => {
    console.log(req.body);
    let index = 0

    req.body.amount_order.forEach(element => {


        if (element !== null) {
            parseInt(element);
        }
        else {
            element = 0;
        }

        if (req.body.orderName !== '' && element >= 0) {
            let differenceAmount = 0;
            if (tabOrderGeneral[index].amount_products_order === null) {
                differenceAmount = parseInt(tabOrderGeneral[index].amount) - element;
            } else {
                differenceAmount = parseInt(tabOrderGeneral[index].amount) - element + parseInt(tabOrderGeneral[index].amount_products_order);
            }
            if (differenceAmount < 0) {
                console.log('Za mało produktów na magazynie');
            }
            else {

                db.query(`UPDATE "productsDB" SET amount_products=` + differenceAmount + ` WHERE id_product=` + tabOrderGeneral[index].id , (err, ress) => {
                    if (err) {
                        console.log(err);
                    }
                    else
                        console.log("Succeed");
                });

                if (tabOrderGeneral[index].amount_products_order === null) {
                    db.query(`INSERT INTO "ordersDB" (name_order, id_product, amount_products_order, name_product) VALUES ('` + req.body.orderName + `',` + tabOrderGeneral[index].id + `, ` + element + `, '` + tabOrderGeneral[index].name_product + `')`, (err, ress) => {

                        if (err)
                            console.log(err);
                        else
                            console.log("Succeed");
                    });
                }

                if (element == 0) {
                    db.query(`DELETE FROM "ordersDB" 
                    WHERE id_product=`+ tabOrderGeneral[index].id + ` 
                    AND name_order='` + req.params.date + `'`, (err, ress) => {

                        if (err)
                            console.log(err);
                        else
                            console.log("Succeed");
                    });
                }

                console.log(tabOrderGeneral[index].id)

                db.query(`UPDATE "ordersDB" SET name_order='` + req.body.orderName + `', amount_products_order=` + element + `
                        WHERE name_order='`+ req.params.date + `'
                        AND id_product=`+ tabOrderGeneral[index].id + `` , (err, ress) => {

                    if (err)
                        console.log(err);
                    else
                        console.log("Succeed");
                });
            }
        }
        else {
            console.log('Podaj tytuł listy oraz uzupełnij pola zamówienia');
        }
        index++;

    }
    );

    res.redirect('/orders');
});


module.exports = router;
