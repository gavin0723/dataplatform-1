import React, {Component} from "react";
import Title from "../edit/CommonTitle";
import Info from "../../containers/edit/Info";
import Footer from "../../containers/edit/Footer";
import Modal from "../../containers/Modal";
import {Steps,Tabs,Popover,Radio} from "antd";
import {submitProcess} from "../edit/submitProcess";

import CheckBoxCustom from "../common/CheckBox";
import EditBtnDefined from '../edit/EditBtn'

const Step = Steps.Step;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

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
            categoriesSource:[],
            popoverVisible:false
        }
    }

    render() {

        let self = this,
            {pageData, title, modalSource, nameChange, friendlyNameChange, shortNameChange, ageRangeChange, genderChange, metadataChange, officeChange, categoriesChange,deleteCategories,setCommonSymptom}=this.props,
            {gender, ageRange,categoriesSource}=this.state;

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
                                       onChange={(e)=> metadataChange({value: e.target.value, type: 'doc'})}
                                />
                            </div>
                            <div className="input-wrap ">
                                <span className="input-name">是否属常见症状</span>
                                <RadioGroup onChange={(e)=>setCommonSymptom({common:e.target.value})}
                                            value={pageData.commonSymptom && pageData.commonSymptom.common?'yes':'no'}>
                                    <Radio value={'yes'}>是</Radio>
                                    <Radio value={'no'}>否</Radio>
                                </RadioGroup>
                            </div>
                            {
                                pageData.commonSymptom && pageData.commonSymptom.common && <div className="input-wrap ">
                                    <span className="input-name">权重(常见属性)</span>
                                    <input value={pageData.commonSymptom.weight  }
                                           className="ant-input"
                                           type="text"
                                           onChange={(e)=> setCommonSymptom({weight:e.target.value})}
                                    />
                                </div>
                            }
                        </div>

                        {/*分类*/}
                        <div className="item">
                            <h4>分类</h4>
                            <div className="input-wrap clearfix categories">
                                <span className="input-name fll">分类</span>
                                <div className="fll">
                                    {
                                        pageData.categories && pageData.categories.map((val,idx)=>{
                                            return (
                                                <div className="fll categoriesList cursor-p"
                                                     key={idx}
                                                     onClick={()=>deleteCategories(idx)}
                                                >
                                                    <span>{val.name}</span>
                                                    <span> x </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                            <Popover
                                content={self.renderPopoverCont()}
                                trigger="click"
                                visible={this.state.popoverVisible}
                                onVisibleChange={self.handlePopoverVisibleChange.bind(self)}
                            >
                                <div className="input-wrap addCategories cursor-p">
                                    <span className="icon-add"></span>
                                    <span> 点击添加分类</span>
                                </div>
                            </Popover>


                        </div>


                        {self._renderSymptomAttrs()}

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



    handlePopoverVisibleChange(visible){
        this.setState({popoverVisible:visible})
    }
    renderPopoverCont(){
        let {categoriesSource}=this.state,
            {addCategories}=this.props,
            self=this;
        let styles={
            height: "30px",
            lineHeight: "30px",
            fontSize: "14px",
        }
        return (
            <ul>
                {
                    categoriesSource.map((val,idx)=>{
                        return (
                            <li className="cursor-p" onClick={()=>self.addCategories(val)} key={idx} style={styles}>{val.name}</li>
                        )
                    })
                }

            </ul>
        )


    }

    _renderSymptomAttrs() {
        let self = this;
        let {symptomAttrsList}=this.props;

        return (
            <div className="item symptomAttrs" style={{paddingBottom: '20px'}}>
                <div className="clearfix" onClick={()=>self.addAttrs()}>
                    <h4 className="fll">属性</h4>
                    <div className="flr cursor-p" style={{color:'#3A84B9'}}>
                        <span className="icon-add"></span>
                        <span> 添加属性</span>
                    </div>
                </div>

                <Tabs
                    defaultActiveKey="0"
                    tabPosition={'top'}
                >
                    {
                        symptomAttrsList && symptomAttrsList.length > 0 && symptomAttrsList.map((val, idx)=> {
                            return (
                                self._renderSymptomAttrsLi(val, idx)
                            )
                        })
                    }

                </Tabs>
            </div>
        )
    }
    addCategories(val){
        let {addCategories}=this.props;
        addCategories(val);
        this.setState({
            popoverVisible:false
        })
    }

    _renderSymptomAttrsLi(val, idx) {
        let {metadataChange, symptomNameChange, symptomKeyChange, symptomGenderChange, symptomAgeRangeChange}=this.props,
            {gender, ageRange}=this.state,
            self=this;

        return (
            <TabPane tab={val.name} key={idx}>
                <div className="input-wrap">
                    <span className="input-name">名称</span>
                    <input value={val.name }
                           className="ant-input"
                           type="text"
                           onChange={(e)=> symptomNameChange({value: e.target.value, type: 'attrs', key: val.key})}
                    />

                </div>
                <div className="input-wrap">
                    <span className="input-name">key</span>
                    <input value={val.key }
                           className="ant-input"
                           type="text"
                           onChange={(e)=> symptomKeyChange({value: e.target.value, type: 'attrs', key: val.key})}
                    />
                </div>
                <div className="input-wrap clearfix" style={{height: "auto"}}>
                    <span className="input-name fll">约束</span>
                    <div style={{display: 'inline-block'}}>
                        <CheckBoxCustom
                            options={gender}
                            defaultValue={val.genderArr}
                            onChange={(value)=> symptomGenderChange({value, type: 'attrs', key: val.key})}

                        />
                        <CheckBoxCustom
                            options={ageRange}
                            defaultValue={val.ageArr}
                            onChange={(value)=> symptomAgeRangeChange({value, type: 'attrs', key: val.key})}

                        />
                    </div>
                </div>
                <div className="input-wrap">
                    <span className="input-name">元数据</span>
                    <input value={val.metadataStr }
                           className="ant-input"
                           type="text"
                           onChange={(e)=> metadataChange({value: e.target.value, type: 'attrs', key: val.key})}
                    />
                </div>
                <div className="clearfix" style={{padding:"10px 0 10px  80px",height:"52px"}}>
                    <EditBtnDefined
                        className="fll"
                        style={{border: '1px solid #D96F6E', color: '#D96F6E',width:'150px'}}
                        icon='icon-delete'
                        name="删除该属性"
                        type="delete"
                        onClick={()=>self.deleteAttrs(idx)}
                    />

                    <div className="flr cursor-p" style={{color:'#3A84B9'}} onClick={()=>self.addAttrsValue(idx)}>
                        <span className="icon-add"></span>
                        <span> 添加属性值</span>
                    </div>
                </div>


                <Tabs
                    defaultActiveKey="0"
                    tabPosition={'top'}
                    style={{background: "#fafafa", padding: "5px 10px 10px", marginTop: '10px'}}
                >
                    {
                        val.values.map((item, index)=> {
                            return (
                                <TabPane tab={item.name} key={index}>

                                    <div className="input-wrap">
                                        <span className="input-name">名称</span>

                                        <input value={item.name }
                                               className="ant-input"
                                               type="text"
                                               onChange={(e)=> symptomNameChange({
                                                   value: e.target.value,
                                                   type: 'attrsVal',
                                                   key: item.key
                                               })}
                                        />

                                    </div>
                                    <div className="input-wrap">
                                        <span className="input-name">key</span>

                                        <input value={item.key}
                                               className="ant-input"
                                               type="text"
                                               onChange={(e)=> symptomKeyChange({
                                                   value: e.target.value,
                                                   type: 'attrsVal',
                                                   key: item.key
                                               })}
                                        />
                                    </div>
                                    <div className="input-wrap clearfix" style={{height: "auto"}}>
                                        <span className="input-name fll">约束</span>
                                        <div style={{display: 'inline-block'}}>
                                            <CheckBoxCustom
                                                options={gender}
                                                defaultValue={item.genderArr}
                                                onChange={(value)=> symptomGenderChange({
                                                    value,
                                                    type: 'attrsVal',
                                                    key: item.key
                                                })}

                                            />
                                            <CheckBoxCustom
                                                options={ageRange}
                                                defaultValue={item.ageArr}
                                                onChange={(value)=> symptomAgeRangeChange({
                                                    value,
                                                    type: 'attrsVal',
                                                    key: item.key
                                                })}

                                            />
                                        </div>
                                    </div>
                                    <div className="input-wrap">
                                        <span className="input-name">元数据</span>
                                        <input value={item.metadataStr}
                                               className="ant-input"
                                               type="text"
                                               onChange={(e)=> metadataChange({
                                                   value: e.target.value,
                                                   type: 'attrsVal',
                                                   key: item.key
                                               })}
                                        />
                                    </div>
                                    <div style={{padding:'10px 0 10px  80px',height:"52px"}}>
                                        <EditBtnDefined
                                            className="fll"
                                            style={{border: '1px solid #D96F6E', color: '#D96F6E',width:'150px'}}
                                            icon='icon-delete'
                                            name="删除该属性值"
                                            type="delete"
                                            onClick={()=>self.deleteAttrsValue(idx,index)}
                                        />
                                    </div>

                                </TabPane>
                            )
                        })
                    }

                </Tabs>

            </TabPane>
        )
    }

    addAttrs(){
        this.props.addAttrs()
    }

    addAttrsValue(idx){
        this.props.addAttrsValue(idx)
    }

    deleteAttrs(idx){
        this.props.removeAttrs(idx)
    }

    deleteAttrsValue(attrsIdx,valIdx){
        this.props.removeAttrsValue(attrsIdx,valIdx)
    }

    handlePostData() {
        let self = this;
        let {pageData, editFooter}=self.props;

        let cagegories=self.handleCagegories(),
            attrs= self.handleAttrs();

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
            "categories": cagegories,
            "attrs":attrs,
            "commonItemOption":{}

        };

        let commonSymptom=pageData.commonSymptom || {};
        if(commonSymptom.common){
            if(Number(commonSymptom.weight) || Number(commonSymptom.weight)==0 ){
                content.commonItemOption={
                    common:true,
                    weight:Number(commonSymptom.weight)
                }

            }else{
                alert('常见症状权重应为数字');
                return;
            }

        }else{
            content.commonItemOption={
                common:false
            }
        }

        if(Number(pageData.weight) && Number(pageData.weight)>0){
            content.metadata.weight=Number(pageData.weight)
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

    handleCagegories() {
        let {pageData}=this.props,
            {categories}=pageData,
            arr=[];

        categories && categories.map(val=> {
            let json = {
                // content: {
                //     name: {
                //         name: val.name
                //     },
                //     series:val.series
                // },
                id: val.id
            };
            arr.push(json)
        });

        return arr;

    }

    handleAttrs(){
        let {pageData}=this.props,
            {symptomAttrsList}=pageData,
            arr=[];
        symptomAttrsList && symptomAttrsList.map(val=>{
            let json={
                key:val.key,
                name:{
                    name:val.name
                },
                metadata:{},
                constraint: {
                    "ageRanges": val.ageArr || [] ,
                    "genders": val.genderArr || []
                },
                values:[]

            };
            if(Number(val.metadataStr) && Number(val.metadataStr)>0){
                json.metadata.weight=Number(val.metadataStr)
            }

            val.values.map(item=>{
                let _json={
                    key:item.key,
                    name:{
                        name:item.name
                    },
                    metadata:{},
                    constraint: {
                        "ageRanges": item.ageArr || [],
                        "genders": item.genderArr || []
                    }
                }
                if( Number(item.metadataStr) && Number(item.metadataStr)>0){
                    _json.metadata.weight=Number(item.metadataStr)
                }
                json.values.push(_json);
            });
            arr.push(json)
        });

        return arr
    }

    clickTitleBtn(type) {
        let self = this;
        let data = this.handlePostData();
        let {asideNavCurrent, pageData, modal, editFooter}=self.props;

        let setSubmitState = this.setSubmitState.bind(this);

        if (pageData.name == "") {
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
        let {pageData}=this.props,
            self = this;

        this.props.editFooterInit();
        // this.requestDepartmentList();

        if (pageData.type == "edit") {
            this.fetchData();
        }

        this.fetchGetSymptomcategory();
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

    fetchGetSymptomcategory(){
        let {fetchData}=this.props,
            self=this;

        fetchData({
            url: `/_/dataplatform/document/repository/symptomcategory/list`,
            method: 'post',
            success: function (data) {
                let arr=[];
                if(data && data.documents){
                    data.documents.map(val=>{
                        if(val.content && val.content.name && val.content.name.name && val.id ){
                           let json={
                               name:val.content.name.name ,
                               id:val.id
                           }
                           arr.push(json);
                        }
                    })
                }
                self.setState({
                    categoriesSource:arr
                })
            }
        })
    }



}


Normal.contextTypes = {
    router: React.PropTypes.object
}




