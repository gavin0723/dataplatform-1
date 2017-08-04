import {connect} from 'react-redux';
import MainPage from '../components/main';

import {
    mainTab,
    asideNavAction,
    editNormalInit,
    currentVersionState,
    currentDocState,
    MainReleasedCurrentPage,
    MainAllCurrentPage,
    fetchData,
    userInfo
} from '../actions'

import {handleFetchUserInfo} from './handleFetchData'

let tabCont=[
    // {name:'概况',current:'overview'},
    {name:'已发布',current:'released'},
    {name:'全部',current:'all'}
];
let editCont=[
    {name:'新建',icon:'icon-add',type:'add'},
    // {name:'归一疾病',icon:'icon-union',type:'union'}
];

const mapStateToProps = (state ) => {

    let {mainState,asideNav,userInfo}=state;
    let {isVisitor,overdue}=userInfo,
        asideNavCurrent=asideNav.current;

    // let actionArr= (isVisitor || userInfo.limit[asideNavCurrent] =='visitor')?[] : editCont;
    let actionArr= isVisitor ?[] : editCont;

    return({
        tabCont:tabCont,
        editCont:actionArr,
        userInfoOverdue:overdue,
        isVisitor:isVisitor,

        current:mainState.mainTabCurrent,
        asideNavCurrent:asideNavCurrent,
        asideNavName:asideNav.name
    })
}

const mapDispatchToProps=(dispatch)=>({
    clickMainTab:(current)=>{
        dispatch(MainReleasedCurrentPage(1));
        dispatch(MainAllCurrentPage(1));
        dispatch(mainTab(current))
    },
    asideNavAction:(current)=>{
        dispatch(asideNavAction(current))
    },
    addDocument:()=>{
        dispatch(editNormalInit());
        dispatch(currentVersionState({}))
        dispatch(currentDocState('',''))
    },
    fetchData:(params)=>{
        dispatch(fetchData(params))
    },
    handleFetchUserInfo:(data)=>{
        let json=handleFetchUserInfo(data);
        dispatch(userInfo(json))
    }

})

const Main = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

export default Main
