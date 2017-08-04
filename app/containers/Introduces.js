import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    fetchData,
    asideNavAction,
    userInfo
} from '../actions'
import {handleFetchUserInfo} from "./handleFetchData";


import IntroducesPage from '../components/Introduces'

const mapStateToProps = (state) => {

    let {userInfo}=state;
    return({
        userInfoOverdue:userInfo.overdue,

    })
}

const mapDispatchToProps = (dispatch)=>({
    fetchData:(params)=>{
        dispatch(fetchData(params))
    },
    asideNavAction:(current)=>{
        dispatch(asideNavAction(current))
    },
    handleFetchUserInfo:(data)=>{
        let json=handleFetchUserInfo(data);
        dispatch(userInfo(json))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroducesPage)
