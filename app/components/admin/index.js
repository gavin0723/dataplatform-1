import React, {Component} from "react";
import HeadSearch from "../../containers/HeadSearch";
import Tab from "../common/MainTab";
import Table from "../../containers/admin/Table";


export default class Admin extends Component {

    render() {

        let self = this;
        require('../../styles/admin.css');

        let {pageData, totalCont, typeCount, tabCount, totalCurrent, typeCurrent, tabCurrent}=this.props;

        return (
            <div id='main' className="admin">
                <div className='main-cont'>
                    <HeadSearch />
                    <div className="admin-header clearfix">
                        <div className="fll user-img">
                            <img src={require('../../images/user_img.jpg')} alt=""/>
                        </div>

                        <div className="fll">
                            <p className="user-info">
                                <span className="user-name">Doctor</span>
                                {/*<span className="user-role">管理员</span>*/}
                            </p>
                            <ul style={{marginLeft: '18px'}} className="clearfix">
                                {
                                    totalCont.map(function (val, idx) {
                                        return (
                                            <li
                                                className={totalCurrent == val.current ? "fll total-list cursor-p active" : "fll total-list cursor-p"}
                                                key={idx}
                                                onClick={()=>self.clickTotal(val.current,val.userType)}
                                            >
                                                <p className="num">{val.num}</p>
                                                <p className="name">{val.name} ></p>
                                            </li>
                                        )
                                    })
                                }

                            </ul>

                        </div>
                        <a className="exitPlatform cursor-p" style={{display:"block"}} href="/signout" target="_self">
                            退出
                        </a>
                    </div>

                    <ul className="type clearfix">
                        {
                            typeCount.map(function (val, idx) {
                                return (
                                    <li
                                        key={idx}
                                        className={typeCurrent == val.current ? "fll cursor-p active" : "fll cursor-p"}
                                        onClick={()=>self.clickType(val.current)}
                                    >
                                        {val.name}({val.num})
                                    </li>
                                )
                            })
                        }
                        <div className="flr" style={{fontSize: '20px'}}>
                            {
                                totalCont.map((val)=>{
                                    if(totalCurrent==val.current){
                                        return (
                                            val.name+'('+val.num+')'
                                        )
                                    }
                                })
                            }
                        </div>
                    </ul>

                    <Tab
                        tabCont={tabCount}
                        clickTab={(current)=>this.clickTab(current)}
                        current={tabCurrent}
                    />
                    <div style={{padding: '20px 40px'}}>
                        <Table />
                    </div>


                </div>
            </div>
        )
    }

    exitPlatform(){
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

            document.cookie = name + "='';expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.href='';
    }
    clickTotal(current,userType) {
        let self = this;
        let {totalCurrentFunc, typeCurrentFunc, tabCurrentFunc}=this.props;
        self.context.router.push(`/content/admin/${current}/normal/audit`);

        totalCurrentFunc(current,userType)
        typeCurrentFunc('normal')
        tabCurrentFunc('audit')
    }

    clickType(current) {
        let self = this;

        let {typeCurrentFunc, tabCurrentFunc, totalCurrent}=this.props;
        self.context.router.push(`/content/admin/${totalCurrent}/${current}/audit`);

        typeCurrentFunc(current)
        tabCurrentFunc('audit')
    }

    clickTab(current) {
        let self = this;
        let {tabCurrentFunc, totalCurrent, typeCurrent}=this.props;
        self.context.router.push(`/content/admin/${totalCurrent}/${typeCurrent}/${current}`);
        tabCurrentFunc(current)
    }

    componentDidMount() {

        let self = this;
        let {asideNavAction, totalCurrentFunc, typeCurrentFunc, tabCurrentFunc, params}=this.props;


        let {userInfoOverdue}=this.props;
        if(userInfoOverdue){
            this.context.router.push(`/content/introduces`);
            return;
        }

        asideNavAction('user');

        totalCurrentFunc(params.total);
        typeCurrentFunc(params.type);
        tabCurrentFunc(params.tab);

        this.fetch(params.total);

    }

    fetch(totalCur) {
        let {fetchData, handleStatsFetch}=this.props;


        let _totalCur=totalCur?totalCur:'';

        fetchData({
            url: '/_/dataplatform/user/todo/stats',
            method: 'post',
            success: function (data) {
                handleStatsFetch(data,_totalCur)
            }
        })
    }

}

Admin.contextTypes = {
    router: React.PropTypes.object
}
