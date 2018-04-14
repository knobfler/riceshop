const Router = require('koa-router');
const memberCtrl = require('./member.ctrl.js');

const members = new Router();

members.post('/', memberCtrl.signup);
members.post('/login/check', memberCtrl.memberLoginCheck);
members.post('/login', memberCtrl.memberLogin);
members.post('/checkid', memberCtrl.checkId);
members.post('/logout', memberCtrl.memberLogout);
members.post('/info', memberCtrl.getMemberInfo);

module.exports = members;
