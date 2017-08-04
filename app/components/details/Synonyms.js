import React, {Component} from "react";

export default class Synonyms extends Component {
    render() {

        let {_data}=this.props;
        return (
            <ul id='detail-synonyms'>
                {
                    _data.length > 0 ? _data.map(function (val, idx) {
                        return (
                            <li key={idx} className="detail-synonyms-list">
                                {val.name}
                                {/*{*/}
                                    {/*val.tag && val.tag.map(function (val, idx) {*/}
                                        {/*return (*/}
                                            {/*<span key={idx}>*/}
                                                {/*{val}*/}
                                            {/*</span>*/}
                                        {/*)*/}
                                    {/*})*/}
                                {/*}*/}
                            </li>
                        )
                    }) : <h2>暂无内容</h2>
                }
            </ul>
        )
    }

    componentWillMount(){
        this.props.currentDocPublishedInit();
    }

    componentDidMount() {
        this.fetchPageData()
        this.fetchVList()
    }

    fetchPageData() {

        let self=this;
        let {fetchData, asideNavCurrent, id, detailSynonymsFetch,currentDocName}=this.props;
        let scope = asideNavCurrent + '.' + 'synonym';

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/get`,
            method: 'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            noPromptError: true,
            success: function (data) {
                detailSynonymsFetch(data,{isDoc:true})
            },
            error: function (XMLHttpRequest) {
                if (XMLHttpRequest.status == 404) {
                    detailSynonymsFetch({},{isError:true})

                    if(!currentDocName){
                        self.fetchGetName(id)
                    }
                }
            },


        })
    }

    fetchVList() {
        let self = this,
            {asideNavCurrent,versionLogFetchReceive,handleVersionsList,id} = this.props;
        let scope=asideNavCurrent+'.synonym'

        self.props.fetchData({  //请求文档的版本列表
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/version`,
            method: 'get',
            data: {},
            success: function (data) {
                versionLogFetchReceive(data);
                handleVersionsList(data);
            },
            error:function (XMLHttpRequest) {
                if (XMLHttpRequest.status == 404) {
                    versionLogFetchReceive({});
                    handleVersionsList({});
                }
            },
            noPromptError:true

        })
    }


    fetchGetName(id){
        let self=this,
            {asideNavCurrent,handleGetName}=self.props;

        self.props.fetchData({   //请求文档的详细数据
            url:`/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}/get`,
            method: 'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            success: function (data) {
                handleGetName(data)
            }
        });
    }

}
