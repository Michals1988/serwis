var express = require('express');
var router = express.Router();
const db=require('../dataBase/config');
const Product=require('../dataBase/product');

/* GET home page. */

router.get('/', function(req, res, next) {
  let tabProd=[];
  db.query(`SELECT * FROM "productsDB" ORDER BY name_product`, (err, ress) =>{
    if(err)
      console.log(err);
    else{
      for(var i=0; i<ress.rows.length; i++){
        let prod=new Product();
        prod.name=ress.rows[i].name_product;
        prod.price=ress.rows[i].price_product;
        prod.amount=ress.rows[i].amount_products;
        tabProd.push(prod);
      }
    res.render('index', { dane: tabProd, title: 'Stan magazynowy'});      
      }
  });
});

module.exports = router;
