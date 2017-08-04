import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore';
import Root from './store/Roots';
import './styles/main.css';
import './styles/detail.css';
import './styles/edit.css';
import 'antd/dist/antd.css';


let store = configureStore();

render((
    <Provider store={store}>
        <Root />
    </Provider>),
    document.getElementById('app')
);
