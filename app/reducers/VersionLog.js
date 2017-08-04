import {ActionType} from '../actions/ActionType'

export const versionLog = (state = {
    // currentVersionTime:'',
    // currentVersionAuthor:'',
    // currentVersionId:'',
    versionLogToggle: true,
    data:{},
    handledData:{
        draftData:{},
        currentData:{},
        historyVersions:[]
    }
}, action)=> {

    switch (action.type) {

        // case ActionType.VERSION_LOG_CURRENT_V_INFO:
        //
        //     return Object.assign({},
        //         state,
        //         {
        //             currentVersionTime:action.currentVersionTime,
        //             currentVersionAuthor:action.currentVersionAuthor,
        //             currentVersionId:action.currentVersionId
        //
        //         }
        //     )
        case ActionType.VERSION_LOG_TOGGLE:

            return Object.assign({},
                state,
                {versionLogToggle: action.versionLogToggle}
            )
        case ActionType.VERSION_LOG_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {data:action.receive}
            )
        case ActionType.VERSION_HANDLED_DATA:
            return Object.assign({},
                state,
                {handledData:action.data}
            )

        default:
            return state
    }
}
