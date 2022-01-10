var express = require('express');
var router = express.Router();
const db = require('../dataBase/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addProduct', { title: 'Dodaj produkt' });
});

router.post('/', (req, res) => {

    const body = req.body; 
  
      db.query(`INSERT INTO "productsDB" (name_product, price_product, amount_products) VALUES ('`+ body.productName_add + `', ` + body.priceProduct_add + `,` + body.amountProduct_add + `)`, (err, ress) =>{
       
        if(err)
        console.log(err);
        else{
        console.log("Succeed")
        res.redirect('/');
      }});
  });

module.exports = router;
