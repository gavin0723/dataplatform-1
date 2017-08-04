import React, {Component} from "react";
import {Tabs} from "antd";
const TabPane = Tabs.TabPane;

export default class Normal extends Component {

    render() {
        let self = this;
        let {data}=this.props;

        return (
            <ul id='detail-normal'>


                <li>
                    <p className="title">基本信息</p>
                    <div className="cont">

                        <p>
                            <span>标准名：</span>
                            <span>{data.name}</span>
                        </p>
                        <p>
                            <span>友好名称：</span>
                            <span>{data.friendlyName}</span>
                        </p>
                        <p>
                            <span>缩写名称：</span>
                            <span>{data.shortName}</span>
                        </p>
                    </div>
                </li>

                <li>
                    <p className="title">约束条件</p>
                    <div className="cont">
                        <p>
                            <span>性别：</span>
                            <span>{data.genderCont || '不限'}</span>
                        </p>
                        <p>
                            <span>年龄段：</span>
                            <span>{data.ageRangeCont || '不限'}</span>
                        </p>
                    </div>
                </li>

                <li>
                    <p className="title">元数据</p>
                    <div className="cont">
                        <p>
                            <span>排序：</span>
                            <span>{data.weight || ''}</span>
                        </p>
                    </div>
                </li>

                {/*{*/}
                    {/*分类*/}
                    {/*self._renderCategories()*/}
                {/*}*/}

                <li>
                    <p className="title">属性</p>
                    <div className="cont">
                        <p>
                            <span>常见套餐：</span>
                            <span>{data.labitemSet || ''}</span>
                        </p>
                        <p>
                            <span>样本名称：</span>
                            <span>{data.labitemSpecimen || ''}</span>
                        </p>
                        <p>
                            <span>正常范围上界：</span>
                            <span>{data.labitemHigherNormal || ''}</span>
                        </p>
                        <p>
                            <span>正常范围下界：</span>
                            <span>{data.labitemLowerNormal || ''}</span>
                        </p>
                        <p>
                            <span>标准单位：</span>
                            <span>{data.labitemUnit || ''}</span>
                        </p>

                    </div>

                </li>


            </ul>
        )
    }

    _renderCategories() {
        let self = this,
            {categories}=this.props.data;
        return (
            <li>
                <p className="title">分类</p>
                {
                    self._renderCategoriesList()
                }

            </li>
        )
    }

    _renderCategoriesList() {
        let {categories}=this.props.data;
        return (
            categories && categories.map((val, idx)=> {
                return (
                    <div className="cont" key={idx}>
                        <p>
                            <span>{val.name} : </span>
                            <span>{val.value}</span>
                        </p>
                    </div>
                )
            })
        )
    }


    componentDidMount() {
        let {id}= this.props;
        this.fetch(id);
        this.fetchVList(id);

    }

    // componentWillReceiveProps(nextProps) {
    //     let _id = nextProps.id;
    //     if (this.props.id != _id) {
    //         this.fetch(nextProps.id);
    //         this.fetchVList(_id)
    //     }
    // }

    fetch(id) {
        let self = this,
            {asideNavCurrent, normalFetchReceive, handledData}=self.props;

        self.props.fetchData({   //请求文档的详细数据
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}/get`,
            method: 'post',
            data: {"derefOptions": {"to": "DereferenceToSummary"}},
            success: function (data) {
                normalFetchReceive(data);
                handledData(data, {isDoc: true, asideNav: asideNavCurrent});
            }
        });
    }

    fetchVList(id) {

        let self = this,
            {asideNavCurrent, versionLogFetchReceive, handleVersionsList} = this.props;

        self.props.fetchData({  //请求文档的版本列表
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}/version`,
            method: 'get',
            data: {},
            success: function (data) {
                versionLogFetchReceive(data);
                handleVersionsList(data);
            }

        })
    }


}
