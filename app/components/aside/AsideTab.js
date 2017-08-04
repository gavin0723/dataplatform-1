import React, {Component} from 'react';
// import {Link} from 'react-router';

export default class AsideTab extends Component {
    render() {
        return (

            <li className={this.props.className} onClick={this.props.onClick}>

                <div></div>
                <span>{this.props.name}</span>

            </li>
        )
    }


}
