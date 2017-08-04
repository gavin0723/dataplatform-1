import React,{Component} from 'react'
import ActionBtn from '../common/ActionBtn'

export default class CommonHeader extends Component {

    render(){
        let self=this;

        let {title,type,clickActionBtn}=this.props;

        let _data="";

        if(type=='normal'){
            _data=[
                {name:'保存',icon:'icon-save',type:'save'},
                {name:'保存并提交',icon:'icon-trial',type:'propose'}
            ]
        }else if (type=="synonyms"){
            _data=[
                {name:'添加',icon:'icon-add',type:'add'},
                {name:'保存',icon:'icon-save',type:'save'},
                {name:'保存并提交',icon:'icon-trial',type:'propose'}
            ]
        }else if (type=="encyclopedia"){
            _data=[
                {name:'保存',icon:'icon-save',type:'save'},
                {name:'保存并提交',icon:'icon-trial',type:'propose'}
            ]
        }

        return(
            <div id="editTitle" className="clearfix">
                <div className="wrap">
                    <div className="title fll ellipsis">
                        {title}
                    </div>
                    <div className="flr">

                        {
                            _data.map(function (val,idx) {
                                return <ActionBtn
                                    key={idx}
                                    name={val.name}
                                    icon={val.icon}
                                    styles={{
                                        borderLeft:'1px solid #eee',
                                        color: val.type != 'propose' ? '#3D83B8' : '#fff',
                                        background: val.type != 'propose' ? '#fff' : '#3D83B8'
                                    }}
                                    className='action-btn'
                                    onClick={()=>clickActionBtn(val.type)}
                                />
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

}
