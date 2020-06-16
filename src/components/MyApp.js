import React from "react";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Profile from "./Profile";

function MyApp () {
    const currentUser = store.getState().log.user;
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
                                <Profile /> 
                            )} 
                        />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default MyApp;