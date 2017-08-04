import {connect} from "react-redux";
import InfoPage from "../../components/edit/CommonInfo";

const mapStateToProps = (state, ownProps) => {

    let {mainState}=state;
    return ({
        version: mainState.currentVLatestUpdateTime,
        author: mainState.latestUpdateByUser,
        title: ownProps.title
    })
}

const Info = connect(
    mapStateToProps
)(InfoPage);

export default Info
