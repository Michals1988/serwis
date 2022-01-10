var express = require('express');
var router = express.Router();
const db = require('../dataBase/config');
const Product = require('../dataBase/product');

/* GET home page. */
let tabProdGeneral = [];

router.get('/', function (req, res, next) {
  let tabProd = [];

  db.query(`SELECT * FROM "productsDB" ORDER BY name_product `, (err, ress) => {
    if (err)
      console.log(err);
    else {
      for (var i = 0; i < ress.rows.length; i++) {
        let prod = new Product();
        prod.id = ress.rows[i].id_product;
        prod.name = ress.rows[i].name_product;
        prod.price = ress.rows[i].price_product;
        prod.amount = ress.rows[i].amount_products;
        tabProd.push(prod);
      }
      tabProdGeneral = tabProd;

      res.render('newOrder', { dane: tabProd, title: 'Złóż zamówienie' });
    }
  });
});


router.post('/', (req, res) => {
  console.log(tabProdGeneral);
  let index = 0

  req.body.amount_order.forEach(element => {

    if (element != '') {
      parseInt(element);
    }
    else {
      element = 0;
    }

    if (req.body.orderName != '' && element > 0) {

      const differenceAmount = parseInt(tabProdGeneral[index].amount) - element;

      if (differenceAmount < 0) {
        console.log('Za mało produktów na magazynie');
      }
      else {
        db.query(`UPDATE "productsDB" SET amount_products=` + differenceAmount + ` WHERE id_product=` + tabProdGeneral[index].id, (err, ress) => {
          if (err)
            console.log(err);
          else
            console.log("Succeed");
        });


        db.query(`INSERT INTO "ordersDB" (name_order, id_product, amount_products_order, name_product) VALUES ('` + req.body.orderName + `',` + tabProdGeneral[index].id + `, ` + element + `, '`+ tabProdGeneral[index].name +`')`, (err, ress) => {

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
