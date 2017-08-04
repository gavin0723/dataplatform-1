import {connect} from "react-redux";
import $ from "jquery";
import DetailPage from "../components/details";
import {
    detailTab,
    mainTab,
    asideNavAction,
    currentDocState,
    setVersionLogToggle,
    fetchData,
    commonModalState,
    detailNormalHandledData,
    detailNromalFetchReceive,
    currentVersionState,
    currentDocPublished,
    userInfo
} from "../actions";
import {handleFetchData,handleFetchUserInfo} from "./handleFetchData";


const mapStateToProps = (state) => {

    let tabCont = [
        {name: '标准', current: 'normal'},
        {name: '百科', current: 'wiki'},
        {name: '同义词', current: 'synonyms'}
    ];
    let editCont = [
        {name: '编辑', icon: 'icon-edit', type: 'edit'},
        {name: '更多', icon: 'icon-more', type: 'more'}

    ];

    let editPullDown = [
        {name: '发布', icon: 'icon-save', type: 'release'},
        {name: '取消发布', icon: 'icon-refuse', type: 'unpublish'},
        {name: '删除', icon: 'icon-delete', type: 'delete'}
    ];

    let {mainState, asideNav, versionLog, commonModal,userInfo}=state,
        {draftData,historyVersions,currentData}=versionLog.handledData;

    let _historyVid='';
    if(historyVersions.length>0){
        _historyVid=historyVersions[0].vid;
    }

    let noneCurrentV=true;
    if(currentData.vid){
        noneCurrentV=false;
    }


    let asideNavCurrent=asideNav.current;
    let userLimit=userInfo.isVisitor?'visitor':userInfo.limit[asideNavCurrent];

    let mainW=$(window).width() - 220;
    if(versionLog.versionLogToggle && userLimit !='visitor'){
        mainW=$(window).width() - 220 - 261
    }

    return ({
        tabCont: tabCont,
        editCont: userLimit =='visitor'?[] : editCont,
        editPullDownCont: userLimit =='visitor'?[] : editPullDown,

        userLimit:userLimit,
        userInfoOverdue:userInfo.overdue,

        asideNavCurrent:asideNavCurrent,
        current: mainState.detailTabCurrent,
        id: mainState.currentDocID || '',
        vid: mainState.currentVersionID || draftData.vid || _historyVid,
        mainTabCurrent: mainState.mainTabCurrent,
        title: mainState.currentDocName || '',
        publishState: mainState.currentDocPublished || false,
        allowPublish: mainState.currentDocPublished || noneCurrentV,

        modalSource: commonModal.source,

        versionLogToggle: versionLog.versionLogToggle,
        mainW: mainW

    })
}

const mapDispatchToProps = (dispatch)=>({
    clickDetailTab: (current)=> {
        dispatch(detailTab(current))
    },
    asideNavAction: (current)=> {
        dispatch(asideNavAction(current))
    },
    mainTab: (current)=> {
        dispatch(mainTab(current))
    },
    setVersionLogToggle: (toggle)=> {
        dispatch(setVersionLogToggle(toggle))
    },
    fetchData: (params)=> {
        dispatch(fetchData(params))
    },
    modal: (visible, source)=> {
        dispatch(commonModalState(visible, source))
    },
    handledData: (data,params)=> {

        // let _params=params||{}
        // let {_data,_json,_publishState}=handleFetchData(data,'normal')

        let _params = params || {},
            asideNav=params.asideNav|| ''

        let {_data, _json, _publishState}=handleFetchData(data, 'normal',false,asideNav);


        if(!_params.isError){
            dispatch(currentVersionState(_json))
            dispatch(currentDocState(_data.id,_data.name))
        }

        if(_params.isDoc){
            dispatch(currentDocPublished(_publishState));
        }

        dispatch(detailNormalHandledData(_data));

    },
    normalFetchReceive: (data)=> {
        dispatch(detailNromalFetchReceive(data))
    },
    currentDocState: (id, name)=> {
        let _id = id || '';
        let _name = name || '';
        dispatch(currentDocState(_id, _name))
    },
    handleFetchUserInfo:(data)=>{
        let json=handleFetchUserInfo(data);
        dispatch(userInfo(json))
    }


})

const Detail = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPage);

export default Detail
