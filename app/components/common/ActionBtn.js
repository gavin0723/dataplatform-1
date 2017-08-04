import React, {Component} from 'react';

export default class ActionBtn extends Component {

    render() {
        let self=this;
        return (
            <div className={this.props.className} style={this.props.styles} onClick={()=>self.clickEle()}>
                <span className={'icon '+this.props.icon}></span>
                <span className='name'>{this.props.name}</span>
            </div>
        )
    }

    clickEle(){
        this.props.onClick()
    }
}
