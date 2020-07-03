import React from "react";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import loadable from '@loadable/component'

const ProfileLoadableComponent = loadable(() => import('./Profile.js'), {
    fallback: <Loading />
});

function Loading () {
    return (
        <div>Loading...</div>
    );
}

function MyApp () {
    const currentUser = store.getState().userState.userData.user;
    const condition = currentUser !== null && currentUser !== '';
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route 
                            path="/" 
                            exact 
                            render={() => (
                                condition ? <Home /> : <Redirect to='/login' /> 
                            )} 
                        />
                        <Route 
                            path="/login" 
                            render={() => (
                                <Login /> 
                            )} 
                        />
                        <Route 
                            path="/profile" 
                            render={() => (
                                <ProfileLoadableComponent /> 
                            )} 
                        />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default MyApp;