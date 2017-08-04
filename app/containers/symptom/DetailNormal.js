import {connect} from "react-redux";
import Normal from "../../components/symptom/DetailNormal";
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
    resolveIcd10sList
} from "../../actions";
import {handleFetchData, handleVersionsList} from "../handleFetchData";


const mapStateToProps = (state) => {

    let {mainState, versionLog, detailNormalFetch, asideNav} =state;

    return ({
        title: mainState.currentDocName,
        version: versionLog.handledData.currentData,
        data: detailNormalFetch.handledData,
        asideNavCurrent: asideNav.current,
        id: mainState.currentDocID,

    })

}

const mapDispatchToProps = (dispatch)=> {
    return ({
        handledData: (data, params)=> {

            let _params = params || {},
                asideNav=params.asideNav|| ''

            let {_data, _json, _publishState}=handleFetchData(data, 'normal',false,asideNav);

            if (!_params.isError) {
                dispatch(currentVersionState(_json));
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
        }
        // resolveIcd10sList:(data)=>{
        //     dispatch(resolveIcd10sList(data))
        // }
    })
}


const NormalPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Normal);

export default NormalPage;
