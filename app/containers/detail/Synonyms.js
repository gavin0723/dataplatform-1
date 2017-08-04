import {connect} from "react-redux";
import SynonymsPage from "../../components/details/Synonyms"

import {
    fetchData,
    detailSynonymsFetchReceive,
    detailSynonymsHandledData,
    currentVersionState,
    currentDocState,
    versionHandledData,
    versionLogFetchReceive,
    currentDocPublished
} from '../../actions'
import {handleFetchData,handleVersionsList} from '../handleFetchData'

const mapStateToProps = (state) => {

    let {asideNav,mainState,detailSynonymsFetch} =state;
    return ({
        asideNavCurrent:asideNav.current,
        id:mainState.currentDocID,

        currentDocName:mainState.currentDocName,
        _data:detailSynonymsFetch.handledData.content||[]

    })

}

const mapDispatchToProps=(dispatch)=>{
    return ({
        fetchData:(params)=>{
            dispatch(fetchData(params))
        },
        detailSynonymsFetch:(data,params)=>{

            let _params=params||{}

            let {_data,_json,_publishState}=handleFetchData(data,'synonyms');

            if(!_params.isError){
                dispatch(currentVersionState(_json))
                dispatch(currentDocState(_data.id,_data.name))
            }

            if(_params.isDoc){
                dispatch(currentDocPublished(_publishState));
            }

            dispatch(detailSynonymsHandledData(_data));
            dispatch(detailSynonymsFetchReceive(data));
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


const Synonyms = connect(
    mapStateToProps,
    mapDispatchToProps
)(SynonymsPage);

export default Synonyms;
