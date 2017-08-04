import React, {Component} from "react";
import $ from "jquery";
import Title from "./CommonTitle";
import Info from "../../containers/edit/Info";
import Footer from "../../containers/edit/Footer";
import Modal from "../../containers/Modal";
import {Checkbox, Steps, Select} from "antd";
import {submitProcess} from "./submitProcess";
import SearchInputCustom from '../common/SearchInput'
import EditBtnDefined from './EditBtn'
const CheckboxGroup = Checkbox.Group;
const Step = Steps.Step;
const Option = Select.Option;

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
            ]

        }
    }

    render() {

        let self = this;
        let {pageData, title, modalSource, icd10List, resolveIcd10sList, nameChange, friendlyNameChange, shortNameChange,officeChange,deleteSelectDep}=this.props;

        let {gender, ageRange}=this.state;


        return (
            <div>
                <Title
                    type="normal"
                    title={title}
                    clickActionBtn={self.clickTitleBtn.bind(self)}
                />

                <Info title='标准'

                />

                <div id="editNormal">
                    <div className="cont-wrap">

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

                        <div className="item">
                            <h4>约束条件</h4>
                            <div className="input-wrap">
                                <span className="input-name">性别</span>
                                <div style={{display: 'inline-block'}}>
                                    <CheckboxGroup options={gender}
                                                   defaultValue={pageData.gender}
                                                   onChange={(checked)=> {
                                                       self.props.genderChange(checked)
                                                   }}
                                    />
                                </div>
                            </div>
                            <div className="input-wrap">
                                <span className="input-name">年龄段</span>
                                <div style={{display: 'inline-block'}}>
                                    <CheckboxGroup options={ageRange}
                                                   defaultValue={pageData.ageRange}
                                                   onChange={(checked)=> {
                                                       self.props.ageRangeChange(checked)
                                                   }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="item clearfix">
                            <h4>疾病信息</h4>

                            <div className="input-wrap clearfix">
                                <span className="input-name fll">处置科室</span>

                                <SearchInputCustom
                                    className="fll"
                                    onChange={(val)=>officeChange(val)}
                                    deleteSelect={(idx)=>deleteSelectDep(idx)}
                                    defaultValue={pageData.departmentArr}
                                    url="/_/dataplatform/document/search"
                                />

                            </div>

                            <div className="input-wrap clearfix">
                                <span className="input-name fll">ICD10</span>
                                <div className="fll">
                                    {

                                        pageData.icd10 && pageData.icd10.length > 0 ?
                                            pageData.icd10.map(function (val, idx) {
                                                return (
                                                    <SelectDefined
                                                        key={idx}
                                                        idx={idx}
                                                        inputValue={val.code}
                                                        selectValue={val.system}
                                                        addIcd10={self.addIcd10.bind(self)}
                                                        deleteIcd10={self.deleteIcd10.bind(self)}
                                                        selectChange={self.icdSelectChange.bind(self)}
                                                        inputChange={self.icdInputChange.bind(self)}
                                                        icd10List={icd10List}
                                                        resolveIcd10sList={resolveIcd10sList}
                                                    />
                                                )
                                            }) : <SelectDefined
                                            idx={0}
                                            inputValue={''}
                                            selectValue={''}
                                            addIcd10={self.addIcd10.bind(self)}
                                            deleteIcd10={self.deleteIcd10.bind(self)}
                                            selectChange={self.icdSelectChange.bind(self)}
                                            inputChange={self.icdInputChange.bind(self)}
                                            icd10List={icd10List}
                                            resolveIcd10sList={resolveIcd10sList}

                                        />
                                    }
                                </div>
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
        let {submitData, editFooter}=self.props;

        // let ageRange = {
        //     adult: false,
        //     child: false,
        //     newborn: false
        // }
        let ageRange = [];
        submitData.ageRange.map(function (val) {
            ageRange.push(val);
        })

        // let gender = {
        //     female: false,
        //     male: false
        // }
        let gender = []
        submitData.gender.map(function (val) {
            gender.push(val);
        })

        let icd10s = [];
        submitData.icd10.map(function (val, idx) {
            if (val.code != "") {
                icd10s.push(val)
            }
        })


        let content = {
            "name": {
                "friendlyName": submitData.friendlyName,
                "name": submitData.name,
                "shortName": submitData.shortName
            },
            "icd10s": icd10s,
            "constraint": {
                "ageRanges": ageRange,
                "genders": gender
            },
            "departments": []
        };

        submitData.departmentArr.map(val=>{
            content.departments.push(val.id);
        })

        let _cont = JSON.stringify(content);

        let data = {
            "content": {
                "type": "json",
                "content": _cont
            },
            "commit": editFooter.commitValue || '',
        };

        if (submitData.type == 'edit') {
            data.id = submitData.id
        }

        return data;
    }

    clickTitleBtn(type) {
        let self = this;
        let data = this.handlePostData();
        let {asideNavCurrent, submitData, modal, editFooter}=self.props;

        let setSubmitState = this.setSubmitState.bind(this);

        if (submitData.name == "") {
            alert('标准名不能为空');
            return
        }

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
        this.props.editFooterInit();

        let {pageData}=this.props;

        if (pageData.type == "edit") {
            this.fetchData();
        }
    }

    fetchData() {
        let {fetchData, versionID, asideNavCurrent, handledData}=this.props,
            self=this;

        fetchData({
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/version/${versionID}`,
            method: 'post',
            data: {"derefOptions": {"to": "DereferenceToSummary"}},
            success: function (data) {
                handledData(data);


                if(data.content && data.content.departments && data.content.departments.length>0){
                    for(let i=0;i<data.content.departments.length;i++){
                        self.fetchDepartment(data.content.departments[i]);
                    }
                }

            },
            error: function () {
                handledData({}, {isError: true});
            }
        })
    }

    // 请求科室数据
    fetchDepartment(id){

        let self=this;
        let {fetchData,handleDepartment}=this.props;
        fetchData({
            noPromptError:true,
            url: `/_/dataplatform/document/repository/department/document/${id}/get`,
            method:'post',
            success:function (data) {
                if(data && data.content && data.content.name && data.content.name.name){
                    handleDepartment({text:data.content.name.name,id:id})
                }

            }
        });

    }
}


Normal.contextTypes = {
    router: React.PropTypes.object
}

class SelectDefined extends Component {

    constructor() {
        super();
        this.state = {
            optionList: [],
            selectDefaultValue: ''
        }
    }

    render() {

        let self = this;
        let {idx, inputValue, addIcd10, deleteIcd10}=this.props;
        let {optionList, selectDefaultValue}=this.state;

        return (
            <div style={{marginBottom: '10px'}} className="clearfix">
                <div id="select-defined" className="fll">
                    <div className="fll">

                        <Select value={selectDefaultValue} onChange={(value)=>this.selectChange(value)}>
                            {
                                optionList.map(function (val, idx) {
                                    return (
                                        <Option value={val.id}
                                                key={idx}
                                        >
                                            {val.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>

                    </div>


                    <input className="ant-input flr "
                           value={inputValue}
                           onChange={e=> {
                               this.inputChange(e.target.value)
                           }}
                           style={{width: '179px'}}
                    />

                </div>
                {
                    this.props.idx == 0 ? <EditBtnDefined
                        className="fll"
                        style={{border: '1px solid #3A84B9', color: '#3A84B9'}}
                        icon='icon-add'
                        name="添加"
                        type="add"
                        onClick={addIcd10}

                    /> : ''
                }

                <EditBtnDefined
                    className="fll"
                    style={{border: '1px solid #D96F6E', color: '#D96F6E'}}
                    icon='icon-delete'
                    name="删除"
                    type="delete"
                    onClick={()=>deleteIcd10(idx)}
                />
            </div>

        )
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectValue != nextProps.selectValue) {
            this.setState({
                selectDefaultValue: nextProps.selectValue

            })
        }
    }

    componentDidMount() {
        let {icd10List}=this.props;

        if (icd10List.length == 0) {
            this.fetch();
        } else {
            this.resolveIcd10(icd10List)
        }
    }


    fetch() {
        let self = this;
        $.ajax({
            url: `/_/dataplatform/entity/icd10system`,
            type: 'get',
            data: '{}',
            success: function (data) {
                if (data.systems) {
                    self.props.resolveIcd10sList(data.systems);
                    self.resolveIcd10(data.systems);
                }

            }
        })
    }

    resolveIcd10(data) {

        let self = this;
        let {selectValue}=this.props;

        self.setState({
            optionList: data,
            selectDefaultValue: selectValue
        })

    }

    selectChange(value) {
        let idx = this.props.idx;
        this.props.selectChange(idx, value);
        this.setState({
            selectDefaultValue: value
        })
    }

    inputChange(value) {
        let idx = this.props.idx;
        this.props.inputChange(idx, value);
    }
}


