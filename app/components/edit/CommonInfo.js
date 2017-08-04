import React,{Component} from 'react'


export default class CommonHeader extends Component {

    render(){
        return(
            <div className="edit-info">

                <div className="cont-title clearfix">
                    <div className="fll cont-title-txt">

                        {this.props.title}
                    </div>
                    <div className=" edit-version">
                        <p>版本号：{this.props.version}</p>
                        <p>编者：{this.props.author}</p>
                    </div>
                </div>
            </div>

        )
    }

}
