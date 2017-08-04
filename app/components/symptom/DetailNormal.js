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
                        {
                            data.commonSymptom && <div>

                                <p>
                                    <span>是否属常见症状：</span>
                                    <span>{data.commonSymptom.common?'是':'否'}</span>
                                </p>
                                {
                                    data.commonSymptom.common && <p>
                                        <span>权重(常见症状)：</span>
                                        <span>{data.commonSymptom.weight}</span>
                                    </p>
                                }

                            </div>
                        }
                    </div>
                </li>

                {
                    self._renderCategories()
                }

                {
                    self._renderSymptomAttrs()
                }

            </ul>
        )
    }

    _renderCategories(){
        let self=this,
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

    _renderCategoriesList(){
        let {categories}=this.props.data;
        return (
            categories && categories.map((val,idx)=>{
                return (
                    <div className="cont" key={idx}>
                        <p>
                            <span>{val.series} : </span>
                            <span>{val.name}</span>
                        </p>
                    </div>
                )
            })
        )
    }

    _renderSymptomAttrs() {
        let self = this;
        let {data}=this.props,
            symptomAttrsList=data.symptomAttrsList;

        return (
            <li className="symptomAttrs">
                <p className="title">属性</p>
                <Tabs
                    defaultActiveKey="0"
                    tabPosition={'top'}
                >
                    {
                        symptomAttrsList && symptomAttrsList.length > 0 && symptomAttrsList.map((val, idx)=> {
                            return (
                                self._renderSymptomAttrsLi(val, idx)
                            )
                        })
                    }

                </Tabs>
            </li>
        )
    }

    _renderSymptomAttrsLi(val, idx) {
        return (
            <TabPane tab={val.name} key={idx}>
                <p><span>名称：</span><span>{val.name}</span></p>
                <p><span>key：</span><span>{val.key}</span></p>
                <p><span>约束：</span><span>{val.constraintStr || '无'}</span></p>
                <p><span>排序：</span><span>{val.metadataStr}</span></p>

                <Tabs
                    defaultActiveKey="0"
                    tabPosition={'top'}
                    style={{background: "#fafafa", padding: "5px 10px 10px", marginTop: '10px'}}
                >
                    {
                        val.values.map((item, index)=> {
                            return (
                                <TabPane tab={item.name} key={index}>
                                    <p><span>名称：</span><span>{item.name}</span></p>
                                    <p><span>key：</span><span>{item.key}</span></p>
                                    <p><span>约束：</span><span>{item.constraintStr || '无'}</span></p>
                                    <p><span>排序：</span><span>{item.metadataStr}</span></p>
                                </TabPane>
                            )
                        })
                    }

                </Tabs>

            </TabPane>
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
