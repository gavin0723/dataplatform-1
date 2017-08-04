import React, {Component} from 'react';
import {connect} from 'react-redux';

import ModalPage from '../components/common/Modal'

import {
    commonModalState
} from '../actions'

const mapStateToProps = (state,ownProps)=>{

    return ({
        visible:state.commonModal.visible,
        title:ownProps.title,
        hasCancel:ownProps.hasCancel

    })
}
const mapDispatchToProps=(dispatch,ownProps)=>({
    handleFunc:(type)=>{
        if(type=='ok'){
            ownProps.handleOk()
        }
        dispatch(commonModalState(false,ownProps.source))
    },
    bodyCont:()=>ownProps.bodyCont()

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPage);
