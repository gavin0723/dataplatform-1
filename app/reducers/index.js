import {combineReducers} from "redux";
import {ActionType} from "../actions/ActionType";
import {editSynonyms, editNormalData,editEncy,editFooter} from "./Edit";
import {adminState} from "./Admin";
import {asideNav} from "./Aside";
import {versionLog} from "./VersionLog";
import {userInfo} from "./UserInfo";
import {mainState, MainOverviewFetch, MainReleasedFetch, MainAllFetch} from "./Main";
import {detailNormalFetch, detailEncyFetch, detailSynonymsFetch} from "./Detail";
import {structured} from './Structured'
import {pubTableList} from './Publics'


const commonLoading = (state = {
    isShow: false
}, action)=> {
    switch (action.type) {
        case ActionType.SET_LOADING_TOGGLE:
            return Object.assign({},
                state,
                {isShow: action.isShow}
            )
        default:
            return state
    }
}

const commonModal = (state = {
    visible: false,
    source: ''
}, action)=> {
    switch (action.type) {
        case ActionType.COMMON_MODAL_VISIBLE:
            return Object.assign({},
                state,
                {
                    visible: action.visible,
                    source: action.source ? action.source : ''
                }
            )
        default:
            return state
    }
}


export default combineReducers({
    userInfo,

    commonLoading,
    commonModal,

    versionLog,

    asideNav,
    adminState,

    mainState,
    MainOverviewFetch,
    MainReleasedFetch,
    MainAllFetch,

    detailNormalFetch,
    detailEncyFetch,
    detailSynonymsFetch,

    editNormalData,
    editSynonyms,
    editEncy,
    editFooter,

    pubTableList,
    structured
})
