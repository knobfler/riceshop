const Router = require('koa-router');
const itemCtrl = require('./item.ctrl.js');
const koaBody = require('koa-body')({multipart: true});

const items = new Router();

items.get('/', itemCtrl.getItemList);
items.post('/', itemCtrl.writeItem);
items.post('/image', koaBody, itemCtrl.uploadImage);
items.get('/:id', itemCtrl.getItemById);



module.exports = items;
