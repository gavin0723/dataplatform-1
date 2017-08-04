import React, {Component} from "react";
import {Pagination} from "antd";

export default class MainContTable extends Component {

    constructor(){
        super();
        this.state={
            sort:[]
        }
    }

    componentWillReceiveProps(nextProps){

        if(this.props.totalCurrent != nextProps.totalCurrent || this.props.typeCurrent != nextProps.typeCurrent || this.props.tabCurrent != nextProps.tabCurrent || this.props.tabCurrent != nextProps.tabCurrent){
            this.fetchData({props:nextProps});
        }
    }


    render() {

        require('../../styles/mianContTable.css');
        let self = this;

        let {count, currentPage,tableDataList}=this.props;
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
                        <td className="text-align-right" style={{width: '40%'}}>
                            <div className="dp-inline-b" style={{marginRight:'10px'}}>上传者</div>
                            {/*<div className="dp-inline-b" style={{fontSize:'12px',color:'#999'}}>*/}
                                {/*<span className="icon-up cursor-p" title="升序" onClick={()=>self.sort(_publishedTimeUp)}></span>*/}
                                {/*<span className="icon-down cursor-p" title="降序" onClick={()=>self.sort(_publishedTimeDown)}></span>*/}
                            {/*</div>*/}

                        </td>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        (function () {
                            let data = tableDataList;

                            if (data.length > 0) {
                                return (
                                    data.map(function (val, idx) {
                                        return (
                                            <tr className="cursor-p" key={idx}
                                                onClick={()=>self.clickTableTr(val.id, val.name)}>
                                                <td>{val.name}</td>
                                                <td className="text-align-right">{val.user}</td>
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
    //
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.totalCurrent != this.props.totalCurrent || nextProps.typeCurrent != this.props.typeCurrent || nextProps.tabCurrent != this.props.tabCurrent ){
    //         this.fetchData({totalCurrent:nextProps.totalCurrent,typeCurrent:nextProps.typeCurrent});
    //     }
    // }


    fetch() {

        let {currentPage} = this.props;

        if (currentPage) {
            this.fetchData({page:currentPage});
        } else {
            this.fetchData();
        }
    }

    fetchData(params) {

        let self = this,
            _props=params && params.props?params.props : self.props;

        let { tabCurrent,fetchData,count,userType,userID,handleFetchData}=_props,
            _sortState=this.state.sort;

        let page,pageSize;
        if(params && params.page){
            page=params.page
        }
        if(params && params.pageSize){
            pageSize=params.pageSize
        }


        let _size = pageSize || 10;
        let _start = 0;
        let _currentPage = '';

        if (page) {
            _start = page == 1 ? 0 : ((page - 1) * _size );
            _currentPage = page;
        }

        if (_start > count) {
            return;
        }

        let _sort = {};
        if(_sortState.length>0){
            _sort={
                "rules":_sortState
            }
        }

        let query = {};


        if(userType=='manager'){

            if(tabCurrent=='audit'){
                query={ "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusProposed" ] } }
            }else if(tabCurrent=='modify'){
                query={  "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusEditing" ] } }
            }else if(tabCurrent=='refused'){
                query={ "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusDenied" ] } }
            }else if(tabCurrent=='publish'){
                query={  "condition": { "key": "published", "operator": "eq", "values": [ "unpublished" ] } }
            }

        }else if(userType=='editor'){
            if(tabCurrent=='audit'){
                query={  "and": { "values": [ { "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusProposed" ] } }, { "condition": { "key": "editUser", "operator": "eq", "values": [ `${userID}`] } } ] } }

            }else if(tabCurrent=='edit'){
                query={  "and": { "values": [ { "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusEditing" ] } }, { "condition": { "key": "editUser", "operator": "eq", "values": [ `${userID}` ] } } ] } }

            }else if(tabCurrent=='refused'){
                query={ "and": { "values": [ { "condition": { "key": "editState", "operator": "eq", "values": [ "AdmitStatusDenied" ] } }, { "condition": { "key": "editUser", "operator": "eq", "values": [ `${userID}` ] } } ] } }

            }
        }

        let scope=self.setScope({props:_props});


        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/list`,
            method: 'POST',
            data: {
                start: _start,
                size: _size,
                query: query,
                sort: _sort,
            },
            success: function (data) {
                handleFetchData(data,_currentPage)
            }
        })
    }

    clickTableTr(id, name) {

        let {totalCurrent,typeCurrent,currentDocState}=this.props;

        currentDocState(id, name);
        this.context.router.push(`/content/${totalCurrent}/all/${typeCurrent}?id=${id}`);

    }

    setScope(params){
        let _props=params && params.props?params.props:this.props,
            { totalCurrent, typeCurrent}=_props,
            scope = '';

        if (typeCurrent == 'normal' && totalCurrent != 'conll') {
            scope = totalCurrent

        } else if (typeCurrent == 'synonyms') {
            scope = totalCurrent + '.synonym'

        } else if (typeCurrent == 'wiki') {
            scope = totalCurrent + '.wiki'

        }else if(totalCurrent=='conll'){
            scope='conll'
        }

        return scope;
    }

}

MainContTable.contextTypes = {
    router: React.PropTypes.object
}


