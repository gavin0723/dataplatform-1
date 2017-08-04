import {connect} from "react-redux";
import {currentDocState, fetchData, adminTableFetch} from "../../actions";
import CommonTable from "../../components/admin/Table";
import {handleAdminTable} from "../handleFetchData";


const mapStateToProps = (state)=> {


    let {adminState,userInfo,asideNav}=state;
    let {totalCurrent, typeCurrent, tabCurrent, tableDataList, tableDataStats, currentPage}=adminState;
    let {limit ,userID}=userInfo;

    let pageSize = 10;

    let _count = 1;
    _count = tableDataStats.count ? Math.max(tableDataStats.count, _count) : _count;

    let _userType=limit[totalCurrent]

    return ({
        count: _count,
        start: 0,
        pageSize: pageSize,

        userInfoOverdue:userInfo.overdue,

        userType:_userType,
        userID,

        currentPage,
        totalCurrent,
        typeCurrent,
        tabCurrent,

        tableDataList,

    })
}
const mapDispatchToProps = (dispatch)=> {

    return ({
        currentDocState: (id, name)=> {
            dispatch(currentDocState(id, name))
        },
        fetchData: (params)=> {
            dispatch(fetchData(params))
        },

        handleFetchData: (data, currentPage)=> {

            let {list, stats} =handleAdminTable(data);

            dispatch(adminTableFetch(list, stats,currentPage))


        }
    })
}


const MainContTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonTable);

export default MainContTab

