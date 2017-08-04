import {connect} from "react-redux";
import EncyPage from "../../components/edit/Encyclopedia"

import {
    fetchData,
    editEncyInputValue,
    commonModalState,
    editFooterInit,
    editEncyInit,
    currentDocState,
    currentVersionState
} from '../../actions'

import {handleFetchData} from '../handleFetchData'

const mapStateToProps=(state)=>{

    let {editEncy,mainState,commonModal,editFooter,asideNav}=state;

    return ({
        title:mainState.currentDocName,
        asideNavCurrent:asideNav.current,
        vid:mainState.currentVersionID,
        mainType:mainState.mainTabCurrent,

        modalSource:commonModal.source,
        editFooter:editFooter,

        pageData:editEncy.content,
        id:mainState.currentDocID

    })
}

const mapDispatchToProps=(dispatch)=>{
    return ({
        handleData:(data,params)=>{

            let _params=params||{}
            let {_data,_json}=handleFetchData(data,'ency',true);

            if(!_params.isError){
                dispatch(currentVersionState(_json));
                dispatch(currentDocState(_data.id,_data.name));
            }
            dispatch(editEncyInputValue(_data.chapters));

        },
        editEncyInit:()=>{
            dispatch(editEncyInit())
        },
        fetchData:(params)=>{
            dispatch(fetchData(params))
        },
        inputChange:(title,text)=>{
            let arr=[{title:title,text:text}]
            dispatch(editEncyInputValue(arr))
        },
        modal:(visible,source)=>{
            dispatch(commonModalState(visible,source))
        },
        editFooterInit:()=>{
            dispatch(editFooterInit())
        },
        handleGetName:(data)=>{

            let {_data}=handleFetchData(data,'synonyms');
            dispatch(currentDocState(_data.id,_data.name))

        }

    })
}

const Ency = connect(
    mapStateToProps,
    mapDispatchToProps
)(EncyPage);

export default Ency;
