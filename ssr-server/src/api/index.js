const Router = require('koa-router');

const api = new Router();

const member = require('./member');
const post = require('./post');
const item = require('./item');
const auth = require('./auth');
const cart = require('./cart');
const checkout = require('./checkout');

api.use('/member', member.routes());
api.use('/post', post.routes());
api.use('/item', item.routes())
api.use('/auth', auth.routes());
api.use('/cart', cart.routes());
api.use('/checkout', checkout.routes());

module.exports = api;