import {connect} from "react-redux";
import EditPage from "../../components/edit/Synonyms";
import {
    editSynonymsModalInputValue,
    fetchData,
    commonModalState,
    editSynonymsAdd,
    editSynonymsEdit,
    editSynonymsDelete,
    editSynonymsInit,
    currentDocState,
    currentVersionState
} from "../../actions";

import {handleFetchData} from '../handleFetchData'

const mapStateToProps = (state) => {

    let {mainState, commonModal, editSynonyms, editFooter, asideNav}=state;

    let modalSource=commonModal.source;
    let modalHasCancel=true;
    if(modalSource == '_editCommit' || modalSource == '_editPropose' || modalSource == '_editAdmit' || modalSource=='_editSetCurrent'){
        modalHasCancel=false;
    }

    return ({

        title: mainState.currentDocName,
        asideNavCurrent: asideNav.current,
        vid:mainState.currentVersionID,
        mainType:mainState.mianTabCurrent || 'all',

        modalSource: commonModal.source,
        modalHasCancel:modalHasCancel,
        editFooter: editFooter,

        pageData: editSynonyms.content || [],

        id: mainState.currentDocID,
        newValue: editSynonyms.newValue,
        editIndex:editSynonyms.editIndex

    })
}


const mapDispatchToProps = (dispatch)=>({

    handleData:(data,params)=>{

        let _params=params||{}
        let {_data,_json}=handleFetchData(data,'synonyms',true);

        if(!_params.isError){
            dispatch(currentVersionState(_json));
            dispatch(currentDocState(_data.id,_data.name));
        }

        dispatch(editSynonymsInit(_data));

    },

    modalInputValue: (name, idx)=> {
        let val = name || '';
        let index = idx == 0 ? 0 : (idx || "");

        dispatch(editSynonymsModalInputValue(val, index))
    },
    modal: (visible, source)=> {
        dispatch(commonModalState(visible, source))
    },
    fetchData: (params)=> {
        dispatch(fetchData(params))
    },
    editSynonymsAdd: (value)=> {
        dispatch(editSynonymsAdd(value))
    },
    editSynonymsEdit:(val,idx)=>{
        dispatch(editSynonymsEdit(val,idx))
    },
    editSynonymsDelete:(idx)=>{
        dispatch(editSynonymsDelete(idx))
    },
    handleGetName:(data)=>{

        let {_data}=handleFetchData(data,'synonyms');
        dispatch(currentDocState(_data.id,_data.name))

    }
})

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);

export default Edit
