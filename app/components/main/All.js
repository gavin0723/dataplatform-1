import React, {Component} from "react";
import Table from "../../containers/main/CommonTable";


export default class All extends Component {
    render() {
        let {fetchInvalidate,fetchReceive,asideNavCurrent}=this.props;
        return (
            <div className='main-tab-overview'>
                <Table source="all"
                       fetchInvalidate={fetchInvalidate}
                       fetchReceive={fetchReceive}
                />
            </div>
        )
    }
}