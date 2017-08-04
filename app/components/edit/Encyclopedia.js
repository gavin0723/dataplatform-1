import React,{Component} from 'react'

import Title from './CommonTitle';
import Info from '../../containers/edit/Info';
import Footer from '../../containers/edit/Footer';

import TabModal from './EncyclopediaModal'
import Modal from "../../containers/Modal";
import {submitProcess} from "./submitProcess";

import { Steps} from "antd";
const Step = Steps.Step;

export default class Encyclopedia extends Component {

    constructor(){
        super();
        this.state = {
            modalVisible: false,
            submitState:[
                {title:'保存',description:'',status:'wait'},
                {title:'提议',description:'',status:'wait'},
                {title:'批准',description:'',status:'wait'},
                {title:'发布至当前版本',description:'',status:'wait'},
            ]
        }

    }

    render(){
        let self=this;
        let {title,pageData,inputChange,modalSource}=this.props;

        return(
            <div>
                <Title
                    title={title}
                    type="encyclopedia"
                    clickActionBtn={self.clickTitleBtn.bind(self)}
                />

                <Info title='百科'
                      version='as'
                      author='as'
                />

                <div id="editEncyclopedia">
                    <div className="cont-wrap">

                        <TabModal visible={this.state.modalVisible}
                               showModal={()=>this.showModal()}
                               handleOk={()=>this.handleOk()}
                               handleCancel={()=>this.handleCancel()}
                        />


                        {
                            pageData.map(function (val,idx) {

                                return <Group
                                    key={idx}
                                    title={val.title}
                                    onClickBtn={()=>self.showModal()}
                                    rows={val.row}
                                    onChange={(e)=>inputChange(val.title,e.target.value)}
                                    value={val.text}
                                />
                            })

                        }

                        <Footer />
                    </div>

                </div>

                <Modal
                    title={'提示'}
                    source={modalSource}
                    hasCancel={false}
                    bodyCont={self.modalContFunc.bind(self)}
                    handleOk={self.modalHandleOk.bind(self)}
                />

            </div>

        )
    }


    modalContFunc() {

        let {modalSource}=this.props;
        return this.submitProgress();

    }

    submitProgress() {
        return (
            <Steps>
                {
                    this.state.submitState.map(function (val,idx) {
                        return <Step key={idx} title={val.title} description={val.description} status={val.status}/>
                    })
                }
            </Steps>
        )
    }

    modalHandleOk() {
        let { modal,asideNavCurrent,mainType,id}=this.props;

        modal(false, "");
        this.context.router.push(`/content/${asideNavCurrent}/${mainType}/wiki?id=${id}`)

    }

    showModal() {
        this.setState({
            modalVisible: true
        });
    }
    handleOk () {
        alert('ok')
        this.setState({
            modalVisible: false
        });
    }
    handleCancel ()  {
        this.setState({
            modalVisible: false
        });
    }


    handlePostData(){
        let self=this;
        let {pageData, editFooter,id}=self.props;

        let content={
            chapters:pageData
        };

        let _cont=JSON.stringify(content);

        let data = {
            "id": id || "",
            "content": {
                "type": "json",
                "content": _cont
            },
            "commit": editFooter.commitValue || '',
        };

        return data;

    }

    clickTitleBtn(type) {
        let self = this;
        let data = this.handlePostData();
        let {asideNavCurrent,modal, editFooter}=self.props;

        let scope=asideNavCurrent+'.'+'wiki',
            setSubmitState=this.setSubmitState.bind(this);

        self.props.fetchData({
            url: `/_/dataplatform/document/repository/${scope}/commit`,
            method: 'post',
            data: data,
            success: function (data) {

                let params = {data, type, modal, editFooter, scope, setSubmitState};
                submitProcess.commitCallback(params);

            },
            error:function () {
                self.setState({
                    submitState:[
                        {title:'保存',description:'保存失败',status:'error'},
                        {title:'提议',description:'',status:'wait'},
                        {title:'批准',description:'',status:'wait'},
                        {title:'发布至当前版本',description:'',status:'wait'},
                    ]
                });
            }
        })
    }

    setSubmitState(arr) {
        this.setState({
            submitState: arr
        })
    }

    componentWillMount(){
        this.props.editEncyInit();
    }
    componentDidMount() {
        this.fetchData();
        this.props.editFooterInit();
    }

    fetchData(){
        let self=this;
        let {fetchData,asideNavCurrent,vid,id,handleData,title}=this.props;

        let scope=asideNavCurrent+'.wiki';

        fetchData({
            url:`/_/dataplatform/document/repository/${scope}/version/${vid}`,
            method:'post',
            success:function (data) {
                handleData(data)
            },
            error:function () {

                handleData({},{isError:true})

                if(!title){
                    self.fetchGetName(id)
                }

            },
            noPromptError:true
        })
    }

    fetchGetName(id){
        let self=this,
            {asideNavCurrent,handleGetName}=self.props;

        self.props.fetchData({
            url:`/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}/get`,
            method: 'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            success: function (data) {
                handleGetName(data)
            }
        });
    }


}

Encyclopedia.contextTypes={
    router:React.PropTypes.object
}

class Group extends Component{
    render(){
        return(
            <div className="grounp">
                <h4>
                    <span className="title">{this.props.title}</span>
                    {/*<span className="btn cursor-p" onClick={this.props.onClickBtn}>抓取</span>*/}
                </h4>
                <textarea className="ant-input" rows={this.props.rows} value={this.props.value} onChange={this.props.onChange}></textarea>
            </div>
        )
    }
}
