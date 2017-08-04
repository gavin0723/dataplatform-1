import {connect} from 'react-redux';
import SearchPage from '../components/common/HeadSearch';

import {
    fetchData,
    asideNavAction,
    currentDocState,
    setVersionLogToggle
} from '../actions'

const mapStateToProps = (state)=>({
    asideNavCont:state.asideNav.content
})

const mapDispatchToProps = (dispatch)=>({
    fetchData:(params,show)=>{
        dispatch(fetchData(params,show))
    },
    asideNavCurrent:(current)=>{
        dispatch(asideNavAction(current))
    },
    currentDocState:(id,name)=>{
        dispatch(currentDocState(id,name))
    },
    versionLogToggle:(bool)=>{
        dispatch(setVersionLogToggle(bool))
    }

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);
