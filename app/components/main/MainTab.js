import React, {Component} from 'react';

export default class MainTab extends Component {

    render() {
        let self = this;

        return (
            <ul className='main-tab clearfix'>
                {
                    self.props.tabCont.map(function (val, idx) {

                        return (
                            <li key={idx} onClick={()=>self.props.clickTab(val.current)}
                                className={self.props.current == val.current ? 'fll active' : 'fll'}>
                                <span>{val.name}</span>
                                <span>{val.num ? '(' + val.num + ')' : ''}</span>

                            </li>
                        )
                    })
                }
            </ul>
        )
    }


}
