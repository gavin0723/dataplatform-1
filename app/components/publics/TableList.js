import React, {Component} from "react";
import {Pagination} from "antd";

require('../../styles/public/tableList.css');

export default class TableList extends Component {

    constructor(){
        super();
        this.state={
            sort:[]
        }
    }


    render() {

        let self = this;


        let {count, currentPage,tableName,data,clickList}=this.props;
        let pageCurrent = currentPage || 1;
        let total = count;

        let _publishedTimeUp={
            key:'publishedTime',descending:false
        }, _publishedTimeDown={
            key:'publishedTime',descending:true
        };


        return (
            <div id="public-table">
                <table width={'100%'}>
                    <thead>
                    <tr>
                        <td style={{width: '60%'}}>{tableName}</td>
                        <td className="text-align-right" style={{width: '40%',paddingRight:'40px'}}>
                            <div className="dp-inline-b" style={{marginRight:'10px'}}>发布时间</div>

                            {
                                total>0 && <div className="dp-inline-b" style={{fontSize:'12px',color:'#999'}}>
                                    <span className="icon-up cursor-p" title="升序" onClick={()=>self.sort(_publishedTimeUp)}></span>
                                    <span className="icon-down cursor-p" title="降序" onClick={()=>self.sort(_publishedTimeDown)}></span>
                                </div>
                            }


                        </td>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        (function () {

                            if (data.length > 0) {
                                return (
                                    data.map(function (val, idx) {
                                        return (
                                            <tr className="cursor-p" key={idx}
                                                onClick={()=>clickList(val.id, val.text)}>
                                                <td>{val.text}</td>
                                                <td className="text-align-right">{val.time}</td>
                                            </tr>
                                        )
                                    })
                                )

                            } else {
                                return (
                                    <tr className="cursor-p">
                                        <td className="text-align-center" colSpan="3">-- 暂无数据 --</td>
                                    </tr>
                                )
                            }
                        })()
                    }

                    </tbody>
                </table>

                <div className="flr" style={{marginBottom: '40px'}}>
                    {
                        total>0 && <Pagination
                            defaultCurrent={1}
                            current={pageCurrent}
                            total={total}
                            onChange={(page, pageSize)=>self.fetchData(page, pageSize)}
                        />
                    }

                </div>


            </div>
        )
    }


    sort(rules){

        let _sort=this.sortHandle(rules);
        this.setState({
            sort:_sort
        });

        this.fetchData();

    }

    sortHandle(rules){
        let self=this;
        let _sort=this.state.sort;
        for (let item of _sort){
            if(item.key==rules.key){
                item.descending=rules.descending;
                return _sort;
            }
        }

        _sort.push(rules);
        return _sort
    }

    componentDidMount() {
        // this.fetch()
    }

    fetch() {

        let currentPage = this.props.currentPage;
        if (currentPage) {
            this.fetchData(currentPage);
        } else {
            this.fetchData();
        }
    }

    fetchData(page, pageSize) {

        let self = this;
        let {asideNavCurrent, tabCurrent, allFetchReceive, releasedFetchReceive, allCurrentPage, releasedCurrentPage}=self.props;
        let _sortState=this.state.sort;

        let _size = pageSize || 10;
        let _start = 0;
        let _currentPage = ''

        if (page) {
            _start = page == 1 ? 0 : ((page - 1) * _size );
            _currentPage = page;
        }


        if (_start > self.props.count) {
            return;
        }

        let _sort = {};
        if(_sortState.length>0){
            _sort={
                "rules":_sortState
            }
        }

        let query = {}

        if (tabCurrent == 'all') {  //查询全部
            query = {
                "condition": {
                    "key": "removed",
                    "operator": "eq",
                    "values": ["notremoved"]
                }
            }
        } else if (tabCurrent == 'released') {  //查询已发布
            query = {
                "and": {
                    "values": [
                        {
                            "condition": {
                                "key": "published",
                                "operator": "eq",
                                "values": ["published"]
                            }
                        },
                        {
                            "condition": {
                                "key": "removed",
                                "operator": "eq",
                                "values": ["notremoved"]
                            }
                        }
                    ]
                }
            }
        }

        this.props.fetchData({
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/list`,
            method: 'POST',
            data: {
                start: _start,
                size: _size,
                query: query,
                sort: _sort,
            },
            success: function (data) {
                if (tabCurrent == 'all') {
                    allFetchReceive(data)
                    allCurrentPage(_currentPage)
                } else if (tabCurrent == 'released') {
                    releasedFetchReceive(data);
                    releasedCurrentPage(_currentPage)

                }

            }
        })
    }

}

TableList.contextTypes = {
    router: React.PropTypes.object
}


