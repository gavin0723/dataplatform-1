import {ActionType} from '../actions/ActionType'

/*
{name:'平台概况',current:'introduces'},
{name:'疾病',current:'disease'},
{name:'症状&体征',current:'sign'},
{name:'症状&体征部位',current:'sign_path'},
{name:'检查所见',current:'examine'},
{name:'检查所见部位',current:'examine_path'},
{name:'化验项目',current:'assay'},
{name:'检查项目',current:'examine_item'}
*/

export  const userInfo = (state = {
    overdue:true,
    userID:'',
    isVisitor:false,     //设置个人中心权限
    limit:{        // manager:管理者，最高权限；eidt:编辑者，编辑权限；'visitor'：游客
        // disease:'manager'
    }

}, action)=> {
    switch (action.type) {

        case ActionType.USER_INFO:

            let {userID,limit,isVisitor}=action;
            let stateUserID=state.userID;

            if(stateUserID==userID){
                return state
            }


            return Object.assign({},state,{

                overdue:false,
                userID,
                isVisitor,
                limit

            })

        default:
            return state
    }
}


