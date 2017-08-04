import React, {Component} from "react";

export default class StructuredDetail extends Component {

    render() {
        let titleStyles = {
            height: "47px",
            lineHeight: "47px",
            background: "#fff",
            margin: "-19px -40px 0",
            paddingLeft: "40px",
            fontWeight: "normal"
        }
        return (
            <div id='structured-detail'>

                <h4 style={titleStyles}>
                    <span style={{display: 'inline-block', borderBottom: '2px solid #41b8b0', color: '#41b8b0'}}>检查报告的结构化</span>
                </h4>
                <div className="tree">
                    <svg height="0"></svg>
                </div>

            </div>
        )
    }


    componentDidMount() {
        this.fetchVList();
        this.fetch();
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    fetchVList() {
        let self = this,
            {versionLogFetchReceive, handleVersionsList, fetchData, id} = this.props;

        fetchData({  //请求文档的版本列表
            url: `/_/dataplatform/document/repository/conll/document/${id}/version`,
            method: 'get',
            data: {},
            success: function (data) {
                versionLogFetchReceive(data);
                handleVersionsList(data);
            }
        })
    }

    draw() {

        let {cutResult}=this.props;

        d3.select('.tree svg').selectAll('text, path').remove();
        d3.select('.tree svg').attr("height", 0);
        if (cutResult != '') {
            drawTree('.tree svg', cutResult, false);
        }

    }

    fetch() {
        let self = this,
            {getFetchReceive, handledData, id}=self.props;

        self.props.fetchData({   //请求文档的详细数据
            url: `/_/dataplatform/document/repository/conll/document/${id}/get`,
            method: 'post',
            data: {"derefOptions": {"to": "DereferenceToSummary"}},
            success: function (data) {
                getFetchReceive(data);
                handledData(data, {isDoc: true});
            }
        });
    }


}
