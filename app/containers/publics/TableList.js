import {connect} from "react-redux";
import {
    currentDocState,
    // fetchData,
    // detailNromalFetchReceive,
    // versionLogFetchReceive,
    // MainReleasedFetchReceive,
    // MainAllFetchReceive,
    // MainReleasedCurrentPage,
    // MainAllCurrentPage
} from "../../actions";

import TableList from "../../components/publics/TableList";

//
// function dataHandle(data) {
//     let result = [];
//
//     data.map(function (val, idx) {
//         let time='',
//             json={};
//
//         json.name = val.content.name.name || '';
//         json._id = val.id;
//
//         if (val.metadata.basic.publishedTime && val.metadata.basic.publishedTime != "0001-01-01T00:00:00.000Z") {
//             time = (new Date(val.metadata.basic.publishedTime)).toLocaleString()
//         }
//
//         json.time = time;
//         result.push(json)
//
//     });
//     return result;
// }

const mapStateToProps = (state, ownProps)=> {

    let {asideNav,pubTableList}=state,
        {data,count,start,pageSize,currentPage}=pubTableList;

    return ({
        data: data,
        count: count,
        start:start,
        pageSize:pageSize,
        currentPage:currentPage,

        tableName:ownProps.tableName,
        tabCurrent:ownProps.tabCurrent,

        asideNavCurrent: asideNav.current,
    })
}
const mapDispatchToProps = (dispatch, ownProps)=> {

    return ({

        currentDocState: (id,name)=> {
            dispatch(currentDocState(id,name))
        },
        // fetchData: (params)=> {
        //     dispatch(fetchData(params))
        // },
        // fetchReceive: (result)=> {
        //     ownProps.fetchReceive(result)
        // },
        // fetchInvalidate: (bool)=> {
        //     ownProps.fetchInvalidate(bool)
        // },
        // normalFetchReceive: (receive)=>{
        //     dispatch(detailNromalFetchReceive(receive))
        // },
        // versionLogFetchReceive:(receive)=>{
        //     dispatch(versionLogFetchReceive(receive))
        // },
        // releasedFetchReceive:(result)=>{
        //     dispatch(MainReleasedFetchReceive(result))
        // },
        // allFetchReceive:(result)=>{
        //     dispatch(MainAllFetchReceive(result))
        // },
        // allCurrentPage:(page)=>{
        //     dispatch(MainAllCurrentPage(page))
        // },
        // releasedCurrentPage:(page)=>{
        //     dispatch(MainReleasedCurrentPage(page))
        // }
    })
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableList);

