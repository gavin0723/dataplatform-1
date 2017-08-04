import React, {Component} from 'react';
import MainContProgress from './MainContProgress'

export default class MainTabOverview extends Component {

    render() {
        let self=this;
        require('../../styles/mainOverview.css');

        let {count,pageData}=this.props;
        return (
            <div className='main-tab-overview'>
                <p>平台共建立<span>{count}</span>份标准疾病词</p>
                <h4>各医院疾病归一进展一览表</h4>

                <div className='progress-wrap clearfix'>
                    {
                        pageData && pageData.length>0 && pageData.map(function(val,idx) {
                            return (
                                <MainContProgress
                                    key={idx}
                                    idx={idx}
                                    {...val}
                                />
                            )
                        })
                    }
                </div>




            </div>
        )
    }


    componentDidMount(){
        this.fetchCount()
    }

    fetchCount(){
        let {asideNavCurrent,fetchData,docCount}=this.props;

        console.log(this.props)

        fetchData({
            url:`/_/dataplatform/document/repository/${asideNavCurrent}/count`,
            method:'post',
            success:function (data) {
                docCount(data)
            }
        })

    }
}
