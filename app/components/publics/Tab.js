import React, {Component} from 'react';

import "../../styles/public/tab.css"

export default class MainTab extends Component {

    render() {

        let self = this,
            {current}=this.props;

        return (
            <ul id='public-tab' className="clearfix">
                {
                    self.props.tabCont.map(function (val, idx) {

                        return (
                            <li key={idx}
                                onClick={()=>self.clickTab(val.current)}
                                className={current == val.current ? 'fll active' : 'fll'}>
                                <span>{val.name}</span>
                                <span>{val.num ? '(' + val.num + ')' : ''}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    clickTab(current){
        this.props.clickTab(current)
    }



}
