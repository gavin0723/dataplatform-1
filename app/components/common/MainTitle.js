import React, {Component} from 'react';
import $ from 'jquery';
import ActionBtn from './ActionBtn';

import '../../styles/mainTitle.css'

export default class MainTitle extends Component {


    constructor(){
        super();
        this.state={
            mainW:0
        }
    }

    render() {
        let self = this;

        return (
            <div className='main-title'>
                <div className="clearfix title-cont">
                    <div className='ellipsis title fll'>
                        {this.props.title}
                    </div>

                    {
                        this.props.source=='detail' && this.props.publishState ?(<div className="fll">
                            {self.tag()}
                        </div>):''
                    }

                </div>
                <div className='action-btn-wrap'>
                    {
                        this.props.editCont && this.props.editCont.map(function (val, idx) {
                            return <ActionBtn
                                key={idx}
                                name={val.name}
                                icon={val.icon}
                                styles={{borderLeft: '1px solid #eee'}}
                                className='action-btn action-btn-h'
                                onClick={()=>self.props.clickActionBtn(val.type)}
                            />

                        })
                    }

                </div>

                <div className="pull-down">
                    {this.renderPullDown()}
                </div>



            </div>
        )
    }

    tag(){

        return (
            <div className="tag fll" style={{color:'#41B8B0',border:'1px solid #41B8B0'}}>
                <span className="icon-approval"></span>
                <span>已发布</span>
            </div>
        )
    }

    renderPullDown() {
        let self=this;
        let {allowPublish,pullDownToggle,editPullDown,publishState}=self.props;

        if (this.props.editPullDown) {
            return (
                <div>
                    <div className='' style={{height: pullDownToggle == true ? 'auto' : '0',position:'relative',zIndex:'100'}}>
                        {
                            editPullDown.map(function (val, idx) {

                                let class_name='action-btn ';
                                let _style={
                                    color:'#999',
                                    display:'none',
                                    borderBottom: '1px solid #eee',
                                };

                                if(val.type=='delete'){   //删除
                                    _style.color='#D77170';
                                    _style.display='block';
                                    class_name+=' action-btn-h';
                                }else if(val.type=="release" && (!allowPublish)){  //发布
                                    _style.color="#3D83B8";
                                    _style.display='block';
                                    class_name+=' action-btn-h';
                                }else if(val.type=='unpublish' && publishState){   //取消发布
                                    _style.color="#3D83B8";
                                    _style.display='block';
                                    class_name+=' action-btn-h';
                                }

                                return <ActionBtn
                                    key={idx}
                                    name={val.name}
                                    icon={val.icon}
                                    styles={_style}
                                    className={class_name}
                                    onClick={()=>self.props.clickPullDown(val.type)}
                                />
                            })
                        }
                    </div>
                    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:'99',display:pullDownToggle == true?'block':'none'}} onClick={()=>this.props.clickMark()}></div>
                </div>

            )
        }
    }



    componentDidMount() {
        let self = this;
        this.winResize();

    }

    winResize(){
        $(window).resize(function(){
            let mainT=$('.main-title').width();
            $('.main-title .title').css('maxWidth',mainT-400-150)
        })

    }



}

MainTitle.contextTypes={
    router:React.PropTypes.object
}
