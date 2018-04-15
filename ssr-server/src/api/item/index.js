const Router = require('koa-router');
const itemCtrl = require('./item.ctrl.js');
const koaBody = require('koa-body')({multipart: true});

const items = new Router();

items.get('/', itemCtrl.getItemList);
items.post('/', itemCtrl.checkLogin, itemCtrl.writeItem);
items.post('/image', itemCtrl.checkLogin, koaBody, itemCtrl.uploadImage);
items.get('/:id', itemCtrl.checkObjectId, itemCtrl.getItemById);

items.delete('/:id', itemCtrl.checkLogin, itemCtrl.removeItemById);
// items.patch('/:id')


module.exports = items;
