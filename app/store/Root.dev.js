import React, { Component } from 'react'
import { Router,hashHistory} from 'react-router';
import routes from '../routes'
import DevTools from '../containers/DevTools'

class RootDev extends Component {

    render() {
        return (
            <div>
                <Router routes={routes} history={hashHistory} />
                <DevTools />
            </div>
        )
    }
}

export default RootDev;






