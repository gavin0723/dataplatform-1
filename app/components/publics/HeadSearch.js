import React, {Component} from "react";
import $ from "jquery";

import "../../styles/public/headerSearch.css"

export default class HeadSearch extends Component {

    constructor() {
        super();
        this.state = {
            dropDown: false,
            value: "",
            results: [],
            resultsLength:0,
            dropDownActive: 0,
        };
        this.timer = null;
        this.firstTime = true;
    }

    render() {
        let self = this;
        let {asideNavCont}=this.props;

        let {results, dropDown, value, dropDownActive}=this.state;

        return (
            <div id="head-search">
                <div className="cont">
                    <div className="head-search">
                        <span className="icon-search"></span>
                        <input placeholder="搜索疾病..."
                               ref="searchInput"
                               value={value}
                               onChange={this.onChange.bind(this)}
                        />

                    </div>
                    <ul className="head-search-drop"
                        style={{display: dropDown ? 'block' : 'none'}}
                    >
                        {
                            results.length > 0 && results.map(function (val, idx) {
                                return (
                                    <li key={idx}
                                        className={dropDownActive == idx ? "clearfix cursor-p active" : "clearfix cursor-p"}
                                        onClick={()=>self.onClickList(val)}
                                    >
                                        <span className="fll">
                                            {val.text}
                                        </span>
                                        <span className="flr">
                                            {
                                                asideNavCont && asideNavCont.map(function (item, i) {
                                                    if (val.scope == item.current) {
                                                        return item.name
                                                    }
                                                })
                                            }
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="mask" style={{display: dropDown ? 'block' : 'none'}}
                     onClick={this.clickMask.bind(this)}></div>
            </div>

        )
    }

    onChange(e) {

        let self = this;
        let value = e.target.value;

        this.setState({
            value: value,
            dropDownActive:0
        });

        if (value == "") {
            self.setState({
                dropDown: false,
            })
            return false;
        }

        if (self.firstTime) {

            self.firstTime = false;
            self.onChangeFetch(value);
        }

        if (self.timer) {
            return false;
        }

        self.timer = setTimeout(function () {
            self.timer = null;
            // self.firstTime = true;

            let val = self.state.value;
            if (val == '') {
                self.setState({
                    dropDown: false,
                })
                return;
            }
            self.onChangeFetch(val);

        }, 500)
    }

    onChangeFetch(value) {

        let self = this;
        let {fetchData} = self.props;

        fetchData({
            url: `/_/dataplatform/document/search`,
            method: 'post',
            data: {
                "name": value,
                "scopes": [],
                "options": {
                    "removed": "notremoved",
                    "published": "both"
                },
                "start": 0,
                "size": 6
            },
            success: function (data) {

                if (data.documents) {
                    self.setState({
                        results: data.documents,
                        dropDown: true,
                        resultsLength:data.documents.length
                    })
                } else {
                    self.setState({
                        results: [],
                        dropDown: false,
                        resultsLength:0
                    })
                }

            }
        },true)
    }

    handleKeyUp() {

        let self = this;

        $(document).on('keyup', function (e) {

            let {resultsLength,results}=self.state;
            let _idx=self.state.dropDownActive;

            if (e.keyCode == 40) { //下
                self.refs.searchInput.blur();
                _idx++;
                if (_idx > resultsLength - 1) {
                    _idx = 0;
                }
                self.setState({
                    dropDownActive: _idx
                })

            }else if (e.keyCode == 38) { // 上
                self.refs.searchInput.blur();
                _idx--;
                if (_idx < 0) {
                    _idx = resultsLength - 1;
                }
                self.setState({
                    dropDownActive: _idx
                })

            }else if(e.keyCode==13){
                let val=results[_idx];
                self.onClickList(val);

            }
        })
    }

    onClickList(val) {
        let self = this;

        let {asideNavCurrent, currentDocState,versionLogToggle} = self.props;
        let {scope, id, text}=val;

        asideNavCurrent(scope);
        currentDocState(id, text);
        versionLogToggle(true);

        this.clickMask();
        self.context.router.push(`/content/${scope}/all/normal?id=${id}`)
    }

    clickMask() {
        this.setState({
            dropDown: false
        })
    }

    componentDidMount() {
        this.handleKeyUp();
    }

    componentWillUnmount() {
        $(document).off();
    }

}
HeadSearch.contextTypes = {
    router: React.PropTypes.object
}