const Router = require('koa-router');
const authCtrl = require('./auth.ctrl.js');

const auths = new Router();

auths.post('/login/admin', authCtrl.adminLogin);
auths.post('/logout/admin', authCtrl.adminLogout);
auths.get('/check/admin', authCtrl.checkAdminLogin);



module.exports = auths;
