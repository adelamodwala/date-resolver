import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'typeface-roboto';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../../store/configureStore';

import Home from './Home';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const AppRouter = ({match}) => (
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <div className="App">
                        <AppRouter/>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
