import React, {Component} from "react";
import $ from "jquery";
import HeadSearch from "../../containers/HeadSearch";
import Title from "../common/MainTitle";
import Tab from "../common/MainTab";
import Normal from "../../containers/detail/Normal";
import Encyclopedia from "../../containers/detail/Ency";
import Synonyms from "../../containers/detail/Synonyms";
import VersionControl from "../../containers/VersionControl";
import Modal from "../../containers/Modal";
import StructuredDetail from "../../containers/structured/Detail";
import SynonymDetail from '../../containers/symptom/DetailNormal';
import LabitemDetail from '../../containers/labitem/DetailNormal'


export default class Detail extends Component {

    constructor() {
        super();
        this.state = {
            pullDownShow: false
        }
    }

    render() {

        let self = this;
        let current = self.props.params.tabType;

        let {modalSource, mainW, publishState, allowPublish, title, editCont, editPullDownCont, tabCont, id, userLimit, asideNavCurrent}=this.props;

        return (
            <div>

                <div id='main' style={{width: mainW}}>
                    <div className='main-cont'>
                        <HeadSearch />
                        <Title
                            source="detail"
                            publishState={publishState}

                            allowPublish={allowPublish}
                            title={title}
                            editCont={editCont}

                            editPullDown={editPullDownCont}
                            pullDownToggle={this.state.pullDownShow}

                            clickActionBtn={(type, current)=>self.clickActionBtn(type, current)}
                            clickPullDown={(type)=>self.clickPullDown(type)}
                            clickMark={()=>self.clickMark()}
                        />
                        {
                            asideNavCurrent != 'conll' && <Tab
                                tabCont={tabCont}
                                clickTab={(current)=>this.clickTab(current)}
                                current={current}
                            />
                        }


                        <div style={{padding: '20px 41px'}}>

                            {

                                (function () {
                                    if (current == 'normal') {

                                        if (asideNavCurrent == 'conll') {
                                            return <StructuredDetail />
                                        }else if(asideNavCurrent=='disease'){
                                            return <Normal/>
                                        }else if(asideNavCurrent=='symptom'){
                                            return <SynonymDetail/>
                                        }else if(asideNavCurrent=='labitem'){
                                            return <LabitemDetail/>
                                        }

                                    } else if (current == 'wiki') {
                                        return <Encyclopedia
                                            id={id}
                                        />
                                    } else if (current == 'synonyms') {
                                        return <Synonyms
                                            id={id}
                                        />
                                    }
                                })()

                            }
                        </div>

                    </div>
                </div>

                {
                    userLimit != 'visitor' && <VersionControl />
                }


                <div>
                    <Modal
                        title={'提示'}
                        source={modalSource}
                        hasCancel={modalSource == "detailTitleDelete" ? true : false}
                        bodyCont={self.detailModalContFunc.bind(self)}
                        handleOk={self.detailModalHandleOk.bind(self)}
                    />
                </div>


            </div>

        )
    }

    detailModalContFunc() {

        let {modalSource}=this.props;

        if (modalSource == 'detailTitleDelete') {
            return '确认删除？'
        } else if (modalSource == 'detailTitleReleaseSuccess') {
            return '发布成功！'
        } else {
            return '操作成功'

        }
    }

    detailModalHandleOk() {
        let self = this;
        let {modalSource, modal}=this.props;
        if (modalSource == 'detailTitleDelete') {
            self.delete()
        } else {
            modal(false, '')
        }
    }

    clickActionBtn(type, current) {
        let self = this;
        let pullDownShow = this.state.pullDownShow;

        let {asideNavCurrent, id, vid}=this.props;

        if (type == 'edit') {    //编辑

            this.context.router.push(`/edit/${asideNavCurrent}/${self.props.current}?scope=${asideNavCurrent}&id=${id}&vid=${vid}`);


        } else if (type == 'more') {    //更多

            self.setState({
                pullDownShow: !pullDownShow
            })

        }
    }

    clickPullDown(type) {
        let self = this;
        let {allowPublish, publishState, asideNavCurrent, current}=this.props;


        let scope = '';
        if (current == 'normal') {
            scope = asideNavCurrent
        } else if (current == 'wiki') {
            scope = asideNavCurrent + '.wiki'
        } else if (current == 'synonyms') {
            scope = asideNavCurrent + '.synonym'
        }

        if (type == 'release') {    //发布

            if (allowPublish) {  //已发布
                return;
            }
            self.publish(scope)

        } else if (type == 'delete') {    //删除
            self.props.modal(true, 'detailTitleDelete');

        } else if (type == 'unpublish') {

            if (!publishState) {
                return;
            }
            self.unpublish(scope)
        }
    }

