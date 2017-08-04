import React, {Component} from 'react';
import $ from 'jquery';
import HeadSearch from '../../containers/HeadSearch';
import Title from '../common/MainTitle';
import Tab from '../common/MainTab';

import Overview from '../../containers/main/Overview';
import Released from '../../containers/main/Released';
import All from '../../containers/main/All';


export default class Main extends Component {

    render() {

        let self=this;
        let tabCurrent=self.props.params.tabType;

        return (

            <div id='main' >
                <div className='main-cont'>
                    <HeadSearch />
                    <Title
                        source='main'
                        title={this.props.asideNavName}
                        editCont={this.props.editCont}
                        clickActionBtn={(type)=>self.clickActionBtn(type)}
                    />
                    <Tab
                         tabCont={this.props.tabCont}
                         clickTab={(current)=>this.clickTab(current)}
                         current={tabCurrent}
                    />
                    <div style={{padding: '20px 41px'}}>

                        {

                            (function(){
                                if(tabCurrent=='overview'){
                                    return <Overview/>
                                }else if(tabCurrent=='released'){
                                    return <Released />
                                }else if(tabCurrent=='all'){
                                    return <All />
                                }
                            })()
                        }
                    </div>

                </div>
            </div>
        )
    }

    clickActionBtn(type) {
        let self = this;
        let {editNormalInit,addDocument,asideNavCurrent}=self.props;
        if (type == 'add') {    //新建

            addDocument();
            self.context.router.push(`/edit/${asideNavCurrent}/normal`)

        } else if (type == 'union') {    //归一
            alert('归一')
        }
    }

    clickTab(current){
        let self=this;
        let {asideNavCurrent}=self.props;
        let tabCurrent=this.props.current;

        if(tabCurrent==current){
            return;
        }

        self.context.router.push(`/content/${asideNavCurrent}/${current}`);
        self.props.clickMainTab(current)

    }



    componentWillMount(){
        let self=this;
        self.props.asideNavAction(self.props.params.asideItem);
        self.props.clickMainTab(self.props.params.tabType);
    }

    getUserInfo(){
        let {fetchData,handleFetchUserInfo}=this.props;

        fetchData({
            url:`/_/dataplatform/user/permission/get`,
            method:'post',
            success:function(data){
                handleFetchUserInfo(data)
            }
        })
    }


    componentDidMount() {

        this.winScroll();

        let {userInfoOverdue}=this.props;
        if(userInfoOverdue){
            this.getUserInfo();
        }

    }
    componentWillUnmount(){
        $(window).off()
    }

    winScroll() {
        let $mainTab = $('#main .main-tab');
        $(window).scroll(function () {
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

Main.contextTypes={
    router:React.PropTypes.object
}
