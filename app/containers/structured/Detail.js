import {connect} from "react-redux";
import DetailPage from "../../components/structured/Detail";
import {
    fetchData,
    versionLogFetchReceive,
    versionHandledData,
    currentVersionState,
    setLoadingToggle,
    currentDocState,
    currentDocPublished,
    structuredHandledFetchData,
    structuredFetchRecive,
    structuredEditInpValChange,
    structuredEditCutResultChange

} from "../../actions";
import {handleVersionsList,handleFetchData} from "../handleFetchData";


const mapStateToProps = (state) => {

    let {mainState,structured}=state;

    return ({
        id: mainState.currentDocID || '',
        cutResult:structured.cutResult
    })
}

const mapDispatchToProps = (dispatch)=>({

    fetchData: (params)=> {
        dispatch(fetchData(params))
    },
    versionLogFetchReceive: (data)=> {
        dispatch(versionLogFetchReceive(data))
    },
    handleVersionsList: (data)=> {

        let _data = handleVersionsList(data);

        // dispatch(currentVersionState(_data.currentV));      //设置当前版本，根据version api返回的数据
        dispatch(versionHandledData(_data))
    },
    setLoadingToggle:(bool)=>{
        dispatch(setLoadingToggle(bool))
    },

    handledData: (data, params)=> {

        let _params = params || {}

        let {_data, _json, _publishState}=handleFetchData(data,'structured')

        if (!_params.isError) {
            dispatch(currentVersionState(_json))
            dispatch(currentDocState(_data.id, _data.name))
        }

        if (_params.isDoc) {
            dispatch(currentDocPublished(_publishState));
        }

        typeof params.cb=="function" && params.cb(_data.labeledText);

        dispatch(structuredEditInpValChange(_data.originText));
        dispatch(structuredEditCutResultChange(_data.labeledText));

        dispatch(structuredHandledFetchData(_data));
    },
    getFetchReceive:(data)=>{
        dispatch(structuredFetchRecive(data))
    }


})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPage);

