import {connect} from "react-redux";
import Edit from "../../components/structured/Edit";
import {
    fetchData,
    editEncyInit,
    currentDocState,
    editFooterInit,
    commonModalState
} from "../../actions";


const mapStateToProps = (state) => {

    let {structured,asideNav,mainState,commonModal,editFooter} =state;

    return ({
        title:'数据结构化',
        vid:mainState.currentVersionID,

        asideNavCurrent:asideNav.current,

        mainType:mainState.mainTabCurrent,
        id:mainState.currentDocID,

        modalSource:commonModal.source,
        editFooter:editFooter,

        editInpVal:structured.editInpVal,
        cutResult:structured.cutResult


    })
}

const mapDispatchToProps = (dispatch)=>({
    editEncyInit:()=>{
        dispatch(editEncyInit())
    },

    fetchData:(params)=>{
        dispatch(fetchData(params))
    },
    modal:(visible,source)=>{
        dispatch(commonModalState(visible,source))
    },
    editFooterInit:()=>{
        dispatch(editFooterInit())
    },
    handleGetName:(data)=>{

        // let {_data}=handleFetchData(data,'synonyms');
        dispatch(currentDocState(_data.id,_data.name))

    }


})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);

