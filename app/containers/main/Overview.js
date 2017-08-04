import {connect} from 'react-redux';

import OverviewPage from '../../components/main/Overview';

import {
    fetchData,
    overviewFetchReceive,
    docCount
} from '../../actions'

const mapStateToProps = (state) => {

    let {asideNav,mainState}=state;
    return({
        pageData: [],
        asideNavCurrent:asideNav.current,
        count:mainState.docCount
    })
}

const mapDispatchToProps=(dispatch)=>({

    fetchReceive:(result)=>{
        dispatch(overviewFetchReceive(result))
    },
    docCount:(data)=>{
        let count=data.count;
        dispatch(docCount(count))
    },
    fetchData:(params)=>{
        dispatch(fetchData(params))
    }

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewPage);

