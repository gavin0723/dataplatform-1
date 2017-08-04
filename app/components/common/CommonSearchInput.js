import React, {Component} from "react";
import $ from "jquery";
import "../../styles/custom/autoInput.css";
export default class SearchInputCustom extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            pullDown: false,
            value: '',
            selectVal: [],
            dropDownActive: 0,
            dataSourceLength: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultValue != nextProps.defaultValue || this.props.dataSource != nextProps.dataSource) {
            this.setState({
                selectVal:nextProps.defaultValue || [],
                dataSource:nextProps.dataSource || []
            })
        }
    }

    componentDidMount(){
        let {defaultValue,dataSource}=this.props;
        this.setState({
            selectVal:defaultValue,
            dataSource:dataSource
        })
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
        let {dataSource, pullDown, value, dropDownActive, selectVal,placeholder} = this.state;

        return (
            <div className="autoInputWrap">
                <div id="autoInput" className={this.props.className}>
                    <div className="clearfix result ">
                        <div className="fll">
                            {
                                selectVal.length>0 && selectVal.map((val, idx)=> {
                                    return (
                                        <div className="resultBtn" key={idx}>
                                            <span>{val.name}</span>
                                            <span className="cursor-p delectResult" onClick={()=>self.deleteSelect({idx})}> x </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <input className="fll"
                               ref="searchInput"
                               value={value}
                               placeholder={placeholder}
                               type="text"
                               style={{width:'240px'}}
                               onFocus={()=>self.onFocus()}
                               onBlur={()=>self.onBlur()}
                               onChange={(e)=>this.handleChange(e.target.value)}/>
                    </div>


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

    deleteSelect(idx){
        let {selectVal}=this.state,
            {deleteSelect}=this.props;
        let _selectVal=JSON.parse(JSON.stringify(selectVal));
        _selectVal.splice(idx,1);

        deleteSelect(idx);
        this.setState({
            selectVal:_selectVal
        })

    }

    clickList(val) {
        let self = this;
        let {onChange}=this.props,
            {selectVal}=this.state;

        for(let i=0;i<selectVal.length;i++){
            if(selectVal[i].id==val.id){
                return;
            }
        }

        let _selectVal = JSON.parse(JSON.stringify(selectVal)),
            len=_selectVal.length;

        for(let i=0;i<len;i++){
            if(JSON.stringify(_selectVal[i])==JSON.stringify(val)){
                return;
            }
        }

        if(val && JSON.stringify(val) != '{}'){
            _selectVal.push(val);
            self.setState({
                value: '',
                selectVal: _selectVal,
                dropDownActive: 0,
                pullDown: false,
                dataSource:[]
            });

            onChange(val)
        }
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