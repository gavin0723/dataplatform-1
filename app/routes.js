import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import App from './containers/App';
import Content from './components/MainCont'

import Main from './containers/Main';
import Introduces from './containers/Introduces';
import Detail from './containers/Detail';

import Edit from './containers/Edit'

import Admin from './containers/Admin'
import StucturedEdit from './containers/structured/Edit'


module.exports = (
    <Route path='/' component={App}>
        <IndexRedirect to='/content/introduces'/>
        <Route path='/content' component={Content}>

            <IndexRedirect to='/content/introduces'/>

            <Route path='/content/introduces' component={Introduces}></Route>

            <Route path="/content/admin">
                <IndexRedirect to='/content/admin/disease/normal/audit' />
                <Route path='/content/admin/:total/:type/:tab' component={Admin} />
            </Route>

            <Route path='/content/:asideItem'>
                <IndexRedirect to='/content/:asideItem/all' />
                <Route path='/content/:asideItem/:tabType' component={Main} />
                <Route path='/content/:asideItem/:mainType/:tabType' component={Detail} />
            </Route>

        </Route>

        <Route path="/edit/:asideItem">
            {/*<Route path="/edit/conll/:editType" component={StucturedEdit}></Route>*/}
            <Route path="/edit/:asideItem/:editType" component={Edit}></Route>
        </Route>



    </Route>
)
