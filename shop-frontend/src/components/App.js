import React from 'react';
import {Switch, Route} from 'react-router-dom';
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
import Base from 'containers/common/Base';
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/alert" component={AlertPage}/>
                <Route exact path="/alert/:page" component={AlertPage}/>
                <Route path="/alert/detail/:id" component={DetailPage}/>
                <Route path="/editor" component={EditorPage}/>
                <Route path="/upload" component={ItemEditorPage}/>
                <Route path="/list" component={ListPage}/>
                <Route path="/item/:id" component={ItemDetailPage}/>
                <Route path="/payment" component={PaymentPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signup" component={SignupPage}/>
                <Route path="/cart" component={CartPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
            <Base/>
        </div>
    );
};

export default App;