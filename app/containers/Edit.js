import {connect} from 'react-redux';
import EditPage from '../components/edit';

import {
    asideNavAction,
    currentVersionState,
    currentDocState,
    editNormalType,
    fetchData,
    userInfo
} from '../actions'
import {handleFetchUserInfo} from './handleFetchData'


const mapStateToProps = (state) => {

    let {mainState,asideNav,userInfo}=state;
    return({
        currentDocName:mainState.currentDocName || '',
        currentDocID:mainState.currentDocID,
        asideNavCurrent:asideNav.current || '',
        userInfoOverdue:userInfo.overdue,

    })
}


const mapDispatchToProps = (dispatch)=>({
    asideNavAction:(scope)=>{
        dispatch(asideNavAction(scope))
    },
    currentVersionState:(data)=>{
        dispatch(currentVersionState(data))
    },
    currentDocState:(id,name)=>{
        dispatch(currentDocState(id,name))
    },
    editNormalType:(type)=>{
        dispatch(editNormalType(type))
    },
    fetchData:(params)=>{
        dispatch(fetchData(params))
    },
    handleFetchUserInfo:(data)=>{
        let json=handleFetchUserInfo(data);
        dispatch(userInfo(json))
    }
})

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);

export default Edit
