import {connect} from "react-redux";
import EditPage from "../../components/labitem/EditNormal";
import {
    editNormalNameChange,
    editNormalFriendlynameChange,
    editNormalShortnameChange,
    editNormalGenderChange,
    editNormalAgeChange,
    editNormalOfficeChange,
    editNormalAddIcd10,
    editNormalDeleteIcd10,
    editNormalIcdSelectChange,
    editNormalIcdInputChange,
    fetchData,
    commonModalState,
    editFooterInit,
    currentVersionState,
    currentDocState,
    editNormalData,

    labitemEditNormalMetadata,
    symptomEditNormalGender,
    symptomEditNormalAgeRange,
    labitemEditNormalCategories,
    labitemInpValChange,
} from "../../actions";
import {handleFetchData} from "../handleFetchData";

const mapStateToProps = (state) => {

    let {editNormalData, asideNav, mainState, commonModal, editFooter} =state;


    return ({
        asideNavCurrent: asideNav.current,
        title: mainState.currentDocName,

        mainType: mainState.mainTabCurrent,
        detailType: mainState.detailTabCurrent,
        id: mainState.currentDocID,

        pageData: editNormalData,
        type: editNormalData.type,
        idReadyOnly: editNormalData.idReadOnly,

        modalSource: commonModal.source,
        editFooter: editFooter,

        weight:editNormalData.weight,

        versionID: mainState.currentVersionID


    })
}


const mapDispatchToProps = (dispatch)=>({

    handledData: (data, params)=> {

        let _params = params || {}

        let {_data, _json}=handleFetchData(data, 'normal', true,'labitem');

        if (!_params.isError) {
            dispatch(currentVersionState(_json))
            dispatch(currentDocState(_data.id, _data.name))
        }
        dispatch(editNormalData(_data))

    },

    nameChange: (val)=> {
        dispatch(editNormalNameChange(val))
    },
    friendlyNameChange: (val)=> {
        dispatch(editNormalFriendlynameChange(val))
    },
    shortNameChange: (val)=> {
        dispatch(editNormalShortnameChange(val))
    },
    ageRangeChange: (val)=> {
        dispatch(editNormalAgeChange(val))
    },
    genderChange: (val)=> {
        dispatch(editNormalGenderChange(val))
    },
    officeChange: (val)=> {

        // let {id, text}=val;

        dispatch(editNormalOfficeChange(val))
    },
    icd10Add: ()=> {
        dispatch(editNormalAddIcd10())
    },
    icd10Delete: (idx)=> {
        dispatch(editNormalDeleteIcd10(idx))
    },
    icdSelectChange: (idx, value)=> {
        dispatch(editNormalIcdSelectChange(idx, value))
    },
    icdInputChange: (idx, value)=> {
        dispatch(editNormalIcdInputChange(idx, value))
    },

    fetchData: (params)=> {
        dispatch(fetchData(params))
    },
    modal: (visible, source)=> {
        dispatch(commonModalState(visible, source))
    },
    editFooterInit: ()=> {
        dispatch(editFooterInit())
    },


    categoriesChange:(params)=>{
        dispatch(labitemEditNormalCategories(params))
    },
    inpValChange:(params)=>{
        dispatch(labitemInpValChange(params))
    }

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);

