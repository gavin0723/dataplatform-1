import {connect} from "react-redux";
import EditCont from "../../components/structured/EditCont";
import {
    structuredEditInpValChange,
    structuredEditCutResultChange
} from "../../actions";


const mapStateToProps = (state) => {

    let {editInpVal,cutResult}=state.structured;


    return ({
        inpVal:editInpVal,
        cutResult:cutResult
    })
}

const mapDispatchToProps = (dispatch)=>({
    inpChange:(val)=>{
        dispatch(structuredEditInpValChange(val))
    },
    cutResultChange:(val)=>{
        dispatch(structuredEditCutResultChange(val))
    }

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCont);

