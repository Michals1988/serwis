var express = require('express');
var router = express.Router();
const db = require('../dataBase/config');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('orders', { title: 'Orders' });
// });

router.get('/', function (req, res, next) {
  let tabOrder = [];
  db.query(`SELECT name_order FROM "ordersDB"`, (err, ress) => {
    if (err)
      console.log(err);
    else {
      for (var i = 0; i < ress.rows.length; i++) {
        tabOrder.push(ress.rows[i].name_order);
      }


      const newTabOrder = tabOrder => tabOrder.filter((item, index) => tabOrder.indexOf(item) === index);
      const duplicateElement = newTabOrder(tabOrder);

      res.render('orders', { dane: duplicateElement, title: 'Zamówienia' });
    }
  });
});

router.post('/', (req, res) => {

  const body = req.body;


  body.search
  


  db.query(`SELECT name_order FROM "ordersDB" 
          WHERE name_order LIKE '%` + body.search + `%'` , (err, ress) => {
    let tabOrder = [];
    if (err)
      console.log(err);
    else {
      for (var i = 0; i < ress.rows.length; i++) {
        tabOrder.push(ress.rows[i].name_order);
      }


      const newTabOrder = tabOrder => tabOrder.filter((item, index) => tabOrder.indexOf(item) === index);
      const duplicateElement = newTabOrder(tabOrder);

      res.render('orders', { dane: duplicateElement, title: 'Zamówienia' });
    }
  });
});



module.exports = router;

