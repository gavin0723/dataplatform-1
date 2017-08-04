import React, {Component} from 'react';

import {Modal,Button} from 'antd'

export default class CommonModal extends Component {

    render() {


        let self=this;
        let {visible,title,bodyCont,handleFunc,hasCancel} =this.props;


        let footer=[
            <Button key="back" size="large" onClick={()=>handleFunc('cancel')}>取消</Button>,
            <Button key="save" type="primary" size="large" onClick={()=>handleFunc('ok')}>确认</Button>
        ];
        if(!hasCancel){
            footer.shift()
        }
        return (
            <div>
                <Modal title={title}
                       visible={visible}
                       onCancel={()=>handleFunc('cancel')}
                       footer={footer}
                >
                    {bodyCont()}
                </Modal>
            </div>

        )
    }


}
