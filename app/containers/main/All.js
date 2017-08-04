import React, {Component} from "react";
import {connect} from "react-redux";
import All from '../../components/main/All'

import {
    MainAllFetchReceive,
    MainAllFetchInvalidate
} from '../../actions'

const mapStateToProps = (state, ownProps)=> {

    let {asideNav}=state;
    return ({
        asideNavCurrent:asideNav.current
    })
}

const mapDispatchToProps=(dispatch)=>({
    fetchInvalidate:(bool)=>{
        dispatch(MainAllFetchInvalidate(bool))
    },
    fetchReceive:(result)=>{
        dispatch(MainAllFetchReceive(result))
    }

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(All);


