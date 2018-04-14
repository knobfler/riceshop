const Router = require('koa-router');
const postCtrl = require('./post.ctrl.js');

const posts = new Router();

posts.get('/alert', postCtrl.getAlertList);
posts.post('/alert', postCtrl.writeAlert);
posts.get('/alert/:id', postCtrl.checkObjectId, postCtrl.getAlertById);
posts.delete('/alert/:id', postCtrl.checkObjectId, postCtrl.removeAlert);
posts.patch('/alert/:id', postCtrl.checkObjectId, postCtrl.updateAlert);


module.exports = posts;
