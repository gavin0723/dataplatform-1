import React,{Component} from 'react'
import { Checkbox } from 'antd';


export default class CommonHeader extends Component {

    render(){

        let {value,approve,setCurrent,setCurrentDisabled,approveDisabled,textChange}=this.props
        return(
            <div id="editFooter" className="noselect">
                <Checkbox onChange={(e)=>approve(e.target.checked)} className='approve' disabled={approveDisabled}> 批准 </Checkbox>
                <Checkbox onChange={(e)=>setCurrent(e.target.checked)} className='set-current' disabled={setCurrentDisabled}> 设为当前版本 </Checkbox>
                <div>
                    <textarea className='textarea ant-input'
                              placeholder="请认真填写备注信息，方便大家共同管理..."
                              value={value}
                              onChange={(e)=>textChange(e.target.checked)}
                    >
                    </textarea>
                </div>
            </div>
        )
    }

}
