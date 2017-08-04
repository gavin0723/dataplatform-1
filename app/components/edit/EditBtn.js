import React, {Component} from "react";

export default class EditBtnDefined extends Component {
    render() {
        return (
            <div id="edit-btn-defined"
                 className={"cursor-p " + this.props.className}
                 style={this.props.style}
                 onClick={this.props.onClick}
            >
                <span className={this.props.icon}></span>
                <span>{this.props.name}</span>
            </div>
        )
    }
}