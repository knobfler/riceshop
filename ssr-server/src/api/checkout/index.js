const Router = require('koa-router');
const checkoutCtrl = require('./checkout.ctrl');


const checkouts = new Router();

checkouts.post('/complete', checkoutCtrl.checkoutComplete);

module.exports = checkouts;