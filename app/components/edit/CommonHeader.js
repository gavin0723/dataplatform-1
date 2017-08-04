import React,{Component} from 'react'


export default class CommonHeader extends Component {

    render(){
        return(
            <div id="editHeader" className="clearfix">
                <div className="logo fll">
                    Rxthinking
                </div>
                <div className="user-info flr">
                    <span className="fll">{this.props.username}</span>
                    {/*<img src={require('../../images/user_img.jpg')} alt="" className="circle fll"/>*/}

                </div>
            </div>
        )
    }

}
