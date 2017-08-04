import React, {Component} from 'react';
import {Tabs, Button, Modal,Checkbox} from 'antd';
const TabPane = Tabs.TabPane;


export default class EncyclopediaModal extends Component {

    render() {
        return (

            <div>
                <Modal
                     visible={this.props.visible}
                     onOk={()=>this.props.handleOk()}
                     onCancel={()=>this.props.handleCancel()}
                     closable={false}
                     footer={null}
                     className="encylopediaModal"
                     width="800px"
                >
                    <div className=''>
                        <Tabs defaultActiveKey='1'>
                            <TabPane tab='Tab 1' key='1'>
                                <div style={{height:'600px',background:'#eee'}}>
                                    Content of tab 1
                                </div>
                            </TabPane>
                            <TabPane tab='Tab 2' key='2'>
                                <div>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                    <ContGrounp/>
                                </div>
                            </TabPane>
                            <TabPane tab='Tab 3' key='3'>
                                <div>
                                    Content of tab 3
                                </div>
                            </TabPane>
                            <TabPane tab='Tab 4' key='4'>Content of tab 4</TabPane>
                            <TabPane tab='Tab 5' key='5'>Content of tab 5</TabPane>
                            <TabPane tab='Tab 6' key='6'>Content of tab 6</TabPane>
                            <TabPane tab='Tab 7' key='7'>Content of tab 7</TabPane>
                            <TabPane tab='Tab 8' key='8'>Content of tab 8</TabPane>
                            <TabPane tab='Tab 9' key='9'>Content of tab 9</TabPane>
                        </Tabs>
                        <div className="footer">
                            <span className="cancel cursor-p" onClick={()=>this.props.handleCancel()}>取消</span>
                            <span className="sure cursor-p" onClick={()=>this.props.handleOk()}>抓取</span>

                        </div>
                    </div>
                </Modal>
            </div>


        )
    }
}

class ContGrounp extends Component{
    render (){
        return(
            <div className="contGrounp clearfix">
                <Checkbox onChange={this.props.onChange} > 病因 </Checkbox>
                <div className="content">
                    由于感染或非感染因素引起的气管、支气管黏膜炎性变化黏液分泌增多，因缺乏负离子而使气管黏膜上皮绒毛内呼吸酶的活性降低，影响肺泡的分泌功能及肺的通气和换气功能。临床上以长期咳嗽、咳痰或伴有喘息为主要特征。本病早期症状较轻，多在冬季发作，春暖后缓解，且病程缓慢，故不为人们注意。晚期病变进展，并发阻塞性肺气肿时，肺功能遭受损害，影响健康及劳动力极大。本病为我国常见多发病之一，发病年龄多在40岁以上，吸烟患者明显高于不吸烟患者，在我国患病率北方高于南方，农村较城市发病率稍高。
                </div>
            </div>
        )
    }
}
