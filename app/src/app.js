import React from 'react';
import {StatusBar, AsyncStorage} from 'react-native';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {autoRehydrate, persistStore} from 'redux-persist';

import reducers from './reducers';
import {getStateKeysExcept} from './reducers';

import RemoteControl from './components/remote-control';

export default
class App extends React.Component {

    componentWillMount() {
        this.state = {
            rehydrated: false,
        };
        console.ignoredYellowBox = ['Setting a timer'];
        StatusBar.setHidden(true);
        this.prepareStore();
    }

    render() {
        // If the store has been rehydrated.
        if (this.state.rehydrated) {
            return (
                <Provider store={this.store}>
                    <RemoteControl/>
                </Provider>
            );
        }
        // Store is rehydrating; should take about an instant.
        else return null;
    }

    prepareStore() {
        const initialState = {};
        const enhancer = compose(applyMiddleware(ReduxThunk), autoRehydrate());
        this.store = createStore(reducers, initialState, enhancer);
        const store = persistStore(this.store, {storage: AsyncStorage}, () => {
            this.setState({
                rehydrated: true,
            });
        });
        store.purge();
    }
}