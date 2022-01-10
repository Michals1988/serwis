const { Client } = require('pg');
const { listenerCount } = require('../app');
//const Order=require('./schema');
//const SingleOrder=require('./schema');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'order-db',
  password: 'root',
  port: 5432,
})


   client.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  
    var queryString=`insert into "productsDB" (name_product, price_product, amount_products) values ('mikolaj', 36, 1854)`;

//   function saveSingleOrder(product){
//     client.query(queryString,
//         (err, res) => {
//           if(err){
//             console.log(err);
//           }
//           else{
//             console.log(res.rows.name_product);
//           }
//       }
//     );
//   };



  // const saveSingleProduct=(product)=>{
  //   client.query('INSERT INTO productsDB(name_product,price_product, amount_product) VALUE (product.name_product, product.price_product, product.amount_product)',
  //       (err, res) => {
  //       console.log(err, res);
  //     }
  //   );
  // };

module.exports=client;
  //module.exports=connect;
//   module.exports=saveSingleOrder;