import {ActionType} from '../actions/ActionType'

export const structured = (state = {
    titleIcon:[
        {name:'新建类目',icon:'icon-add',type:'add'},
    ],
    tabCont:[
        {name:'已发布',current:'released'},
        {name:'全部',current:'all'}
    ],
    currentTab:'all',
    editInpVal:'',
    cutResult:'',

    data:{},
    handledData:{}

}, action)=> {
    switch (action.type) {

        case ActionType.STRUCTURED_CURRENT_TAB:
            return Object.assign({},
                state,
                {
                    currentTab:action.currentTab
                }
            )
        case ActionType.STRUCTURED_EDIT_INP_VAL:
            return Object.assign({},
                state,
                {
                    editInpVal:action.val
                }
            )
        case ActionType.STRUCTURED_EDIT_CUTRESULT_CHANGE:
            return Object.assign({},
                state,
                {
                    cutResult:action.val
                }
            )

        case ActionType.STRUCTURED_FETCH_RECIVE:
            return Object.assign({},
                state,
                {
                    data:action.data
                }
            )

        case ActionType.STRUCTURED_HANDLED_FETCHDATA:
            return Object.assign({},
                state,
                {
                    handledData:action.data
                }
            )

        default:
            return state
    }
}