    clickMark() {
        this.setState({
            pullDownShow: false
        })
    }

    publish(scope) {
        let self = this;
        let {id, fetchData}=this.props;

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/publish`,
            method: 'post',
            success: function (data) {

                self.props.modal(true, 'detailTitleReleaseSuccess');
                self.fetch(scope);
                self.setState({
                    pullDownShow: false
                })

            }
        })
    }

    unpublish(scope) {
        let self = this;
        let {id, fetchData}=this.props;

        fetchData({
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/unpublish`,
            method: 'post',
            success: function (data) {

                self.props.modal(true, 'detailTitleUnpublishSuccess');
                self.fetch(scope);
                self.setState({
                    pullDownShow: false
                })

            }
        })
    }

    delete() {
        let self = this;
        let {asideNavCurrent, id, mainTabCurrent}=this.props;

        self.props.fetchData({
            url: `/_/dataplatform/document/repository/${asideNavCurrent}/document/${id}`,
            method: 'DELETE',
            data: {
                comment: ''
            },
            success: function (data) {

                self.context.router.push(`/content/${asideNavCurrent}/${mainTabCurrent}`)

            }
        })
    }

    fetch(scope) {
        let self = this,
            {asideNavCurrent, id, normalFetchReceive, handledData, fetchData, mainTabCurrent}=self.props;

        fetchData({   //请求文档的详细数据
            url: `/_/dataplatform/document/repository/${scope}/document/${id}/get`,
            method: 'post',
            success: function (data) {
                normalFetchReceive(data);
                handledData(data, {isDoc: true,asideNav:asideNavCurrent});
            }
        });
    }


    clickTab(current) {
        let self = this;
        let id = self.props.location.query.id;

        let tabCurrent = this.props.current;
        if (current == tabCurrent) {
            return;
        }

        self.context.router.push(`/content/${self.props.asideNavCurrent}/${self.props.mainTabCurrent}/${current}?id=${id}`)
        self.props.clickDetailTab(current);
        self.props.setVersionLogToggle(true);

        self.setState({
            pullDownShow: false
        })
    }

    componentWillMount() {
        let self = this;

        let {clickDetailTab, asideNavAction, mainTab, currentDocState, title, id}=this.props;
        let {asideItem, mainType, tabType}=self.props.params;
        let query_id = self.props.location.query.id;

        let _id = id || query_id;

        asideNavAction(asideItem);
        mainTab(mainType);
        clickDetailTab(tabType);
        currentDocState(_id, title);
    }


    getUserInfo() {
        let {fetchData, handleFetchUserInfo}=this.props;

        fetchData({
            url: `/_/dataplatform/user/permission/get`,
            method: 'post',
            success: function (data) {
                handleFetchUserInfo(data)
            }
        })
    }

    componentDidMount() {

        let self = this;
        this.props.setVersionLogToggle(true);

        this.setMainW();
        this.winResize();
        this.winScroll();

        let {userInfoOverdue}=this.props;
        if (userInfoOverdue) {
            this.getUserInfo();
        }

    }

    componentWillUnmount() {
        $(window).off();
    }

    setMainW() {
        let {versionLogToggle, userLimit}=this.props;
        let mainW = versionLogToggle && userLimit != 'visitor' ? ($(window).width() - 220 - 261) : ($(window).width() - 220);
        $('#main').css('width', mainW)
    }


    winResize() {
        let self = this;
        $(window).on('resize', function () {
            self.setMainW();
        })
    }

    winScroll() {
        let $mainTab = $('#main .main-tab');
        $(window).on('scroll', function () {
            if ($(document).scrollTop() >= 117) {
                $mainTab.css({
                    'width': '100%',
                    'position': 'fixed',
                    'top': '0',
                    'z-index': '100',
                    'box-shadow': ' 0 0 12px 0 rgba(0,0,0,0.1)'

                })
            } else {
                $mainTab.css({
                    'position': 'static',
                    'top': 'auto',
                    'box-shadow': 'none'
                })
            }
        })
    }
}

Detail.contextTypes = {
    router: React.PropTypes.object
}
