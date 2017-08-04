import React, {Component} from "react";
import $ from "jquery";
import "../../static/bootcss.css";
import "../../static/main.css";
import "../../static/tree.css";


export default class Structured extends Component {

    render() {

        let self = this,
            {inpVal}=this.props;
        return (
            <div id="structured">

                <div className="container-fluid">

                    {/*返回结构画图*/}
                    <div className="step-block step-first active" id="step1">
                        <div className="step-header">
                            <div className="step-banner">
                                <div className="step-banner-title">第1步:</div>
                                <div className="step-banner-tip">输入检查报告中的一句话，然后用一个空格来分词。<br /><br />
                                    例如：<img src={require("../../images/sample.jpeg")} width="230" height="45"/></div>
                            </div>
                        </div>
                        <div className="step-body">
                            <div className="cut-input-container">
                                <input className="form-control" type="text" id="cutInputValue"
                                       placeholder="例：左上叶  尖段 肺大泡  同前"
                                       value={inpVal}
                                       onChange={(e)=>self.inpChange(e.target.value)}
                                />
                                <button className="btn btn-default" type="button" id="btnSplitSentence" disabled>提交
                                </button>
                            </div>
                        </div>

                    </div>
                    {/*step2*/}
                    <div className="step-block" id="step2">
                        <div className="step-header">
                            <div className="step-banner">
                                <div className="step-banner-title">第2步:</div>
                                <div className="step-banner-tip">点击每一个关键词，在下拉选项中点选每个词的语义词性。</div>
                                <div className="step-banner-tip">注意：并不需要给每一个词都标注语义词性。</div>
                                <div className="step-banner-tip"><br />
                                    例如：<img src={require("../../images/wordprop.jpeg")} width="230"
                                            style={{verticalAlign: "text-top"}}/>
                                </div>

                            </div>
                        </div>
                        <div className="step-body">
                            <div className="tree-container">
                                <div id="tree1">
                                    {/*<img src={require("../../images/bi-waittingfor.gif")} id='loadImg1' style={{*/}
                                    {/*display: "none",*/}
                                    {/*width: "48px",*/}
                                    {/*height: "48px"*/}
                                    {/*}}/>*/}
                                    <svg height="0"></svg>
                                </div>
                            </div>


                        </div>

                    </div>
                    {/*step3*/}
                    <div className="step-block" id="step3">
                        <div className="step-header">
                            <div className="step-banner">
                                <div className="step-banner-title">第3步:</div>
                                <div className="step-banner-tip">确定每一个关键词与它的父关键词之间的关系类型。</div>
                                <div className="step-banner-tip">
                                    例如：<img src={require("../../images/relationship.jpeg")} width="550"/>
                                </div>
                            </div>
                        </div>
                        <div className="step-body">


                            <div className="cut-word-relationship">
                                <div className="row">
                                    <div className="col-xs-3 node-list">
                                        <div className="list-title">子节点</div>
                                        <ul id="makeSenseWords" className="word-list"></ul>
                                    </div>
                                    <div className="col-xs-3 node-list">
                                        <div className="list-title">关系</div>
                                        <ul id="relationship" className="word-list"></ul>
                                    </div>
                                    <div className="col-xs-3 node-list">
                                        <div className="list-title">父节点</div>
                                        <ul id="targetWords" className="word-list"></ul>
                                    </div>
                                    <div className="col-xs-3 node-list">
                                        {/*<button id="btnSave" >保存</button>*/}
                                    </div>
                                </div>
                            </div>
                            {/*relationship for test*/}
                            <div style={{display: "none"}}>
                                <textarea className="form-control" style={{resize: "none"}} id="cutResult" ></textarea>
                            </div>

                        </div>

                    </div>
                    {/*第四步*/}


                </div>
            </div>
        )
    }


    inpChange(val) {
        this.props.inpChange(val)
    }

    componentDidMount() {

        this.draw();
    }

