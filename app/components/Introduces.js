import React,{Component} from 'react';
import $ from 'jquery'

import Search from '../containers/HeadSearch'

export default class Introduces extends Component{

    render(){

        require('../styles/Introduces.css')
        return(
            <div id="search-global">
                <Search/>
            </div>
        )
    }

    componentDidMount(){
        this.props.asideNavAction('introduces');
        let {userInfoOverdue}=this.props;
        if(userInfoOverdue){
            this.getUserInfo();
        }

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




}
