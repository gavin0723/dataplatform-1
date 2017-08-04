import React, {Component} from "react";
import $ from "jquery";

export default class VersionControl extends Component {

    constructor() {
        super();
        this.state = {
            currentVState: false,
            editDraftToggle: false,
            historyListActionIdx: '-1'

        }
    }

    render() {

        require("../styles/versionControl.css")

        let self = this;

        let {setVersionControlBoxToggle, currentData, draftData, historyVersions, versionLogToggle,userType}=this.props;
        let {editDraftToggle, historyListActionIdx,currentVState} = this.state;

        let admitColor = '#999'
        let denyColor = '#999'
        if (JSON.stringify(draftData) != '{}') {
            admitColor = '#3D83B8';
            denyColor = '#D77170';
        }

        return (
            <div>
                <div id='version-control' style={{
                    height: $(window).height(),
                    right: this.props.versionLogToggle ? '0' : '-261px'

                }}>

                    <div className='header clearfix pad box-s-b w100'>
                        <div className='fll cursor-p putwawy'
                             onClick={()=>setVersionControlBoxToggle(false)}>
                            <span className='icon-putaway icon'></span>
                        </div>
                        <div className='flr'>
                            <span >版本控制</span>
                        </div>
                    </div>

                    {/*当前版本*/}
                    <div
                        className={currentVState ? 'current pad box-s-b w100 cursor-p active' : 'current pad box-s-b w100 cursor-p'}
                        onClick={()=>self.clickVersions('current')}
                    >
                        <p className='title'>
                            <span className='icon-current icon'></span>
                            当前使用版本
                        </p>
                        <p className='info clearfix'>
                            <span className='fll'>
                                {JSON.stringify(currentData) != '{}' ? currentData.time : "无" }
                            </span>
                            <span className='flr ellipsis'>
                                {currentData.name}
                            </span>
                        </p>

                    </div>

                    {/*草稿*/}
                    <div className='w100 cursor-p draft-wrap'>
                        <div className={editDraftToggle ? 'draft pad box-s-b active' : 'draft pad box-s-b'}
                             onClick={()=>this.editDraft()}
                        >
                            <p className='title'>
                                <span className='icon-draft icon'></span>
                                草稿
                            </p>
                            <p className='info clearfix'>

                                <span className='fll'>
                                    {JSON.stringify(draftData) == "{}" ? "无" : draftData.time}
                                </span>
                                <span className='flr ellipsis'>
                                    {draftData.name}
                                </span>
                            </p>
                        </div>

                        {
                            userType=='manager' &&
                            <div className='draft-operate clearfix box-s-b w100 cursor-p'
                                                        style={{height: editDraftToggle ? '50px' : '0'}}
                            >
                                <div className='draft-operate-approval fll'
                                     onClick={this.admit.bind(this)}
                                     style={{color: admitColor}}
                                >
                                    <span className='icon-approval'></span>
                                    批准
                                </div>
                                <div className='draft-operate-refuse flr'
                                     onClick={this.deny.bind(this)}
                                     style={{color: denyColor}}
                                >
                                    <span className='icon-refuse'></span>
                                    拒绝
                                </div>
                            </div>
                        }


                    </div>

                    {/*历史版本*/}
                    <div className='history-title pad box-s-b clearfix'>
                        <div className='fll'>
                            <span className='icon-history icon'></span>
                            历史版本(
                            <span>{historyVersions.length}</span>
                            )
                        </div>
                        {/*<div className='flr'>*/}
                        {/*<span className='icon-unfolded icon'></span>*/}
                        {/*</div>*/}
                    </div>

                    <div className='histroy-cont-wrap'>
                        <ul className='history-cont'>
                            {
                                historyVersions.map(function (val, idx) {
                                    return (
                                        <li key={idx}
                                            className='history-cont-li box-s-b cursor-p clearfix'
                                        >
                                            <div
                                                className={idx === historyListActionIdx ? "history-cont-info active" : 'history-cont-info'}
                                                onClick={()=>self.clickVersions('history', val, idx)}
                                            >
                                                <span className='fll histroy-version-time ellipsis'>{val.time}</span>
                                                <span className='flr histroy-version-name ellipsis'>{val.name}</span>
                                            </div>

                                            {
                                                userType=='manager' &&
                                                <div style={{height: idx === historyListActionIdx ? '48px' : '0'}}
                                                     className="clearfix histroy-handle-btn">
                                                    <div className="fll" onClick={()=>self.historySetCurrent(val)}>
                                                        <span className='icon-approval'></span>
                                                        设为当前版本
                                                    </div>
                                                    <div className="flr" onClick={()=>self.historyCancel()}>
                                                        <span className='icon-refuse'></span>
                                                        取消
                                                    </div>

                                                </div>
                                            }


                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </div>

                <div id="version-control-btn"
                     className="cursor-p"
                     style={{display: versionLogToggle ? 'none' : 'block'}}
                     onClick={()=>setVersionControlBoxToggle(true)}
                >
                    版本<br/>
                    控制
                </div>

            </div>
        )
    }


    setScope(){
        let { asideNavCurrent, detailType}=this.props,
            scope = '';

        if (detailType == 'normal' && asideNavCurrent != 'conll') {
            scope = asideNavCurrent
        } else if (detailType == 'synonyms') {
            scope = asideNavCurrent + '.synonym'
        } else if (detailType == 'wiki') {
            scope = asideNavCurrent + '.wiki'
        }else if(asideNavCurrent=='conll'){
            scope='conll'
        }
        return scope;
    }

    clickListCallback(data){
        let {detailType, detailSynonymsFetch, handledDataNormal, handledDataWiki,asideNavCurrent,handleDataStructured}=this.props;

        if(asideNavCurrent=='conll'){
            handleDataStructured(data, {isDoc: true});
        }else{
            // if (detailType == 'normal' && asideNavCurrent != 'symptom') {
            //     handledDataNormal(data,{asideNav:asideNavCurrent})
            // } else
            if (detailType == 'synonyms') {
                detailSynonymsFetch(data)
            } else if (detailType == 'wiki') {
                handledDataWiki(data)
            } else{
                handledDataNormal(data,{asideNav:asideNavCurrent})
            }
        }


    }

    historySetCurrent(val) {
        let self = this;
        let {fetchData,  modal}=this.props;

        let vid = val.vid;
        let scope =self.setScope();

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${vid}/setcurrent`,
            method: 'post',
            success: function () {
                modal(true, 'versionLog');
                self.fetchVList()
                self.setState({
                    historyListActionIdx: '-1'
                })
            }
        })
    }

    historyCancel() {
        this.setState({
            historyListActionIdx: '-1'
        })
    }

    //点击 当前版本  或  历史版本列表
    clickVersions(type, val, idx) {
        let self = this;
        let {currentData, fetchData}=this.props;

        this.setState({
            editDraftToggle: false
        })

        let scope =self.setScope();

        let vid = '';
        if (JSON.stringify(currentData) != '{}' && type == 'current') {  //当前版本
            vid = currentData.vid;

            self.setState({
                historyListActionIdx: '-1'
            })

        } else if (type == 'history') {    //历史版本列表

            let {historyListActionIdx}=self.state;

            if (historyListActionIdx === idx) {
                self.setState({
                    historyListActionIdx: '-1'
                })
                return
            }


            self.setState({
                historyListActionIdx: idx
            })

            vid = val.vid;


        } else {
            return;
        }

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${vid}`,
            method: 'post',
            data: {"derefOptions": {"to": "DereferenceToSummary"}},
            success: function (data) {

                self.clickListCallback(data);

                if(data.content && data.content.departments && data.content.departments.length>0){
                    for(let i=0;i<data.content.departments.length;i++){
                        self.fetchDepartment(data,data.content.departments[i]);
                    }
                }

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
                    handleDepartment({name:data.content.name.name,id:id})
                }

            }
        });

    }


    //点击草稿
    editDraft() {
        let self = this;
        let {editDraftToggle}=this.state;
        let {draftData,fetchData}=this.props;

        let scope =self.setScope();

        if (JSON.stringify(draftData) != '{}' && !editDraftToggle) {

            fetchData({
                url: `/_/dataplatform/document/repository/${scope}/document/${draftData.id}/version/draft`,
                method: 'post',
                data: {"derefOptions": {"to": "DereferenceToSummary"}},
                success: function (data) {

                    self.setState({
                        editDraftToggle: !editDraftToggle,
                        historyListActionIdx: '-1'
                    });

                    self.clickListCallback(data);

                    if(data.content &&data.content.departments && data.content.departments.length>0){
                        for(let i=0;i<data.content.departments.length;i++){
                            self.fetchDepartment(data.content.departments[i]);
                        }
                    }


                }
            })
        }

    }



    //批准草稿
    admit() {
        let self = this;
        let {draftData, fetchData, modal}=this.props;

        if (JSON.stringify(draftData) == '{}') {
            return
        }

        let scope = self.setScope();

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${draftData.vid}/admit`,
            method: 'post',
            success: function () {
                modal(true, "versionLog")
                self.fetchVList();

                self.setState({
                    editDraftToggle: false
                })
            }
        })

    }

    //拒绝草稿
    deny() {
        let self = this;
        let {draftData, fetchData,  modal}=this.props;

        if (JSON.stringify(draftData) == '{}') {
            return
        }

        let scope = self.setScope();

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${draftData.vid}/deny`,
            method: 'post',
            success: function () {
                modal(true, "versionLog");
                self.fetchVList();

                self.setState({
                    editDraftToggle: false
                })
            }
        })
    }

    componentInit(props){
        let {currentData, draftData, historyVersions, currentVersionID}=props;

        let _currentState = (currentData.vid && currentData.vid == currentVersionID) ? true : false,
            _draftState = (draftData.vid && draftData.vid == currentVersionID) ? true : false,
            _historyListActionIdx = -1;

        if(!_currentState && !_draftState){

            historyVersions.map(function (val,idx) {
                if(val.vid==currentVersionID){
                    _historyListActionIdx=idx
                }
            })

        }

        this.setState({
            currentVState: _currentState,
            editDraftToggle: _draftState,
            historyListActionIdx: _historyListActionIdx
        })
    }
    componentWillReceiveProps(nextProps) {

        this.componentInit(nextProps)
    }

    componentDidMount() {
        let self=this;
        this.setHistroyVH();
        this.winResize();
        this.componentInit(self.props);

    }

    fetchVList() {

        let self = this,
            { versionLogFetchReceive, handleVersionsList, id} = this.props;

        let scope = self.setScope();

        self.props.fetchData({  //请求文档的版本列表
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/version`,
            method: 'get',
            data: {},
            success: function (data) {
                versionLogFetchReceive(data);
                handleVersionsList(data);
            },


        })
    }

    setHistroyVH() {
        $('.histroy-cont-wrap').css('height', $(window).height() - $('.header').height() - $('.current').height() - $('.draft-wrap').height() - $('.history-title').height())
    }

    winResize() {
        let self = this;
        $(window).resize(function () {
            $('#version-control').css('height', $(window).height());
            self.setHistroyVH()
        })

    }

}
