import React from "react";
import {connect} from "react-redux";
import AdminPage from "../components/admin";
import {
    asideNavAction,
    adminTabCurrent,
    adminTotalCurrent,
    adminTypeCurrent,
    fetchData,
    adminStatsFetch
} from "../actions";
import {handleAdminStats} from './handleFetchData'

const mapStateToProps=(state)=>{


    let {adminState,userInfo}=state;
    let {pageData, totalCurrent, typeCurrent, tabCurrent,stats,clsStats,tableData,currentPage}=adminState;

    return ({
        totalCont: stats,
        tabCount: clsStats[totalCurrent]?clsStats[totalCurrent].tabCount:[],
        typeCount: clsStats[totalCurrent]?clsStats[totalCurrent].typeCount:[],

        pageData: [],
        totalCurrent,
        typeCurrent,
        tabCurrent,

        tableData,
        currentPage,

        userInfoOverdue:userInfo.overdue,

    })
}


const mapDispatchToProps = (dispatch)=>({

    asideNavAction: (current)=> {
        dispatch(asideNavAction(current))
    },
    tabCurrentFunc: (current)=> {
        dispatch(adminTabCurrent(current))
    },
    totalCurrentFunc: (current,userType)=> {
        dispatch(adminTotalCurrent(current,userType))
    },
    typeCurrentFunc: (current)=> {
        dispatch(adminTypeCurrent(current))
    },
    fetchData: (params)=> {
        dispatch(fetchData(params));
    },
    handleStatsFetch:(data,totalCur)=>{
        let {stats,clsStats}=handleAdminStats(data);
        let userID=data.userID || '';
        dispatch(adminStatsFetch(stats,clsStats));

        if(totalCur){
            for(let i=0;i<stats.length;i++){
                if(stats[i].current==totalCur){
                    dispatch(adminTotalCurrent(totalCur,stats[i].userType,userID));
                    return;
                }
            }
        }else{
            dispatch(adminTotalCurrent(stats[0].current,stats[0].userType,userID));
        }
    }


})

const Admin = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPage);

export default Admin
