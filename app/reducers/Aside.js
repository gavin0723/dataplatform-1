import {ActionType} from '../actions/ActionType'
export  const asideNav = (state = {
    current: 'introduces',
    name:'平台概况',
    content:[
        {name:'平台概况',current:'introduces'},
        {name:'疾病',current:'disease'},
        {name:'症状',current:'symptom'},
        // {name:'检查',current:'examitem'},
        {name:'化验',current:'labitem'},
        {name:'结构化',current:'conll'}
    ]
}, action)=> {

    switch (action.type) {
        case ActionType.ASIDE_NAV_ACTION:

            let _name="";
            state.content.map(function (val,idx) {
                if(val.current==action.current){
                    _name=val.name
                }
            })

            return Object.assign({},
                state,
                {
                    current: action.current,
                    name:_name
                }
            );
        // case ActionType.ASIDE_NAV_NAME:
        //     return Object.assign({},
        //         state,
        //         {
        //             name:action.name
        //         }
        //     );
        default:
            return state
    }
}
