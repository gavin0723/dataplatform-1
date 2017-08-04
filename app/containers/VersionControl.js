import {connect} from "react-redux";
import {
    setVersionLogToggle,
    versionHandledData,
    fetchData,
    versionLogFetchReceive,
    commonModalState,
    currentVersionState,
    detailSynonymsHandledData,
    detailSynonymsFetchReceive,
    detailNormalHandledData,
    detailNromalFetchReceive,
    detailEncyclopediaFetchReceive,
    detailEncyHandledData,

    currentDocState,
    currentDocPublished,
    structuredEditInpValChange,
    structuredEditCutResultChange,
    structuredHandledFetchData,

    detailHandleDepartment
} from "../actions";
import VersionControl from "../components/VersionControl";
import {handleFetchData, handleVersionsList} from "./handleFetchData";

const mapStateToProps = (state) => {

    let {versionLog, mainState, asideNav, commonModal,userInfo}=state;

    let {historyVersions, draftData, currentData} =versionLog.handledData,
        {versionLogToggle}=versionLog,
        asideNavCurrent=asideNav.current,
        userType=userInfo.limit[asideNavCurrent] || 'visitor';


    return ({
        historyVersions: historyVersions,
        draftData: draftData,
        currentData: currentData,

        modalSource: commonModal.source,
        asideNavCurrent,

        detailType: mainState.detailTabCurrent,
        id: mainState.currentDocID,
        currentVersionID:mainState.currentVersionID,

        versionLogToggle: versionLogToggle,
        userType
    })
};

const mapDispatchToProps = (dispatch) => {

    return ({
        setVersionControlBoxToggle: (toggle) => {
            dispatch(setVersionLogToggle(toggle))
        },
        fetchData: (params)=> {
            dispatch(fetchData(params))
        },

        modal: (visible, source)=> {
            dispatch(commonModalState(visible, source))
        },
        handleVersionsList: (data)=> {

            let _data = handleVersionsList(data);
            dispatch(versionHandledData(_data))
        },
        versionLogFetchReceive: (data)=> {
            dispatch(versionLogFetchReceive(data))
        },

        detailSynonymsFetch: (data)=> {

            let {_data, _json}=handleFetchData(data, 'synonyms', true);


            dispatch(detailSynonymsFetchReceive(data));
            dispatch(detailSynonymsHandledData(_data));
            dispatch(currentVersionState(_json));

        },

        handledDataNormal: (data,params)=> {

            let type='normal',
                asideNav='';

            if(params && params.asideNav){
                asideNav=params.asideNav;
            }
            let {_data, _json}=handleFetchData(data, type, true,asideNav);

            dispatch(detailNromalFetchReceive(data))
            dispatch(detailNormalHandledData(_data));
            dispatch(currentVersionState(_json));

        },
        handledDataWiki: (data)=> {

            let {_data, _json}=handleFetchData(data, 'ency', true);

            dispatch(detailEncyclopediaFetchReceive(data));
            dispatch(detailEncyHandledData(_data));
            dispatch(currentVersionState(_json));

        },

        handleDataStructured:(data,params)=>{
            let _params = params || {};

            let {_data, _json, _publishState}=handleFetchData(data,'structured',true);

            if (!_params.isError) {
                dispatch(currentVersionState(_json))
                dispatch(currentDocState(_data.id, _data.name))
            }

            if (_params.isDoc) {
                dispatch(currentDocPublished(_publishState));
            }

            // typeof params.cb=="function" && params.cb(_data.labeledText);

            dispatch(structuredEditInpValChange(_data.originText));
            dispatch(structuredEditCutResultChange(_data.labeledText));

            dispatch(structuredHandledFetchData(_data));
        },
        handleDepartment:(json)=>{
            dispatch(detailHandleDepartment(json))
        }


    });
}

const VersionLog = connect(
    mapStateToProps,
    mapDispatchToProps
)(VersionControl);

export default VersionLog
