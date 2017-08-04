import {connect} from 'react-redux';
import FooterPage from '../../components/edit/CommonFooter';

import {
    editFooterApprove,
    editFooterSetcurrent,
    editFooterCommit,
    editSetcurrentState
} from '../../actions'

const mapStateToProps = (state ,ownProps) => {

    let {editFooter,userInfo,asideNav}=state;
    let {approveDisabled,setCurrentDisabled,commitValue}=editFooter;


    return ({
        value:commitValue,
        approveDisabled:  userInfo.limit[asideNav.current]=='manager' ? false:true,
        setCurrentDisabled:setCurrentDisabled
    })
}

const mapDispatchToProps=(dispatch,ownProps)=>({

    approve:(value)=>{
        dispatch(editSetcurrentState(!value));
        dispatch(editFooterApprove(value));
    },
    setCurrent:(value)=>{
        dispatch(editFooterSetcurrent(value))
    },
    commit:(value)=>{
        dispatch(editFooterCommit(value))
    }

})

const Footer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterPage);

export default Footer
