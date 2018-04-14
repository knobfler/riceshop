const Router = require('koa-router');
const cartCtrl = require('./cart.ctrl');


const carts = new Router();

carts.post('/', cartCtrl.addCart);
carts.get('/', cartCtrl.getCartList);

module.exports = carts;