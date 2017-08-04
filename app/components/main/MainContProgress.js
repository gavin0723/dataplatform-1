import React, {Component} from "react";
import $ from "jquery";
import {Progress} from "antd";

export default class MainContProgress extends Component {

    render() {
        return (
            <div className='main-cont-progress' id={'progress' + this.props.idx}>

                <ul className='circle-style clearfix'>
                    <li className='fll'>
                        <span></span>
                        <span>已标注</span>
                    </li>
                    <li className='flr'>
                        <span></span>
                        <span>未标注</span>
                    </li>
                </ul>
                <div className='circle-wrap'>
                    <Progress type='circle' format={() => null} percent={Number(this.props.progress)} width={'100%'}
                              style={{width: '100%', padding: '0 15%'}}/>
                    <div className='number'>
                        <p className='num'>{this.props.num}</p>
                        <p className='name'>{this.props.name}</p>
                    </div>
                </div>

                <div className='source'>
                    {this.props.source}
                </div>

                <div className='hover-box'>
                    <p>已完成归一</p>
                    <p><span>{this.props.progress}</span>%,共<span>{this.props.total}</span>个疾病</p>
                </div>

            </div>
        )
    }

    componentDidMount() {
        this.boxHover();
        this.setProgressW();
        this.winResize();

    }


    winResize() {
        let self=this;
        $(window).resize(function () {
            self.setProgressW()
        })

    }

    setProgressW(){
        let $wrap = $('.progress-wrap');
        let $cont = $('.main-cont-progress');
        let $wrap_W = parseInt($wrap.width());
        let $cont_W = parseInt($cont.width());

        let _w = parseInt($('.main-cont-progress').css('min-width'));
        let $cont_W_m = $cont_W + 40;  //marigin-right：40px

        if ($wrap_W % (_w+40) > 0) {
            $cont.css('width', $wrap_W / Math.floor($wrap_W / (_w+40)) - 40);
        }
    }


    //HOVER
    boxHover() {
        let self = this;
        let $progress = $('#progress' + self.props.idx);
        $progress.hover(function () {
            let $that = $(this),
                $objX = $that.offset().left,
                $objY = $that.offset().top;
            $(document).mousemove(function (e) {
                let _mouseX = e.pageX,
                    _mouseY = e.pageY;

                $that.find('.hover-box').css({
                    'display': 'block',
                    'left': _mouseX - $objX + 10,
                    'top': _mouseY - $objY + 20
                });
            })
        }, function () {
            $(document).off('mousemove');
            $('.hover-box').hide();
        })
    }
}

