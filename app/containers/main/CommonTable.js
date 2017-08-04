import {connect} from "react-redux";
import {
    asideNavAction,
    currentDocState,
    fetchData,
    detailNromalFetchReceive,
    versionLogFetchReceive,
    MainReleasedFetchReceive,
    MainAllFetchReceive,
    MainReleasedCurrentPage,
    MainAllCurrentPage
} from "../../actions";
import CommonTable from "../../components/main/CommonTable";


function dataHandle(data) {
    let result = [];

    data.map(function (val, idx) {
        let time='',
            json={};

        json.name = val.content.name.name || '';
        json._id = val.id;

        if (val.metadata.basic.publishedTime && val.metadata.basic.publishedTime != "0001-01-01T00:00:00.000Z") {
            time = (new Date(val.metadata.basic.publishedTime)).toLocaleString()
        }

        json.time = time;
        result.push(json)

    });
    return result;
}

const mapStateToProps = (state, ownProps)=> {


    let {MainAllFetch,MainReleasedFetch,asideNav}=state;
    let pageSize = 10;

    let data='';
    let currentPage='';
    if(ownProps.source=="all"){
        data = MainAllFetch.data;
        currentPage=MainAllFetch.currentPage;

    }else if (ownProps.source=="released"){
        data = MainReleasedFetch.data;
        currentPage=MainReleasedFetch.currentPage;
    }

    let datalist = data.documents || [],
        count = data.count == undefined ? 1 : (Math.max(data.count, 1)),
        start = data.start || 0;

    let _data = dataHandle(datalist);

    return ({
        data: _data,
        count: count,
        start:start,
        pageSize:pageSize,

        currentPage:currentPage,
        tabCurrent:ownProps.source,
        asideNavCurrent: asideNav.current,
    })
}
const mapDispatchToProps = (dispatch, ownProps)=> {

    return ({
        clickAsideNav: (current)=> {
            dispatch(asideNavAction(current))
        },
        currentDocState: (id,name)=> {
            dispatch(currentDocState(id,name))
        },
        fetchData: (params)=> {
            dispatch(fetchData(params))
        },
        fetchReceive: (result)=> {
            ownProps.fetchReceive(result)
        },
        fetchInvalidate: (bool)=> {
            ownProps.fetchInvalidate(bool)
        },
        normalFetchReceive: (receive)=>{
            dispatch(detailNromalFetchReceive(receive))
        },
        versionLogFetchReceive:(receive)=>{
            dispatch(versionLogFetchReceive(receive))
        },
        releasedFetchReceive:(result)=>{
            dispatch(MainReleasedFetchReceive(result))
        },
        allFetchReceive:(result)=>{
            dispatch(MainAllFetchReceive(result))
        },
        allCurrentPage:(page)=>{
            dispatch(MainAllCurrentPage(page))
        },
        releasedCurrentPage:(page)=>{
            dispatch(MainReleasedCurrentPage(page))
        }
    })
}


const MainContTab = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonTable);

export default MainContTab
