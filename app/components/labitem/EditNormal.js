import React, {Component} from "react";
import Title from "../edit/CommonTitle";
import Info from "../../containers/edit/Info";
import Footer from "../../containers/edit/Footer";
import Modal from "../../containers/Modal";
import {Steps, Select, Tabs} from "antd";
import {submitProcess} from "../edit/submitProcess";
import SearchInputCustom from "../common/SearchInput";
import CheckBoxCustom from "../common/CheckBox";
import EditBtnDefined from '../edit/EditBtn'

const Step = Steps.Step;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default class Normal extends Component {

    constructor() {
        super();
        this.state = {
            deleteIcd10Idx: '',
            submitState: [
                {title: '保存', description: '', status: 'wait'},
                {title: '提议', description: '', status: 'wait'},
                {title: '批准', description: '', status: 'wait'},
                {title: '发布至当前版本', description: '', status: 'wait'},
            ],
            gender: [
                {label: '男', value: 'GenderFemale'},
                {label: '女', value: 'GenderMale'}
            ],
            ageRange: [
                {label: '新生儿', value: 'AgeRangeNewborn'},
                {label: '儿童', value: 'AgeRangeChild'},
                {label: '青年', value: 'AgeRangeYoung'},
                {label: '成人', value: 'AgeRangeAdult'},
                {label: '老年', value: 'AgeRangeOlder'}
            ],
            departmentList: [],
        }
    }

    render() {

        let self = this,
            {pageData, title, modalSource, nameChange, friendlyNameChange, shortNameChange, ageRangeChange, genderChange, metadataChange, officeChange, categoriesChange,inpValChange}=this.props,
            {gender, ageRange}=this.state;

        return (
            <div>
                <Title
                    type="normal"
                    title={title}
                    clickActionBtn={self.clickTitleBtn.bind(self)}
                />

                <Info title='标准'

                />

                <div id="editNormal" className="symptomEditNormal">
                    <div className="cont-wrap">

                        {/*基本信息*/}
                        <div className="item">
                            <h4>基本信息</h4>
                            <div className="input-wrap">
                                <span className="input-name">标准名</span>
                                <input className="ant-input"
                                       value={pageData.name}
                                       type="text"
                                       onChange={(e)=> nameChange(e.target.value)}
                                />
                            </div>
                            <div className="input-wrap">
                                <span className="input-name">友好名称</span>
                                <input className="ant-input"
                                       value={pageData.friendlyName}
                                       type="text"
                                       onChange={(e)=> friendlyNameChange(e.target.value)}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">缩写名称</span>
                                <input value={pageData.shortName }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> shortNameChange(e.target.value)}
                                />
                            </div>
                        </div>

                        {/*约束条件*/}
                        <div className="item">
                            <h4>约束条件</h4>
                            <div className="input-wrap clearfix">
                                <span className="input-name fll">性别</span>
                                <div style={{display: 'inline-block'}}>

                                    <CheckBoxCustom
                                        className="fll"
                                        options={gender}
                                        defaultValue={pageData.gender}
                                        onChange={(checked)=> {
                                            genderChange(checked)
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="input-wrap clearfix">
                                <span className="input-name fll">年龄段</span>
                                <div style={{display: 'inline-block'}}>
                                    <CheckBoxCustom
                                        className="fll"
                                        options={ageRange}
                                        defaultValue={pageData.ageRange}
                                        onChange={(checked)=> {
                                            ageRangeChange(checked)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/*元数据*/}


                        <div className="item">
                            <h4>元数据</h4>
                            <div className="input-wrap ">
                                <span className="input-name">排序</span>
                                <input value={pageData.weight }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'weight'})}
                                />
                            </div>
                        </div>

                        {/*分类*/}
                        {/*<div className="item">*/}
                            {/*<h4>分类</h4>*/}
                            {/*{*/}
                                {/*pageData.categories && pageData.categories.map((val, idx)=> {*/}
                                    {/*return (*/}
                                        {/*<div className="input-wrap " key={idx}>*/}
                                            {/*<span className="input-name">{val.name}</span>*/}
                                            {/*<input value={val.value }*/}
                                                   {/*className="ant-input"*/}
                                                   {/*type="text"*/}
                                                   {/*onChange={(e)=> categoriesChange({value: e.target.value, idx: idx})}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*)*/}
                                {/*})*/}
                            {/*}*/}

                        {/*</div>*/}

                        {/*属性*/}
                        <div className="item">
                            <h4>属性</h4>
                            <div className="input-wrap ">
                                <span className="input-name">常见套餐</span>
                                <input value={pageData.labitemSet }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'labitemSet'})}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">样本名称</span>
                                <input value={pageData.labitemSpecimen }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'labitemSpecimen'})}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">正常范围上界</span>
                                <input value={pageData.labitemHigherNormal  }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'labitemHigherNormal'})}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">正常范围下界</span>
                                <input value={pageData.labitemLowerNormal  }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'labitemLowerNormal'})}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">标准单位</span>
                                <input value={pageData.labitemUnit  }
                                       className="ant-input"
                                       type="text"
                                       onChange={(e)=> inpValChange({value: e.target.value, type: 'labitemUnit'})}
                                />
                            </div>
                        </div>

                        <Footer />

                        <Modal
                            title={'提示'}
                            source={modalSource}
                            hasCancel={modalSource == "editDeleteIcd10List" ? true : false}
                            bodyCont={self.modalContFunc.bind(self)}
                            handleOk={self.modalHandleOk.bind(self)}
                        />
                    </div>

                </div>
            </div>


        )
    }



    handlePostData() {
        let self = this;
        let {pageData, editFooter}=self.props,
            {categories}=pageData;


        if(pageData.name==''){

            alert('请输入标准名');
            return false;
        }

        if(pageData.labitemSpecimen==''){
            alert('请输入样本名称');
            return false;
        }


        let content = {
            "name": {
                "friendlyName": pageData.friendlyName,
                "name": pageData.name,
                "shortName": pageData.shortName
            },
            "metadata":{},
            "constraint": {
                "ageRanges": pageData.ageRange,
                "genders": pageData.gender
            },
            // "category": {},
            "value":{
                "unit":pageData.labitemUnit || ''
            },
            "set":pageData.labitemSet || '',
            "specimen":pageData.labitemSpecimen || ''
        };

        // categories && categories.map(val=> {
        //     content.category[val.name]=val.value
        // });

        if(pageData.weight==''){
            content.metadata.weight=0
        }else if(Number(pageData.weight) && Number(pageData.weight)>0){
            content.metadata.weight=Number(pageData.weight)
        }else{
            alert('排序值应为数字');
            return false;
        }

        if(pageData.labitemHigherNormal==''){
            content.value.higherNormal=0
        }else if(Number(pageData.labitemHigherNormal) && Number(pageData.labitemHigherNormal)>0){
            content.value.higherNormal=Number(pageData.labitemHigherNormal)
        }else{
            alert('正常范围上界值应为数字');
            return false;
        }

        if(pageData.labitemLowerNormal==''){
            content.value.lowerNormal=0
        }else if(Number(pageData.labitemLowerNormal) && Number(pageData.labitemLowerNormal)>0){
            content.value.lowerNormal=Number(pageData.labitemLowerNormal)
        }else{
            alert('正常范围下界值应为数字');
            return false;
        }

        let _cont = JSON.stringify(content);

        let data = {
            "content": {
                "type": "json",
                "content": _cont
            },
            "commit": editFooter.commitValue || '',
        };

        if (pageData.type == 'edit') {
            data.id = pageData.id
        }

        return data;
    }



    clickTitleBtn(type) {
        let self = this;
        let data = this.handlePostData();
        if(!data){
            return;
        }

        let {asideNavCurrent, modal, editFooter}=self.props;
        let setSubmitState = this.setSubmitState.bind(this);


        let scope = asideNavCurrent;
        self.props.fetchData({
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/commit`,
            method: 'post',
            data: data,
            success: function (data) {

                let params = {data, type, modal, editFooter, scope, setSubmitState};
                submitProcess.commitCallback(params);

            },
            error: function () {
                let arr = [
                    {title: '保存', description: '保存失败', status: 'error'},
                    {title: '提议', description: '', status: 'wait'},
                    {title: '批准', description: '', status: 'wait'},
                    {title: '发布至当前版本', description: '', status: 'wait'},
                ];
                self.setSubmitState(arr)

            }
        })
    }

    setSubmitState(arr) {
        this.setState({
            submitState: arr
        })
    }

    modalContFunc() {
        let {modalSource}=this.props;
        if (modalSource == "editDeleteIcd10List") {
            return '确认删除？'

        } else {
            return this.submitProgress()

        }
    }

    submitProgress() {
        return (
            <Steps>
                {
                    this.state.submitState.map(function (val, idx) {
                        return <Step key={idx} title={val.title} description={val.description} status={val.status}/>
                    })
                }
            </Steps>
        )
    }

    modalHandleOk() {
        let {modalSource, modal, asideNavCurrent, mainType, detailType, id, type}=this.props;

        if (modalSource == "editDeleteIcd10List") {
            this.props.icd10Delete(this.state.deleteIcd10Idx)
        } else {
            modal(false, "");
            if (type == 'edit') {
                this.context.router.push(`/content/${asideNavCurrent}/${mainType}/${detailType}?id=${id}`)
            } else if (type == 'add') {
                this.context.router.push(`/content/${asideNavCurrent}/all`)
            }
        }
    }

    addIcd10() {
        this.props.icd10Add();
    }

    deleteIcd10(idx) {
        this.props.modal(true, 'editDeleteIcd10List')
        this.setState({
            deleteIcd10Idx: idx
        })
    }

    icdSelectChange(idx, value) {
        this.props.icdSelectChange(idx, value)
    }

    icdInputChange(idx, value) {
        this.props.icdInputChange(idx, value)
    }

    componentDidMount() {
        let {pageData}=this.props,
            self = this;

        this.props.editFooterInit();
        // this.requestDepartmentList();

        if (pageData.type == "edit") {
            this.fetchData();
        }
    }

    fetchData() {
        let {fetchData, versionID, asideNavCurrent, handledData}=this.props;

        fetchData({
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/version/${versionID}`,
            method: 'post',
            data: {"derefOptions": {"to": "DereferenceToSummary"}},
            success: function (data) {
                handledData(data);
            },
            error: function () {
                handledData({}, {isError: true});
            }
        })
    }


}


Normal.contextTypes = {
    router: React.PropTypes.object
}










