import React, {Component} from "react";

export default class Encyclopedia extends Component {
    render() {

        let {pageData}=this.props;
        return (
            <ul id='detail-encyclopedia'>
                {
                    pageData.length > 0 ? pageData.map(function (val, idx) {
                        return (
                            <List
                                key={idx}
                                title={val.title}
                                cont={val.text}
                            />
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
        this.fetchPageData();
        this.fetchVList();
    }

    fetchPageData() {
        let self=this;
        let {fetchData, asideNavCurrent, id, detailEncyFetch,currentDocName}=this.props;
        let scope = asideNavCurrent + '.' + 'wiki';

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/get`,
            method: 'post',
            data:{ "derefOptions": { "to": "DereferenceToSummary" } },
            noPromptError: true,
            success: function (data) {
                detailEncyFetch(data,{isDoc:true})
            },
            error: function (XMLHttpRequest) {
                if (XMLHttpRequest.status == 404) {
                    detailEncyFetch({},{isError:true});

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
        let scope=asideNavCurrent+'.wiki'

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


Encyclopedia.contextTypes={
    router:React.PropTypes.object
}

class List extends Component {
    render() {
        return (

            <li>
                <p className='title'>{this.props.title}</p>
                <p className='cont'>{this.props.cont}</p>
            </li>

        )
    }
}

