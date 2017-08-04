import React, {Component} from "react";
import {connect} from "react-redux";
import Released from '../../components/main/Released'

import {
    MainReleasedFetchReceive,
    MainReleasedFetchInvalidate
} from '../../actions'

const mapStateToProps = (state, ownProps)=> {

    let {asideNav}=state;
    return ({
        asideNavCurrent:asideNav.current
    })
}
const mapDispatchToProps=(dispatch)=>({
    fetchInvalidate:(bool)=>{
        dispatch(MainReleasedFetchInvalidate(bool))
    },
    fetchReceive:(result)=>{
        dispatch(MainReleasedFetchReceive(result))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Released);

