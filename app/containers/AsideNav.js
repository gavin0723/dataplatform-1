import { connect } from 'react-redux'
import {  asideNavAction,mainTab } from '../actions'

import Aside from '../components/aside'

const mapStateToProps=(state)=>{

    let {asideNav,userInfo}=state;
    let asideNavCurrent=asideNav.current
    return ({
        asideNavCont:asideNav.content,
        current:asideNavCurrent,

        isVisitor:userInfo.isVisitor
    })
}

const mapDispatchToProps=(dispatch)=>({
    asideNavCurrent:(current)=>{
        dispatch(asideNavAction(current))
    },
    setMainTab:(current)=>{
        dispatch(mainTab(current))
    }

})

const AsideNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(Aside);

export default AsideNav


