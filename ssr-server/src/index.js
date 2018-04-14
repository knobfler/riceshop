require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const { jwtMiddleware } = require('lib/token');


const ssr = require('./ssr');

const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');


const staticPath = path.join(__dirname, '../../shop-frontend/build');
const uploadPath = path.join(__dirname, './uploads');

const api = require('./api');

const mongoose = require('mongoose');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log('connected to mongodb');
}).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(jwtMiddleware);


router.use('/api', api.routes());
router.get('/', ssr);


const sessionConfig = {
    maxAge: 1000 * 60 * 60 * 24
};

app.use(session(sessionConfig, app));
app.keys= [signKey];

app.use(router.routes()).use(router.allowedMethods());
app.use(mount('/images', serve(uploadPath)));
app.use(serve(staticPath));
app.use(ssr);


app.listen(port, () => {
    console.log("app is listening port", port);
});