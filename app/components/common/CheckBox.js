import React, {Component} from "react";
// export default class CheckBoxCustom extends Component {
export default class CheckBoxCustom extends Component {
    constructor() {
        super();
        this.state = {
            inpStyle: {
                width: "30px",
                height: "32px",
                margin: 0
            },
            labStyle: {
                lineHeight: '32px',
                margin: 0
            },
            wrapStyle: {
                display: 'inline-block',
                paddingRight: '10px',
                marginRight: '10px'
            },
            checked:[]
        }
    }

    componentDidMount() {
        let {options, defaultValue}=this.props;
        this.handleOptions(options, defaultValue);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) != JSON.stringify(nextProps.options) || JSON.stringify(this.defaultValue) != JSON.stringify(nextProps.defaultValue)) {
            this.handleOptions(nextProps.options, nextProps.defaultValue);
        }
    }

    handleOptions(options, defaultValue) {

        let _checked=JSON.parse(JSON.stringify(this.state.checked));

        if(Object.prototype.toString.call(defaultValue) !='[object Array]'){
            defaultValue=[];
        }

        for (let i = 0; i < options.length; i++) {
            _checked[i]=false;
            for (let j = 0; j < defaultValue.length; j++) {
                if (options[i].value == defaultValue[j]) {
                    _checked[i] = true;
                }
            }
        }

        this.setState({
            checked:_checked,
            options:options
        })

    }


    render() {
        const self = this,
            {inpStyle, labStyle, wrapStyle, options,checked}=this.state;


        return (
            <div>
                {
                    options && options.length > 0 && options.map((val, idx)=> {

                        return (
                            <div className={"cursor-p clearfix  " + this.props.className} style={wrapStyle} key={idx}
                                 onClick={(e)=>self.clickBox(e,idx)}>
                                <input className="fll cursor-p"
                                       type="checkbox"
                                       value={val.value}
                                       checked={checked[idx]}
                                       onChange={(e)=>{

                                           self.inpChange(e,idx)
                                       }}
                                       style={inpStyle}
                                />
                                <label className="fll cursor-p" style={labStyle}>{val.label}</label>
                            </div>
                        )
                    })
                }

            </div>

        )
    }

    inpChange(){

    }
    clickBox(e,idx) {
        let _checked=JSON.parse(JSON.stringify(this.state.checked)),
            bool=_checked[idx],
            {options}=this.state,
            {onChange}=this.props,
            arr = [];

        _checked[idx]=!bool;

        for(let i=0;i<options.length;i++){
            if(_checked[i]){
                arr.push(options[i].value);
            }
        }

        onChange(arr);
        this.setState({
            checked:_checked
        });
    }

}