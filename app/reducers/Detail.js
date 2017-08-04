import {ActionType} from '../actions/ActionType'


export const detailNormalFetch=(state={
    isFetching:false,
    didInvalidate:true,
    data:{},
    handledData:{}
},action)=>{
    switch (action.type) {
        case ActionType.DETAIL_NORMAL_FETCH_RECEIVE:

            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )
        case ActionType.DETAIL_NORMAL_HANDLED_DATA:
            return Object.assign({},
                state,
                {
                    handledData:action.data
                }
            )

        case ActionType.DETAIL_HANDLE_DEPARTMENT:

            let _dpmHandleData=JSON.parse(JSON.stringify(state.handledData));
            if(!_dpmHandleData.departmentArr){
                _dpmHandleData.departmentArr=[]
            }

            _dpmHandleData.departmentArr.push(action.params);

            return Object.assign({},state,
                {
                    handledData:_dpmHandleData
                }
            )

        default:
            return state
    }
}


export const detailEncyFetch=(state={
    isFetching:false,
    didInvalidate:true,
    data:{},
    handledData:[]
},action)=>{
    switch (action.type) {
        case ActionType.DETAIL_ENCYCLOPEDIA_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )

        case ActionType.DETAIL_ENCY_HANDLED_DATA:
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


export const detailSynonymsFetch=(state={
    isFetching:false,
    didInvalidate:true,
    data:{},
    handledData:{}
},action)=>{
    switch (action.type) {
        case ActionType.DETAIL_SYNONYMS_FETCH_RECEIVE:
            return Object.assign({},
                state,
                {
                    isFetching:false,
                    didInvalidate:false,
                    data: action.receive,
                }
            )

        case ActionType.DETAIL_SYNONYMS_HANDLED_DATA:
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
