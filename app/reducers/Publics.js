import {ActionType} from "../actions/ActionType";

export const pubTableList = (state = {

    data:[
        {id:'001',text:'惯性显示发水淀粉但发改委',time:'2017-10-01 15:15:15'},
        {id:'002',text:'惯性显示发水淀粉但发改委',time:'2017-10-01 15:15:15'},
        {id:'003',text:'惯性显示发水淀粉但发改委',time:'2017-10-01 15:15:15'},
        {id:'004',text:'惯性显示发水淀粉但发改委',time:'2017-10-01 15:15:15'}
    ],
    count:10,
    start:0,
    pageSize:10,

}, action)=> {
    switch (action.type) {

        default:
            return state
    }
}
