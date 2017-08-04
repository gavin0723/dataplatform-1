import {ActionType} from '../actions/ActionType'

export const mainState = (state = {
    mainTabCurrent: 'overview',
    detailTabCurrent: 'normal',

    currentVLatestUpdateTime:'',
    currentVLatestUpdateByUser:'',
    currentVersionID:'',

    currentDocID:'',
    currentDocName:'',
    currentDocPublished:false,
    currentDocPublishedTime:'',

    docCount:'',
    icd10s:[]
}, action)=> {
    switch (action.type) {
        case ActionType.MAIN_TAB_ACTION:
            return Object.assign({},
                state,
                {mainTabCurrent: action.current}
            )
        case ActionType.DETAIL_TAB_ACTION:
            return Object.assign({},
                state,
                {detailTabCurrent: action.current}
            )
        case ActionType.DETAIL_PUBLISH_STATE:
            let {versionID,latestUpdateTime,latestUpdateByUser}=action;
            return Object.assign({},
                state,
                {
                    currentVersionID:versionID||'',
                    currentVLatestUpdateTime:latestUpdateTime||'',
                    currentVLatestUpdateByUser:latestUpdateByUser||''
                }
            )

        case ActionType.MAIN_TABLE_TR_ACTION:
            return Object.assign({},
                state,
                {
                    currentDocID: action.id || '',
                    currentDocName: action.name || ''
                }
            )

        case ActionType.DOC_COUNT:
            return Object.assign({},
                state,
                {
                    docCount:action.count
                }
            )

        case ActionType.CURRENT_DOC_PUBLISHED:
            return Object.assign({},
                state,
                {
                    currentDocPublished:action.publishState,
                    currentDocPublishedTime:action.publishTime
                }
            )
        case ActionType.RESOLVE_ICD10S_LIST:
            return Object.assign({},
                state,
                {
                    icd10s:action.data
                }
            )

        default:
            return state
    }
}


export const MainOverviewFetch=(state={
    isFetching:false,
    didInvalidate:true,
    data:{}
},action)=>{
    switch (action.type) {
        case ActionType.MAIN_OVERVIEW_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )
        case ActionType.MAIN_OVERVIEW_FETCH_INVALIDATE:
            return Object.assign({},
                state,
                {
                    didInvalidate:false,
                }
            )
        default:
            return state
    }
}


export const MainReleasedFetch=(state={
    isFetching:false,
    didInvalidate:true,
    currentPage:1,
    data:{}
},action)=>{
    switch (action.type) {
        case ActionType.MAIN_RELEASED_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )
        case ActionType.MAIN_RELEASED_FETCH_INVALIDATE:
            return Object.assign({},
                state,
                {
                    didInvalidate:false,
                }
            )
        case ActionType.MAIN_RELEASED_CURRENTPAGE:
            return Object.assign({},
                state,
                {
                    currentPage:action.currentPage
                }
            )
        default:
            return state
    }
}


export const MainAllFetch=(state={
    isFetching:false,
    didInvalidate:true,
    currentPage:1,
    data:{}
},action)=>{
    switch (action.type) {
        case ActionType.MAIN_All_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )
        case ActionType.MAIN_ALL_FETCH_INVALIDATE:
            return Object.assign({},
                state,
                {
                    didInvalidate:false,
                }
            )
        case ActionType.MAIN_All_CURRENTPAGE:

            return Object.assign({},
                state,
                {
                    currentPage:action.currentPage
                }
            )
        default:
            return state
    }
}
