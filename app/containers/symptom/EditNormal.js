import {connect} from "react-redux";
import EditPage from "../../components/symptom/EditNormal";
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

    symptomEditNormalMetadata,
    symptomEditNormalName,
    symptomEditNormalKey,
    symptomEditNormalGender,
    symptomEditNormalAgeRange,
    symptomEditNormalCategories,
    symptomEditNormalAddAttrs,
    symptomEditNormalAddAttrsValues,
    symptomEditNormalRemoveAttrsValues,
    symptomEditNormalRemoveAttrs,
    symptomEditNormalDeleteCategories,
    symptomEditNormalAddCategories,
    symptomEditNormalSetCommon
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
        // submitData: editNormalData,
        modalSource: commonModal.source,
        editFooter: editFooter,

        weight:editNormalData.weight,

        // icd10List:mainState.icd10s,
        versionID: mainState.currentVersionID,

        symptomAttrsList: editNormalData.symptomAttrsList,


    })
}


const mapDispatchToProps = (dispatch)=>({

    handledData: (data, params)=> {

        let _params = params || {}
        let {_data, _json}=handleFetchData(data, 'normal', true,'symptom');

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

    metadataChange:(params)=>{
        dispatch(symptomEditNormalMetadata(params))
    },
    symptomNameChange:(params)=>{
        dispatch(symptomEditNormalName(params))
    },
    symptomKeyChange:(params)=>{
        dispatch(symptomEditNormalKey(params))
    },
    symptomGenderChange:(params)=>{
        dispatch(symptomEditNormalGender(params))
    },
    symptomAgeRangeChange:(params)=>{
        dispatch(symptomEditNormalAgeRange(params))
    },
    categoriesChange:(params)=>{
        dispatch(symptomEditNormalCategories(params))
    },
    deleteCategories:(idx)=>{
        dispatch(symptomEditNormalDeleteCategories(idx))
    },
    addCategories:(json)=>{
        dispatch(symptomEditNormalAddCategories(json))
    },
    addAttrs:()=>{
        dispatch(symptomEditNormalAddAttrs())
    },
    addAttrsValue:(idx)=>{
        dispatch(symptomEditNormalAddAttrsValues(idx))
    },
    removeAttrs:(idx)=>{
        dispatch(symptomEditNormalRemoveAttrs(idx))
    },
    removeAttrsValue:(attrsIdx,valIdx)=>{
        dispatch(symptomEditNormalRemoveAttrsValues(attrsIdx,valIdx))
    },
    setCommonSymptom:(params)=>{
        let json={};
        if(params.common){
            json.common=params.common
        }

        if(params.weight || params.weight==0){
            json.weight=params.weight
        }

        dispatch(symptomEditNormalSetCommon(params))
    }
    // resolveIcd10sList:(data)=>{
    //     dispatch(resolveIcd10sList(data))
    // }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);

