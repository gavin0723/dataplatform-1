import React, {Component} from "react";
import {Pagination} from "antd";

export default class MainContTable extends Component {

    constructor(){
        super();
        this.state={
            sort:[],
            pageCurrent:1
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.asideNavCurrent != nextProps.asideNavCurrent){
            this.fetchData({asideNav:nextProps.asideNavCurrent});
        }
    }

    render() {

        require('../../styles/mianContTable.css');
        let self = this;


        let {count, currentPage}=this.props;
        let pageCurrent = currentPage || 1;
        let total = count;

        let _publishedTimeUp={
            key:'publishedTime',descending:false
        }, _publishedTimeDown={
            key:'publishedTime',descending:true
        };

        return (
            <div id="main-cont-table">
                <table width={'100%'}>
                    <thead>
                    <tr>
                        <td style={{width: '60%'}}>疾病名称</td>
                        <td className="text-align-right" style={{width: '40%',paddingRight:'40px'}}>
                            <div className="dp-inline-b" style={{marginRight:'10px'}}>发布时间</div>
                            <div className="dp-inline-b" style={{fontSize:'12px',color:'#999'}}>
                                <span className="icon-up cursor-p" title="升序" onClick={()=>self.sort(_publishedTimeUp)}></span>
                                <span className="icon-down cursor-p" title="降序" onClick={()=>self.sort(_publishedTimeDown)}></span>
                            </div>

                        </td>
                        {/*<td className="text-align-center" style={{width: '30%'}}>权重</td>*/}
                    </tr>
                    </thead>
                    <tbody>

                    {
                        (function () {
                            let data = self.props.data;

                            if (data.length > 0) {
                                return (
                                    data.map(function (val, idx) {
                                        return (
                                            <tr className="cursor-p" key={idx}
                                                onClick={()=>self.clickTableTr(val._id, val.name)}>
                                                <td>{val.name}</td>
                                                <td className="text-align-right">{val.time}</td>
                                                {/*<td className="text-align-center">{val.other}</td>*/}
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
                    <Pagination
                        defaultCurrent={1}
                        current={pageCurrent}
                        total={total}
                        onChange={(page, pageSize)=>self.fetchData({page, pageSize})}
                    />
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
        this.fetch()
    }

    fetch() {

        let {currentPage} = this.props,
            page;
        if (currentPage) {
            page=currentPage;
            this.fetchData({page});
        } else {
            this.fetchData();
        }
    }

    fetchData(params) {

        let self = this,
            {asideNavCurrent, tabCurrent, allFetchReceive, releasedFetchReceive, allCurrentPage, releasedCurrentPage}=self.props,
            _sortState=this.state.sort;

        let page,pageSize;
        if(params && params.page){
            page=params.page;
        }
        if(params && params.pageSize){
            pageSize=params.pageSize;
        }

        let _size = pageSize || 10,
            _start = 0,
            _currentPage = '';

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

        let scope=params && params.asideNav?params.asideNav:asideNavCurrent;

        this.props.fetchData({
            url: `/_/dataplatform/document/repository/${scope}/list`,
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
                    releasedFetchReceive(data)
                    releasedCurrentPage(_currentPage)

                }

            }
        })
    }

    clickTableTr(id, name) {

        let self = this;

        let asideNavCurrent = self.props.asideNavCurrent;
        let tabCurrent = self.props.tabCurrent;

        this.props.currentDocState(id, name);
        this.context.router.push(`/content/${asideNavCurrent}/${tabCurrent}/normal?id=${id}`);


    }

}

MainContTable.contextTypes = {
    router: React.PropTypes.object
}


