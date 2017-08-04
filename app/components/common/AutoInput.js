import React, {Component} from "react";
import $ from "jquery";

import '../../styles/custom/autoInput.css'

export default class AutoInput extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            pullDown: false,
            value: '',
            dropDownActive: 0,
            dataSourceLength: 0

        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props != nextProps) {
            this.setState({
                value: nextProps.value,
            })
        }

    }


    handleChange(value) {

        let self = this,
            {url}=this.props;

        self.setState({
            value: value
        });

        if (value == "") {
            self.setState({
                dataSource: [],
                pullDown: false
            });
            return;
        }

        let _data = {
            "name": value,
            "scopes": ["department"],
            "options": {
                "removed": "",
                "published": ""
            },
            "start": 0,
            "size": 5
        }


        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify(_data),
            success: function (data) {

                if (data.documents && data.documents.length > 0) {
                    self.setState({
                        dataSource: data.documents,
                        pullDown: true,
                        dataSourceLength: data.documents.length
                    })
                } else {
                    self.setState({
                        dataSource: [],
                        pullDown: false,
                        dataSourceLength: 0
                    })
                }

            }
        })
    }

    render() {
        let self = this;
        let {dataSource, pullDown, value, dropDownActive} = this.state;
        return (
            <div className="autoInputWrap">
                <div id="autoInput" className={this.props.className}>
                    <input className="ant-input"
                           ref="searchInput"
                           value={value}
                           placeholder="请输入科室"
                           type="text"
                           onFocus={()=>self.onFocus()}
                           onBlur={()=>self.onBlur()}
                           onChange={(e)=>this.handleChange(e.target.value)}/>
                    <ul style={{display: pullDown ? 'block' : 'none'}}>
                        {
                            dataSource.map(function (val, idx) {
                                return (
                                    <li key={idx}
                                        onClick={()=>self.clickList(val)}
                                        className={dropDownActive == idx ? 'active' : ''}
                                    >
                                        {val.text}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="mark" onClick={self.clickMark.bind(this)}
                     style={{display: pullDown ? 'block' : 'none'}}></div>
            </div>

        );
    }

    clickList(val) {
        let self = this;
        let {onChange}=this.props;

        self.setState({
            value: val.text,
            dropDownActive: 0,
            pullDown: false
        });

        onChange(val)
    }

    clickMark() {
        this.setState({
            pullDown: false,
            dropDownActive: 0
        })
    }

    onFocus() {
        this.handleKeyUp();
    }

    onBlur() {
        $(document).off();
    }

    handleKeyUp() {

        let self = this;

        $(document).on('keyup', function (e) {

            let {dataSourceLength, dataSource}=self.state;
            let _idx = self.state.dropDownActive;

            if (e.keyCode == 40) { //下
                _idx++;
                if (_idx > dataSourceLength - 1) {
                    _idx = 0;
                }
                self.setState({
                    dropDownActive: _idx
                })

            } else if (e.keyCode == 38) { // 上
                _idx--;
                if (_idx < 0) {
                    _idx = dataSourceLength - 1;
                }
                self.setState({
                    dropDownActive: _idx
                })

            } else if (e.keyCode == 13) {

                let val = dataSource[_idx];
                self.clickList(val);

            }
        })
    }


}