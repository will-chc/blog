import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Editor from '../pages/Editor';
import DocList from '../pages/DocList';
import TextFold from '../pages/TextFold';
const RouterPage: React.FC = () => {
    return (
            <Switch>
                <Route path='/create' component={Editor} />
                <Route path='/doc' component={DocList} />
                <Route path='/fujia' component={TextFold    } />
                <Redirect to="/" />
            </Switch>
    );
};
export default RouterPage;
