import React, {Component} from "react";
import $ from "jquery";

export default class Aside extends Component {


    render() {

        require('../../styles/aside.css');
        let self = this;
        let winH = $(window).height();

        let {isVisitor}=this.props;

        let _cls = isVisitor ? '' : ' cursor-p';

        return (
            <div id='aside' style={{height: winH}}>

                <div className='aside-cont'>
                    <div className='logo'>
                        Rxthinking
                    </div>
                    <div className={'head-portrait clearfix ' + _cls } onClick={()=>self.clickUserImg()}>
                        {/*<div className='head-portrait clearfix ' >*/}
                        <div className='head-portrait-img fll'>
                            <img src={this.props.userimg} alt='' style={{width: '40px', height: '40px'}}/>
                        </div>

                        <div className='head-portrait-name fll'>
                            <p>{this.props.username}</p>
                            <p>{this.props.userrole}</p>
                        </div>
                    </div>

                    <ul className='clearfix aside-tab'>

                        {
                            self.props.asideNavCont.map(function (val, idx) {
                                return (
                                    <li onClick={()=>self.clickList(val)}
                                        key={idx}
                                        className={self.props.current == val.current ? 'active' : ''}
                                    >
                                        <div></div>
                                        <span>{val.name}</span>
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>

            </div>
        )
    }


    clickList(val) {
        let self = this,
            {asideNavCurrent, setMainTab}=this.props,
            current = val.current,
            _url='/';


        if (current == 'introduces') {
            _url = '/content/introduces'
        } else {
            _url = `/content/${current}/all`;
        }


        self.context.router.push(_url);
        asideNavCurrent(current);
        setMainTab('overview');

    }

    clickUserImg() {

        let {isVisitor}=this.props;
        if (isVisitor) {
            return;
        }
        this.clickList('admin');
        this.context.router.push('/content/admin/disease/normal/audit')
    }

    componentDidMount() {
        this.winResize();
    }

    winResize() {
        $('#aside').css('minHeight', $('.aside-cont').height())
        $(window).resize(function () {
            $('#aside').height($(window).height());
        })
    }

}

Aside.contextTypes = {
    router: React.PropTypes.object
}
