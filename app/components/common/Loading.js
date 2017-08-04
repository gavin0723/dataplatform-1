import React, {Component} from 'react';

export default class Loading extends Component {

    render() {
        const {isShow} =this.props;
        return (
            <div id='global-loading' style={{display: isShow ? 'block' : 'none'}}>
                <div className='loading-cont'>
                    <img src={require('../../images/loading.svg')}/>
                    <p>数据加载中...</p>
                </div>

            </div>
        )

    }
}

