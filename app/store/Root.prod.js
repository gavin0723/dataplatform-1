import React, { Component } from 'react'
import { Router,hashHistory} from 'react-router';
import routes from '../routes'

class RootProd extends Component {

    render() {
        return (
            <div>
                <Router routes={routes} history={hashHistory} />
            </div>
        )
    }
}

export default RootProd;