    draw() {

        let self=this;

        var dependencyDict = {
            'ROOT': '',
            'conj': '病变',
            'nsubj': '部位',
            'nmod': '部位属性',
            'advmod': '病变属性',
            'orphan': '',
            'punct': ''
        };
        var tagDict = {
            '': '',
            'NOUN': '身体部位',
            'ADJ': '部位属性',
            'VERB': '病变',
            'ADV': '病变属性',
            'PUNCT': '',
            'X': ''

        };

        var cutWords, cutArr = [];
        var historySentence = '';


        // $("#draw").on("click", function (d) {
        //     var v = $.trim($("#inputVal").val());
        //     if (v == "") {
        //         alert('请输入值');
        //         return false
        //     }
        //
        // })

        $("#inputVal").on("keyup", function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 13) {
                var v = $.trim($("#inputVal").val());
                if (v == "") {
                    alert('请输入值');
                    return false
                }
            }
        })

        $("#cutInputValue").on("keyup", function (e) {
            if (historySentence == "" || historySentence != $(this).val()) {
                $(".tree-container").hide();
                $(".cut-word-relationship").hide();
                d3.select('#tree1 svg').selectAll('text, path').remove();
                $(".step-block").removeClass("active");
                $("#step1").addClass("active");
            }
            var thisVal = $(this).val();

            if (thisVal) {
                $("#btnSplitSentence").removeAttr("disabled");
            } else {
                $("#btnSplitSentence").attr("disabled", "disabled");
            }
        })

        $("#btnSplitSentence").on("click", function (e) {
            cutSentence();
        });

        $("#tree1").on("click", "svg .word", function (e) {
            var target = $(e.target);
            if (target.attr("data-index") == "0") {
                return false
            }
            if (!$("#step2").hasClass('active')) {
                $(".step-block").removeClass('active');
                $("#step2").addClass('active');
            }
            showPropsMenu(target);
        });

        $("body").on("click", function (e) {
            var target = $(e.target);
            if (target.attr('class') && target.attr('class').indexOf && target.attr('class').indexOf('cut') > 0) {

            } else {
                $("body .menu-props").remove();
            }
        })

        $("body").on("click", ".menu-props-item", function (e) {
            var target = $(e.target);
            var idx = target.parent().attr("data-target") * 1 - 1;
            cutArr[idx][3] = target.attr("data-key");
            cutArr[idx][4] = target.attr("data-key");
            addMakeSenseWords(cutArr[idx]);
            updateCutStr();

            // $("body .menu-props").remove();
        });

        $("#makeSenseWords").on("click", "li", function () {
            if (!$("#step3").hasClass('active')) {
                $(".step-block").removeClass('active');
                $("#step3").addClass('active');
            }
            var $this = $(this);
            if ($this.hasClass("active")) {
                $this.removeClass("active");
                $("#relationship").empty();
                $("#targetWords").empty();
            } else {
                $this.parent().find("li.active").removeClass("active");
                $this.addClass("active");
                $("#relationship").empty();
                $("#targetWords").empty();
                var idx = $this.attr("data-index");
                addRelationship();
                addTargetwords(idx);
            }
        });

        $("#relationship").on("click", "li", function () {
            var $this = $(this);
            if ($this.hasClass("active")) {
                return;
            } else {
                $this.parent().find("li.active").removeClass("active");
                $this.addClass("active");
                updateRelationship();
            }
        });

        $("#targetWords").on("click", "li", function () {
            var $this = $(this);
            if ($this.hasClass("active") || $this.hasClass("disabled")) {
                return;
            } else {
                $this.parent().find("li.active").removeClass("active");
                $this.addClass("active");
                updateRelationship();
            }
        });

        function updateRelationship() {
            var updateIdx = $("#makeSenseWords").find("li.active").attr("data-index");
            var relationWord = $("#relationship").find("li.active").attr("data-key");
            var targetIdx = $("#targetWords").find("li.active").attr("data-index");
            if (updateIdx && relationWord && targetIdx) {
                var idx = updateIdx * 1 - 1;
                cutArr[idx][6] = targetIdx;
                cutArr[idx][7] = relationWord;
                updateCutStr();
            }
        }

        function addTargetwords(idx) {
            var st = '';
            for (var i = 0, len = cutArr.length; i < len; i++) {
                if (cutArr[i][3] == "X" || cutArr[i][3] == "PUNCT")continue;
                if (idx == cutArr[i][0]) {
                    st += '<li class="disabled" data-index="' + cutArr[i][0] + '" data-value="' + cutArr[i][1] + '"> ' + cutArr[i][1] + '</li>';
                } else {
                    st += '<li data-index="' + cutArr[i][0] + '" data-value="' + cutArr[i][1] + '"> ' + cutArr[i][1] + '</li>';
                }
            }
            st += '<li data-index="0" data-value="ROOT"> ROOT</li>';

            if (st) {
                $("#targetWords").append(st);
            }
        }

        function addRelationship() {
            var st = '';
            var step = 0;
            var updateIdx = $("#makeSenseWords").find("li.active").attr("data-index");

            // console.log(cutArr[updateIdx * 1 - 1]);

            for (var key in dependencyDict) {
                if (key != "ROOT" && key != "orphan" && key != "punct") {
                    if ((cutArr[updateIdx * 1 - 1][3] == "NOUN" || cutArr[updateIdx * 1 - 1][3] == "ADJ") && (key == "conj" || key == "advmod"))continue;
                    if ((cutArr[updateIdx * 1 - 1][3] == "VERB" || cutArr[updateIdx * 1 - 1][3] == "ADV") && (key == "nsubj" || key == "nmod"))continue;
                    if (step == 0) {
                        st += '<li class="active" data-key="' + key + '" data-value="' + dependencyDict[key] + '">' + dependencyDict[key] + '</li>';
                    } else {
                        st += '<li data-key="' + key + '" data-value="' + dependencyDict[key] + '">' + dependencyDict[key] + '</li>';
                    }
                    step++;

                }
            }
            if (st) {
                $("#relationship").append(st);
            }
        }

        function addMakeSenseWords(word) {
            if (!$(".cut-word-relationship").is(":visible")) {
                $(".cut-word-relationship").show();
            }
            var id = $("#makeSenseWords").find("li[data-index='" + word[0] + "']");
            if (id.length == 0 && word[3] != 'X' && word[3] != 'PUNCT') {
                $("#makeSenseWords").append('<li data-index="' + word[0] + '">' + word[1] + '</li>');
            }
            //update order
            var orders = [];
            $("#makeSenseWords").find("li[data-index]").each(function (idx, itm) {
                orders.push({
                    dataIndex: $(itm).attr("data-index") * 1,
                    dataText: $(itm).text()
                });
            })
            if (orders.length > 0) {
                orders.sort(function (itm1, itm2) {
                    if (itm1.dataIndex > itm2.dataIndex) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                $("#makeSenseWords").empty();
                var liStr = "";
                orders.forEach(function (itm, idx) {
                    liStr += '<li data-index="' + itm.dataIndex + '">' + itm.dataText + '</li>'
                });
                $("#makeSenseWords").append(liStr);
            }
        }

        function showPropsMenu(target) {
            $("body .menu-props").remove();
            var domStr = "<ul class='menu-props'>";
            for (var key in tagDict) {
                if (key == "")continue;
                var dis = tagDict[key];//+ " (" + key + ")";
                if (key == "X") {
                    dis = "无意义"
                }
                if (key == "PUNCT") {
                    dis = "标点"
                }
                domStr += "<li class='menu-props-item' data-key='" + key + "' data-value='" + tagDict[key] + "'>" + dis + "</li>"
            }
            domStr += "</ul>";
            var pos = target.position();
            $('body').append($(domStr).attr("data-target", target.attr("data-index")).css({
                "top": pos.top + 20,
                "left": pos.left
            }));
        }


        function cutSentence() {

            //new 切记方法
            $("#makeSenseWords").empty();
            $("#relationship").empty();
            $("#targetWords").empty();
            historySentence = $("#cutInputValue").val();
            $(".tree-container").show();
            // $("#loadImg1").show();
            d3.select('#tree1 svg').selectAll('text, path').remove();

            cutWords = $("#cutInputValue").val().split(/[\s]+/);
            cutArr = [];
            cutWords.forEach(function (itm, idx) {
                cutArr.push([(idx + 1), itm, "-", "X", "X", "-", "-", "-", "-", "-"])
            });

            $(".step-block").removeClass("active");
            $("#step2").addClass("active");

            updateCutStr();
        }


        function updateCutStr() {
            d3.select('#tree1 svg').selectAll('text, path').remove();
            var str = ""

            cutArr.forEach(function (itm) {
                str += itm.join("\t") + "\n";
            })
            $("#cutResult").val(str);

            self.props.cutResultChange(str);

            drawTree('#tree1 svg', str, false);
        }


        init();
        function init(){
            let {cutResult}=self.props;
            if(cutResult != ""){

                let arr=cutResult.split(/[\s]+/),
                    _cutArr=[];

                let num=0,assist=[];

                for(var i=0;i<arr.length;i++){
                    if(i%10==0 && i != 0){
                        _cutArr[num]=assist;
                        num++;
                        assist=[];
                        assist.push(arr[i]);

                    }else{
                        assist.push(arr[i]);
                    }

                }

                cutArr=_cutArr;

                cutArr.map(val=>{
                    addMakeSenseWords(val);
                })
                $("#btnSplitSentence").removeAttr("disabled");
                $(".tree-container").show();

                updateCutStr();
            }
        }

        //drag
    }


}

