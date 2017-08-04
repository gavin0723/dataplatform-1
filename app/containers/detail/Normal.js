import {connect} from "react-redux";
import Normal from "../../components/details/Normal";
import {
    detailNormalHandledData,
    fetchData,
    detailNromalFetchReceive,
    editNormalType,
    currentDocPublished,
    currentDocState,
    currentVersionState,
    versionHandledData,
    versionLogFetchReceive,
    resolveIcd10sList,
    detailHandleDepartment
} from "../../actions";
import {handleFetchData, handleVersionsList} from "../handleFetchData";

const mapStateToProps = (state) => {

    let {mainState, versionLog, detailNormalFetch, asideNav} =state;

    let icd10Str='',
        icd10sList=mainState.icd10s,      //icd10列表
        icd10s=detailNormalFetch.handledData.icd10 || [];   //文档的icd10

    icd10s.map(function(val,idx){
        icd10sList.map(function(item){
            if(val.system==item.id){
                icd10Str+=item.name+'-'+val.code+' ';
            }
        })
    });

    return ({
        title: mainState.currentDocName,
        version: versionLog.handledData.currentData,
        data: detailNormalFetch.handledData,
        asideNavCurrent: asideNav.current,
        id: mainState.currentDocID,
        icd10Str:icd10Str
    })

}

const mapDispatchToProps = (dispatch)=> {
    return ({
        handledData: (data, params)=> {

            let _params = params || {}

            let {_data, _json, _publishState}=handleFetchData(data, 'normal')

            if (!_params.isError) {
                dispatch(currentVersionState(_json))
                dispatch(currentDocState(_data.id, _data.name))
            }

            if (_params.isDoc) {
                dispatch(currentDocPublished(_publishState));
            }

            dispatch(detailNormalHandledData(_data));
        },
        handleVersionsList: (data)=> {

            let _data = handleVersionsList(data)

            dispatch(versionHandledData(_data))
        },
        versionLogFetchReceive: (data)=> {
            dispatch(versionLogFetchReceive(data))
        },
        normalFetchReceive: (data)=> {
            dispatch(detailNromalFetchReceive(data))
        },
        fetchData: (params)=> {
            dispatch(fetchData(params))
        },
        editNormalType: (type)=> {
            dispatch(editNormalType(type))
        },
        resolveIcd10sList:(data)=>{
            dispatch(resolveIcd10sList(data))
        },
        handleDepartment:(json)=>{
            dispatch(detailHandleDepartment(json))
        }
    })
}


const NormalPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Normal);

export default NormalPage;
