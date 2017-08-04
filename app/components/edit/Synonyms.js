import React,{Component} from 'react'
import $ from "jquery"

import Title from './CommonTitle';
import Info from '../../containers/edit/Info';
import Footer from '../../containers/edit/Footer';

import { Steps} from "antd";
const Step = Steps.Step;

import Modal from '../../containers/Modal';
import {submitProcess} from "./submitProcess";

export default class Synonyms extends Component {

    constructor() {
        super();
        this.state = {
            submitState:[
                {title:'保存',description:'',status:'wait'},
                {title:'提议',description:'',status:'wait'},
                {title:'批准',description:'',status:'wait'},
                {title:'发布至当前版本',description:'',status:'wait'},
            ],
            deleteIdx:''
        }

    }

    render(){
        let self=this;
        let {title,modalSource,modalHasCancel,pageData}=this.props;


        return(
            <div>
                <Title
                    type="synonyms"
                    title={title}
                    clickActionBtn={self.clickTitleBtn.bind(self)}
                />

                <Info title='同义词'/>

                <div id="editSynonyms">
                    <div className="cont-wrap">
                        <ul className="cont-list">
                            {
                                pageData.map(function(val,idx){
                                    return(
                                        <li className="clearfix" key={idx}>
                                            <div className="list-text fll">
                                                {val.name}
                                            </div>
                                            <div className="flr edit-wrap">
                                                <span className="edit cursor-p" onClick={()=>self.edit(val,idx)}>编辑</span>
                                                <span className="delete cursor-p" onClick={()=>self.delete(idx)}>删除</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <Footer />
                    </div>

                </div>

                <Modal
                    title={'提示'}
                    source={modalSource}
                    hasCancel={modalHasCancel}
                    bodyCont={self.modalContFunc.bind(self)}
                    handleOk={self.modalHandleOk.bind(self)}
                />

            </div>

        )
    }

    modalContFunc(){
        let self=this;
        let {modalSource}=this.props;

        if(modalSource=="editSynonymsAdd" || modalSource=="editSynonymsEdit"){
            return self.editModalCont();
        } else if(modalSource=='editSynonymsDelete'){
            return '是否确认删除？'
        }else{
            return self.submitProgress()
        }
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

    modalHandleOk(){
        let self=this;
        let {modalSource,modal,editSynonymsAdd,newValue,editIndex,editSynonymsEdit,mainType,id,asideNavCurrent,editSynonymsDelete}=this.props;

        if(modalSource=='editSynonymsAdd'){
            if(newValue=='')return;
            editSynonymsAdd(newValue)

        }else if(modalSource=='editSynonymsEdit'){

            editSynonymsEdit(newValue,editIndex)

        }else if(modalSource=='editSynonymsDelete'){
            let idx=this.state.deleteIdx;
            editSynonymsDelete(idx);

        }else{

            modal(false,'');
            this.context.router.push(`/content/${asideNavCurrent}/${mainType}/synonyms?id=${id}`)

        }
    }

    editModalCont(){
        let self=this;
        let {modalInputValue,newValue,editIndex}=this.props;

        return (
            <input type="text"
                   className="ant-input"
                   value={newValue}
                   placeholder="请输入新的同义词"
                   onChange={(e)=>modalInputValue(e.target.value,editIndex)}
            />
        )
    }

    clickTitleBtn(type){
        let self=this;
        let {modal}=this.props;

        if(type=="add"){    //添加
            self.add();
        }else{
            self.commit(type);
        }
    }

    add(){
        let {modal,modalInputValue}=this.props;
        modalInputValue();
        modal(true,'editSynonymsAdd')
    }

    edit(val,idx){
        let {modal,modalInputValue}=this.props;

        modalInputValue(val.name,idx);
        modal(true,'editSynonymsEdit');
    }

    delete(idx){    //删除
        let self=this;
        let {modal}=this.props;

        this.setState({
            deleteIdx:idx
        })

        modal(true,'editSynonymsDelete');

    }

    commit(type){   //保存草稿
        let self = this;
        let data = this.handlePostData();
        let {asideNavCurrent,pageData,editFooter,modal}=self.props;

        if(pageData.length==0){
            alert('请编辑后再保存')
            return;
        }

        let setSubmitState=this.setSubmitState.bind(this);
        let scope=asideNavCurrent+'.synonym';

        self.props.fetchData({
            url: `/_/dataplatform/document/repository/${scope}/commit`,
            method: 'post',
            data: data,
            success: function (data) {

                let params = {data, type, modal, editFooter, scope, setSubmitState};
                submitProcess.commitCallback(params);


            },
            error:function () {
                let arr=[
                    {title:'保存',description:'保存失败',status:'error'},
                    {title:'提议',description:'',status:'wait'},
                    {title:'批准',description:'',status:'wait'},
                    {title:'发布至当前版本',description:'',status:'wait'},
                ];
                setSubmitState(arr)
            }
        })
    }

    handlePostData(){
        let self=this;
        let {pageData, editFooter,id}=self.props;

        let content={
            items:pageData
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

    setSubmitState(arr) {
        this.setState({
            submitState: arr
        })
    }

    componentDidMount(){
        this.fetchData();

        this.setContMinHeight();
        this.winResize()

    }

    fetchData(){
        let self=this;
        let {fetchData,asideNavCurrent,vid,id,handleData,title}=this.props;
        let scope=asideNavCurrent+'.synonym';

        fetchData({
            url:`/_/dataplatform/document/repository/${scope}/version/${vid}`,
            method:'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            success:function (data) {
                handleData(data)
            },
            error:function(XMLHttpRequest){

                handleData({},{isError:true});

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

        self.props.fetchData({   //请求文档的详细数据
            url:`/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}/get`,
            method: 'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            success: function (data) {
                handleGetName(data)
            }
        });
    }

    setContMinHeight(){
        let winH=$(window).height();
        let headerH=$('#editHeader').height();
        let titleH=$("#editTitle").height();
        let infoH=$(".edit-info").height();
        let footerH=$('#editFooter').height();

        let minH=winH-headerH-titleH-infoH-footerH-40;

        $('#editSynonyms .cont-list').css('minHeight',minH>0?minH:"");
    }

    winResize(){
        let self=this;
        $(window).on('resize',function(){
            self.setContMinHeight()
        })
    }

}

Synonyms.contextTypes={
    router:React.PropTypes.object
}