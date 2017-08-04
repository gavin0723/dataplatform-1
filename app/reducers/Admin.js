import {ActionType} from '../actions/ActionType'

export  const adminState = (state = {
    totalCurrent: 'disease',
    typeCurrent:'normal',
    tabCurrent:'audit',
    userType:'',
    userID:'',
    stats:[],
    clsStats:{},
    currentPage:1,
    tableDataStats:{},
    tableDataList:[]
}, action)=> {
    switch (action.type) {
        case ActionType.ADMIN_TAB_ACTION:
            return Object.assign({},
                state,
                {
                    tabCurrent: action.current
                }
            )
        case ActionType.ADMIN_TOTAL_ACTION:
            return Object.assign({},
                state,
                {
                    totalCurrent: action.current,
                    userType:action.userType,
                    userID:action.userID
                }
            )
        case ActionType.ADMIN_TYPE_ACTION:

            return Object.assign({},
                state,
                {
                    typeCurrent: action.current
                }
            )

        case ActionType.ADMIN_STATS_FETCH:
            return Object.assign({},state,{
                stats:action.stats,
                clsStats:action.clsStats
            })

        case ActionType.ADMIN_TABLE_FETCH:
            return Object.assign({},state,{
                tableDataStats:action.stats,
                tableDataList:action.list,
                currentPage:action.currentPage
            })

        default:
            return state
    }
}
