import React, {Component} from 'react';
import $ from 'jquery';
import ActionBtn from '../common/ActionBtn';


export default class MainTitle extends Component {


    render() {
        let self = this;
        return (
            <div className='main-title'>
                <div className='ellipsis title' style={{maxWidth:'300px'}}>
                    {this.props.title}
                </div>
                <div className='action-btn-wrap'>
                    {
                        this.props.editCont.map(function (val, idx) {
                            return <ActionBtn
                                key={idx}
                                name={val.name}
                                icon={val.icon}
                                styles={{borderLeft: '1px solid #eee'}}
                                className='action-btn'
                                onClick={()=>self.props.clickActionBtn(val.type)}
                            />

                        })
                    }

                </div>

                {this.renderPullDown()}


            </div>
        )
    }

    renderPullDown() {
        let self=this;
        if (this.props.editPullDown) {
            return (
                <div className='pull-down' style={{height: this.props.pullDownToggle == true ? '138px' : '0'}}>
                    {
                        this.props.editPullDown.map(function (val, idx) {
                            return <ActionBtn
                                key={idx}
                                name={val.name}
                                icon={val.icon}
                                styles={{
                                    borderBottom: '1px solid #eee',
                                    color: val.type == 'delete' ? '#D77170' : '#3D83B8'
                                }}
                                className='action-btn'
                                onClick={()=>self.props.clickPullDown(val.type)}
                            />
                        })
                    }
                </div>
            )
        }
    }



    componentDidMount() {
        let self = this;
        this.setTitleW();
        $(window).resize(
            ()=>self.setTitleW()
        )
    }

    setTitleW() {
        let titleW = $('.main-title').width() - 300;
        $('.main-title .title').css('maxWidth', titleW)
    }


}

MainTitle.contextTypes={
    router:React.PropTypes.object
}
