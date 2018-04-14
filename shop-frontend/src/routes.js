import {
    HomePage,
    AlertPage,
    EditorPage,
    NotFoundPage,
    ListPage,
    DetailPage,
    PaymentPage,
    ItemEditorPage,
    ItemDetailPage,
    LoginPage,
    SignupPage,
    CartPage
} from 'pages';

export default[
    {
        path : '/',
        exact : true,
        component : HomePage
    }, {
        path : '/alert',
        exact : true,
        component : AlertPage
    }, {
        path : '/alert/:page',
        exact : true,
        component : AlertPage
    }, {
        path : '/alert/detail/:id',
        component : DetailPage
    }, {
        path : '/editor',
        component : EditorPage
    }, {
        path : '/upload',
        component : ItemEditorPage
    }, {
        path : '/list',
        component : ListPage
    }, {
        path : '/item/:id',
        component : ItemDetailPage
    }, {
        path : '/payment',
        component : PaymentPage
    }, {
        path : '/login',
        component : LoginPage
    }, {
        path : '/signup',
        component : SignupPage
    }, {
        path : '/cart',
        component : CartPage
    }
];