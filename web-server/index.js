
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { listActions } = require('./listActions');

const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 8585;

const listShopsFile = 'list-shop.json';
const listItemsMcDonaldsFile = 'list-items-mc-donalds.json';
const listItemsKFCFile = 'list-items-kfc.json';
const listItemsBurgerKingFile = 'list-items-burger-king.json';
const listCart = 'cart.json';



app.get('/shops', (req, res) => {
  listActions.readFile(`data/${listShopsFile}`)
    .then(list => res.send(list))
});

app.get('/list-items/mc-donalds', (req, res) => {
  listActions.readFile(`data/${listItemsMcDonaldsFile}`)
    .then(list => res.send(list))
});

app.get('/list-items/kfc', (req, res) => {
  listActions.readFile(`data/${listItemsKFCFile}`)
    .then(list => res.send(list))
});

app.get('/list-items/burger-king', (req, res) => {
  listActions.readFile(`data/${listItemsBurgerKingFile}`)
    .then(list => res.send(list))
});

app.get('/cart', (req, res) => {
  listActions.readFile(`data/${listCart}`)
    .then(list => res.send(list))
});


app.post('/cart/add-item', (req, res) => {
  const payload = req.body;
  listActions.writeFile('data/cart.json', payload)
});

app.post('/cart/delete-item', (req, res) => { 
  const payload = req.body;

  listActions.readFile(`data/${listCart}`)
    .then(cartList => {
      const parsedListCart = JSON.parse(cartList);
      return Promise.resolve(parsedListCart);
    })
    .then(parsedListCart => {
      const foundItemById = parsedListCart.find(item => item.id === payload.idItem)
      
      const updListCartList = parsedListCart.filter(item => {
        return item.id !== foundItemById.id
      })

      return Promise.resolve(updListCartList);
    })
    .then((updListCartList) => {
      listActions.writeFile(`data/${listCart}`, updListCartList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.post('/order', (req, res) => {
  const payload = req.body;

  listActions.writeFile('data/order.json', payload)
});

app.put('/cart/count', (req, res) => { 
  const {idItem, countOfItem} = req.body;

  listActions.readFile(`data/${listCart}`)
    .then(cartList => {
      const parsedCartList = JSON.parse(cartList);
      return Promise.resolve(parsedCartList);
    })
    .then(parsedCartList => {
      const itemCartById = parsedCartList.findIndex((item) => {
        return item.id === idItem
      })
      parsedCartList[itemCartById].count = countOfItem
      listActions.writeFile(`data/${listCart}`, parsedCartList)
      res.send(true)
    })
    .catch(() => {
      res.send(false)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})