import React, { Component } from 'react'

import Aside from '../containers/AsideNav'

class MainCont extends Component {

    render() {

        return (
            <div className="container">
                <Aside />

                {/*<VersionControl />*/}

                {this.props.children}

            </div>
        )
    }

}

export default MainCont;


