import React, { Component } from 'react'
import Loading from '../containers/Loading'
import '../styles/index.css'

class App extends Component {

    render() {
        return (
            <div className="container">
                <Loading />
                {this.props.children}

            </div>
        )
    }





}

export default App;


