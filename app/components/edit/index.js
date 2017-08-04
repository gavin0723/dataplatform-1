import React, {Component} from "react";
import Header from "./CommonHeader";
import Normal from "../../containers/edit/Normal";
import Synonyms from "../../containers/edit/Synonyms";
import Ency from "../../containers/edit/Ency";

import SymptomEditNormal from '../../containers/symptom/EditNormal'
import StructruedEditNormal from '../../containers/structured/Edit';
import LabitemEditNormal from '../../containers/labitem/EditNormal'


export default class Edit extends Component {

    render() {


        let self = this,
            {asideNavCurrent}=this.props,
            detailCurrent = self.props.params.editType;

        return (
            <div id="edit" className="noselect">
                <Header
                    username="Docter.L"
                />

                <div className="edit-cont-wrap">
                    <div className="edit-cont">

                        <div className="content">

                            {
                                (function () {
                                    if (detailCurrent == 'normal') {
                                        if(asideNavCurrent=='disease'){
                                            return <Normal />
                                        }else if(asideNavCurrent=='symptom'){
                                            return <SymptomEditNormal />
                                        }else if(asideNavCurrent=='conll'){
                                            return <StructruedEditNormal />
                                        }else if(asideNavCurrent=='labitem'){
                                            return <LabitemEditNormal/>
                                        }

                                    } else if (detailCurrent == 'synonyms') {
                                        return <Synonyms />
                                    } else if (detailCurrent == 'wiki') {
                                        return <Ency />
                                    }
                                })()
                            }

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    componentWillMount() {
        let {scope, id, vid}=this.props.location.query;
        let {asideNavAction, currentDocState, currentVersionState, editNormalType,currentDocName,currentDocID,asideNavCurrent}=this.props;

        let _id=currentDocID || id;

        if (!scope && !vid) {
            editNormalType('add');
            currentDocState('','新建栏目');
            // asideNavAction('disease')

        }else{
            editNormalType('edit')
            asideNavAction(scope);
            currentVersionState({versionID: vid})
            currentDocState(_id,currentDocName)

        }
    }

    getUserInfo(){
        let {fetchData,handleFetchUserInfo}=this.props;

        fetchData({
            url:`/_/dataplatform/user/permission/get`,
            method:'post',
            success:function(data){
                handleFetchUserInfo(data)
            }
        })
    }

    componentDidMount(){
        let {userInfoOverdue}=this.props;
        if(userInfoOverdue){
            this.getUserInfo();
        }
    }


}
Edit.contextTypes={
    router:React.PropTypes.object
}
