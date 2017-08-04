import {connect} from "react-redux";
import EncyPage from "../../components/details/Encyclopedia"

import {
    fetchData,
    detailEncyclopediaFetchReceive,
    detailEncyHandledData,
    currentVersionState,
    versionHandledData,
    versionLogFetchReceive,
    currentDocState,
    currentDocPublished
} from '../../actions'

import {handleFetchData,handleVersionsList} from '../handleFetchData'

const mapStateToProps = (state) => {

    let {asideNav,detailEncyFetch,mainState} =state;
    return ({
        asideNavCurrent:asideNav.current,
        id:mainState.currentDocID,

        currentDocName:mainState.currentDocName,

        pageData:detailEncyFetch.handledData.chapters || []

    })

}

const mapDispatchToProps=(dispatch)=>{
    return ({
        fetchData:(params)=>{
            dispatch(fetchData(params))
        },
        detailEncyFetch:(data,params)=>{

            let _params=params||{}

            let {_data,_json,_publishState}=handleFetchData(data,'ency');

            if(!_params.isError){
                dispatch(currentVersionState(_json));
                dispatch(currentDocState(_data.id,_data.name));
            }

            if(_params.isDoc){
                dispatch(currentDocPublished(_publishState));
            }

            dispatch(detailEncyHandledData(_data));
            dispatch(detailEncyclopediaFetchReceive(data));

        },
        handleVersionsList: (data)=> {
            let _data=handleVersionsList(data)
            dispatch(versionHandledData(_data))
        },
        versionLogFetchReceive: (data)=> {
            dispatch(versionLogFetchReceive(data))
        },
        handleGetName:(data)=>{

            let {_data}=handleFetchData(data,'synonyms');
            dispatch(currentDocState(_data.id,_data.name))
        },
        currentDocPublishedInit:()=>{
            dispatch(currentDocPublished({publishState:false,publishTime:''}));

        }
    })
}


const Ency = connect(
    mapStateToProps,
    mapDispatchToProps
)(EncyPage);

export default Ency;
