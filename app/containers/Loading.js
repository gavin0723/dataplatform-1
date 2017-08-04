import {connect} from 'react-redux';
import Loading from '../components/common/Loading'


const mapStateToProps = (state)=>{

    return ({
        isShow:state.commonLoading.isShow
    })
}


export default connect(
    mapStateToProps
)(Loading);
