import React,{Component} from 'react'

import Header from '../edit/CommonHeader'
import Title from '../edit/CommonTitle';
import Info from '../../containers/edit/Info';
import Footer from '../../containers/edit/Footer';
import EditCont from '../../containers/structured/EditCont'

// import TabModal from './EncyclopediaModal'
import Modal from "../../containers/Modal";
import {submitProcess} from "../edit/submitProcess";

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
                {title:'发布至当前版本',description:'',status:'wait'}
            ]
        }

    }

    render(){
        let self=this;
        let {title,modalSource}=this.props;

        return(
            <div id="structuredEdit">
                <Title
                    title={title}
                    type="encyclopedia"
                    clickActionBtn={self.clickTitleBtn.bind(self)}
                />

                <Info title='结构化'
                      version=''
                      author=''
                />

                <div id="structuredEditCont">
                    <div className="cont-wrap">

                        <EditCont/>

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

        // let {modalSource}=this.props;
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
        // this.context.router.push(`/content/${asideNavCurrent}/${mainType}/wiki?id=${id}`)

    }

    showModal() {
        this.setState({
            modalVisible: true
        });
    }
    handleOk () {
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
        let {cutResult,editInpVal, editFooter,id}=self.props;

        let content={
            OriginText:editInpVal,
            LabeledText:cutResult
        };

        let _cont=JSON.stringify(content);

        let data = {
            "id": id || "",
            "content":{
                "type":"json",
                "content":_cont
            },

            "commit": editFooter.commitValue || ''
        };

        return data;

    }

    clickTitleBtn(type) {
        let self = this;
        let data = this.handlePostData();
        let {asideNavCurrent,modal, editFooter}=self.props;

        let scope=asideNavCurrent,
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
        // this.fetchData();
        this.props.editFooterInit();
    }

    // fetchData(){
    //     let self=this;
    //     let {fetchData,vid,id,handleData,title}=this.props;
    //
    //     fetchData({
    //         url:`/_/dataplatform/document/repository/conll/version/${vid}`,
    //         method:'post',
    //         success:function (data) {
    //             // handleData(data)
    //         },
    //         error:function () {
    //
    //             // handleData({},{isError:true})
    //
    //             // if(!title){
    //             //     self.fetchGetName(id)
    //             // }
    //
    //         },
    //         noPromptError:true
    //     })
    // }

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
