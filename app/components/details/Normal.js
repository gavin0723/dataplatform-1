import React, {Component} from "react";

export default class Normal extends Component {

    render() {
        let {data,icd10Str}=this.props;

        return (
            <ul id='detail-normal'>


                <li>
                    <p className="title">基本信息</p>
                    <div className="cont">
                        {/*<p>*/}
                        {/*<span>ID：</span>*/}
                        {/*<span>{data.id}</span>*/}
                        {/*</p>*/}
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
                            <span>{data.genderCont}</span>
                        </p>
                        <p>
                            <span>年龄段：</span>
                            <span>{data.ageRangeCont}</span>
                        </p>
                    </div>
                </li>

                <li>
                    <p className="title">疾病信息</p>
                    <div className="cont">
                        <p>
                            <span>处置科室：</span>
                            <span>{
                                data.departmentArr && data.departmentArr.map(val=>{
                                    return val.name+' , '
                                })
                            }</span>
                        </p>
                        <p>
                            <span>ICD10：</span>
                            <span>{icd10Str}</span>
                        </p>
                    </div>
                </li>

            </ul>
        )
    }

    componentDidMount() {
        let id = this.props.id;
        this.fetch(id);
        this.fetchVList(id);
        this.fetchIcd10();
    }

    // componentWillReceiveProps(nextProps) {
    //     let _id = nextProps.id;
    //     if (this.props.id != _id) {
    //         this.fetch(nextProps.id);
    //         this.fetchVList(_id)
    //
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
                handledData(data, {isDoc: true});

                if(data.content && data.content.departments && data.content.departments.length>0){
                    for(let i=0;i<data.content.departments.length;i++){
                        self.fetchDepartment(data,data.content.departments[i]);
                    }
                }

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

    // 请求科室数据
    fetchDepartment(id){

        let self=this;
        let {fetchData,handleDepartment}=this.props;
        fetchData({
            noPromptError:true,
            url: `/_/dataplatform/document/repository/department/document/${id}/get`,
            method:'post',
            success:function (data) {
                if(data && data.content && data.content.name && data.content.name.name){
                    handleDepartment({name:data.content.name.name,id:id})
                }

            }
        });

    }

    fetchIcd10(){

        let self=this;
        let {fetchData,resolveIcd10sList}=this.props;

        fetchData({
            noPromptError:true,
            url: `/_/dataplatform/entity/icd10system`,
            method:'get',
            success:function (data) {

                if(data.systems && data.systems.length>0){
                    resolveIcd10sList(data.systems);
                }

            }
        });


    }


}
