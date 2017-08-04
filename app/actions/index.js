import $ from "jquery";
import {ActionType} from "./ActionType";

export const userInfo = (userInfo)=>({
    type: ActionType.USER_INFO,
    ...userInfo
})

/*---------common--------*/
// loading
export const setLoadingToggle = (isShow)=>({
    type: ActionType.SET_LOADING_TOGGLE,
    isShow
})
// modal
export const commonModalState = (visible, source)=>({
    type: ActionType.COMMON_MODAL_VISIBLE,
    visible,
    source
})


/*-------- VersionLog --------*/
export const setVersionLogToggle = (versionLogToggle)=>({
    type: ActionType.VERSION_LOG_TOGGLE,
    versionLogToggle
});

/*-------- VersionLog Edit Draft --------*/
// export const VersionLogEditDraft = (editDraftToggle)=>({
//     type: ActionType.VERSION_LOG_EDIT_DRAFT_TOGGLE,
//     editDraftToggle
// })

export const versionLogFetchReceive = (receive)=>({
    type: ActionType.VERSION_LOG_FETCH_RECEIVE,
    receive
})

export const versionHandledData = (data)=>({
    type: ActionType.VERSION_HANDLED_DATA,
    data
})

// export const currentVersionInfo=(params)=>({
//     type:ActionType.VERSION_LOG_CURRENT_V_INFO,
//     ...params
// })
/*-------- asideNav --------*/
export const asideNavAction = (current)=>({
    type: ActionType.ASIDE_NAV_ACTION,
    current
})

// export const asideNavName = (name)=>({
//     type:ActionType.ASIDE_NAV_NAME,
//     name
// })


/*-------- main --------*/
export const mainTab = (current)=>({
    type: ActionType.MAIN_TAB_ACTION,
    current
})
export const currentDocState = (id, name)=>({
    type: ActionType.MAIN_TABLE_TR_ACTION,
    id,
    name
})

export const currentDocPublished = (_state)=>({
    type: ActionType.CURRENT_DOC_PUBLISHED,
    ..._state
})

export const docCount = (count)=>({
    type: ActionType.DOC_COUNT,
    count
})

// overview fetch
export const MainOverviewFetchReceive = (receive)=>({
    type: ActionType.MAIN_OVERVIEW_FETCH_RECEIVE,
    receive
})
export const MainOverviewFetchInvalidate = (invalidate)=>({
    type: ActionType.MAIN_OVERVIEW_FETCH_INVALIDATE,
    invalidate
})

// released fetch
export const MainReleasedFetchReceive = (receive)=>({
    type: ActionType.MAIN_RELEASED_FETCH_RECEIVE,
    receive
})
export const MainReleasedFetchInvalidate = (invalidate)=>({
    type: ActionType.MAIN_RELEASED_FETCH_INVALIDATE,
    invalidate
})
export const MainReleasedCurrentPage = (currentPage)=>({
    type: ActionType.MAIN_RELEASED_CURRENTPAGE,
    currentPage
})

// all fetch
export const MainAllFetchReceive = (receive)=>({
    type: ActionType.MAIN_All_FETCH_RECEIVE,
    receive
})
export const MainAllFetchInvalidate = (invalidate)=>({
    type: ActionType.MAIN_All_FETCH_RECEIVE,
    invalidate
})
export const MainAllCurrentPage = (currentPage)=>({
    type: ActionType.MAIN_All_CURRENTPAGE,
    currentPage
})


/*-------- detail --------*/
export const detailTab = (current)=>({
    type: ActionType.DETAIL_TAB_ACTION,
    current
})
export const currentVersionState = (data)=>({
    type: ActionType.DETAIL_PUBLISH_STATE,
    ...data
})


export const detailNormalHandledData = (data)=>({
    type: ActionType.DETAIL_NORMAL_HANDLED_DATA,
    data
})

// detail normal fetch
export const detailNromalFetchReceive = (receive)=>({
    type: ActionType.DETAIL_NORMAL_FETCH_RECEIVE,
    receive
})

//detail Encyclopedia fetch
export const detailEncyclopediaFetchReceive = (receive)=>({
    type: ActionType.DETAIL_ENCYCLOPEDIA_FETCH_RECEIVE,
    receive
})
export const detailEncyHandledData = (data)=>({
    type: ActionType.DETAIL_ENCY_HANDLED_DATA,
    data
})

//detail Synonyms fetch
export const detailSynonymsFetchReceive = (receive)=>({
    type: ActionType.DETAIL_SYNONYMS_FETCH_RECEIVE,
    receive
})
export const detailSynonymsHandledData = (data)=>({
    type: ActionType.DETAIL_SYNONYMS_HANDLED_DATA,
    data
})

export const resolveIcd10sList = (data)=>({
    type: ActionType.RESOLVE_ICD10S_LIST,
    data
})

/*----------- edit  ---------*/
//common
export const editNormalInit = ()=>({
    type: ActionType.EDIT_NORMAL_INIT,
})
export const editNormalType = (_type)=>({
    type: ActionType.EDIT_NORMAL_TYPE,
    _type
})

//edit Normal
export const editNormalData = (data)=>({    //edit normal page init data
    type: ActionType.EDIT_NORMAL_DATA,
    data
})

// export const editNormalIdChange=(newValue)=>({
//     type:ActionType.EDIT_NORMAL_ID_CHANGE,
//     newValue
// })
export const editNormalNameChange = (newValue)=>({
    type: ActionType.EDIT_NORMAL_NAME_CHANGE,
    newValue
})
export const editNormalFriendlynameChange = (newValue)=>({
    type: ActionType.EDIT_NORMAL_FRIENDLYNAME_CHANGE,
    newValue
})
export const editNormalShortnameChange = (newValue)=>({
    type: ActionType.EDIT_NORMAL_SHORTNAME_CHANGE,
    newValue
})
export const editNormalGenderChange = (newValue)=>({
    type: ActionType.EDIT_NORMAL_GENDER_CHANGE,
    newValue
})
export const editNormalAgeChange = (newValue)=>({
    type: ActionType.EDIT_NORMAL_AGE_CHANGE,
    newValue
})
export const editNormalOfficeChange = (value)=>({
    type: ActionType.EDIT_NORMAL_OFFICE_CHANGE,
    value
})
export const editNormalAddIcd10 = ()=>({
    type: ActionType.EDIT_NORMAL_ICD_ADD,
})
export const editNormalDeleteIcd10 = (idx)=>({
    type: ActionType.EDIT_NORMAL_ICD_DELETE,
    idx
})
export const editNormalIcdSelectChange = (idx, value)=>({
    type: ActionType.EDIT_NORMAL_ICD_SELECT_CHANGE,
    idx,
    value
})
export const editNormalIcdInputChange = (idx, value)=>({
    type: ActionType.EDIT_NORMAL_ICD_INPUT_CHANGE,
    idx,
    value
})

// edit footer
export const editFooterInit = ()=>({
    type: ActionType.EDIT_FOOTER_INIT
})
export const editFooterApprove = (value)=>({
    type: ActionType.EDIT_FOOTER_APPROVE,
    value
})
export const editFooterSetcurrent = (value)=>({
    type: ActionType.EDIT_FOOTER_SETCURRENT,
    value
})

export const editFooterCommit = (value)=>({
    type: ActionType.EDIT_FOOTER_COMMIT,
    value
})
export const editSetApproveState = (value)=>({
    type: ActionType.EDIT_SET_STATE_APPROVE,
    value
})
export const editSetcurrentState = (value)=>({
    type: ActionType.EDIT_SET_STATE_SETCURRENT,
    value
})

//edit ency
export const editEncyInit = ()=>({
    type: ActionType.EDIT_ENCY_INIT
})

export const editEncyInputValue = (arr)=>({
    type: ActionType.EDIT_ENCY_INPUT_VALUE,
    arr
})


//edit synonyms
export const editSynonymsAdd = (text)=>({
    type: ActionType.EDIT_SYNONYMS_ADD,
    text
})
export const editSynonymsEdit = (value, idx)=>({
    type: ActionType.EDIT_SYNONYMS_EDIT,
    value,
    idx
})
export const editSynonymsDelete = (idx)=>({
    type: ActionType.EDIT_SYNONYMS_DELETE,
    idx
})
export const editSynonymsInit = (data)=>({
    type: ActionType.EDIT_SYNONYMS_INIT,
    data
})

export const editSynonymsModalInputValue = (value, idx)=>({
    type: ActionType.EDIT_SYNONYMS_MODAL_INPUT,
    value,
    idx
})

/*---------admin--------*/
export const adminTabCurrent = (current)=>({
    type: ActionType.ADMIN_TAB_ACTION,
    current
})

export const adminTotalCurrent = (current, userType, userID)=>({
    type: ActionType.ADMIN_TOTAL_ACTION,
    current,
    userType,
    userID
})

export const adminTypeCurrent = (current)=>({
    type: ActionType.ADMIN_TYPE_ACTION,
    current
})

export const adminStatsFetch = (stats, clsStats)=>({
    type: ActionType.ADMIN_STATS_FETCH,
    stats,
    clsStats
})

export const adminTableFetch = (list, stats, currentPage)=>({
    type: ActionType.ADMIN_TABLE_FETCH,
    list,
    stats,
    currentPage
})

// structured   结构化
export const structuredCurrentTab = (currentTab)=>({
    type: ActionType.STRUCTURED_CURRENT_TAB,
    currentTab
})
export const structuredEditInpValChange = (val)=>({
    type: ActionType.STRUCTURED_EDIT_INP_VAL,
    val
})

export const structuredEditCutResultChange = (val)=>({
    type: ActionType.STRUCTURED_EDIT_CUTRESULT_CHANGE,
    val
})

export const structuredHandledFetchData=(data)=>({
    type:ActionType.STRUCTURED_HANDLED_FETCHDATA,
    data
})

export const structuredFetchRecive=(data)=>({
    type:ActionType.STRUCTURED_FETCH_RECIVE,
    data
})

/*---------Symptom--------*/
export const symptomEditNormalMetadata=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_METADATA,
    params
})

export const symptomEditNormalName=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_NAME,
    params
})


export const symptomEditNormalKey=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_KEY,
    params
})
export const symptomEditNormalGender=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_GENDER,
    params
})
export const symptomEditNormalAgeRange=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_AGERANGE,
    params
})
export const symptomEditNormalCategories=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_CATEGORIES,
    params
})

export const symptomEditNormalDeleteCategories=(idx)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_DELETE_CATEGORIES,
    idx
})
export const symptomEditNormalAddCategories=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_ADD_CATEGORIES,
    params
})
export const symptomEditNormalAddAttrs=()=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_ADD_ATTRS
})
export const symptomEditNormalAddAttrsValues=(idx)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_ADD_ATTRSVALUES,
    idx
})

export const symptomEditNormalRemoveAttrs=(idx)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_REMOVE_ATTRS,
    idx
})
export const symptomEditNormalRemoveAttrsValues=(attrsIdx,valIdx)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_REMOVE_ATTRSVALUES,
    attrsIdx,valIdx
})
export const symptomEditNormalSetCommon=(params)=>({
    type:ActionType.SYMPTOM_EDIT_NORMAL_SET_COMMON,
    params
})

// labitem
export const labitemEditNormalCategories=(params)=>({
    type:ActionType.LABITEM_EDIT_NORMAL_CATEGORIES,
    params
})
export const labitemInpValChange=(params)=>({
    type:ActionType.LABITEM_EDIT_NORMAL_INPVAL,
    params
})

export const detailHandleDepartment=(params)=>({
    type:ActionType.DETAIL_HANDLE_DEPARTMENT,
    params
})

export const editHandleDepartment=(params)=>({
    type:ActionType.EDIT_HANDLE_DEPARTMENT,
    params
})

export const editDeleteSelectDepartment=(idx)=>({
    type:ActionType.EDIT_DELETE_DEPARTMENT,
    idx
})

/*---------Fetch--------*/
export const fetchData = (params, noLoading)=> dispatch=> {

    let data = params.data ? JSON.stringify(params.data) : '{}';
    let noPromptError = params.noPromptError || "";   //error时是否alert,没有该参数时弹出alert

    if (!noLoading) {
        dispatch(setLoadingToggle(true));
    }
    return $.ajax({
        url: params.url,
        type: params.method,
        data: data,
        dataType: params.dataType || 'json',
        beforeSend: params.beforeSend || function () {

        },
        success: function (resoult) {
            params.success(resoult);
            if (!noLoading) {
                dispatch(setLoadingToggle(false));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest);

            dispatch(setLoadingToggle(false));

            if (!noPromptError) {

                let _alert = 'request error';
                if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
                    _alert = XMLHttpRequest.responseJSON.error
                }
                alert(_alert);

            }

            if (params.error) {
                params.error(XMLHttpRequest, textStatus, errorThrown)
            }
        },
        complete: function (XMLHttpRequest, status) {
            if (params.complete) {
                params.complete(XMLHttpRequest, status)
            }
        }
    })
}

export const _fetchData = (params)=> {

    let data = params.data ? JSON.stringify(params.data) : '{}';
    let noPromptError = params.noPromptError || "";   //error时是否alert,没有该参数时弹出alert

    $.ajax({
        url: params.url,
        type: params.method,
        data: data,
        dataType: 'json',
        success: function (resoult) {
            params.success(resoult);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest);
            if (!noPromptError) {
                let _alert = 'request error';
                if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
                    _alert = XMLHttpRequest.responseJSON.error
                }
                alert(_alert);
            }

            if (params.error) {
                params.error(XMLHttpRequest, textStatus, errorThrown)
            }
        },
        complete: function (XMLHttpRequest, status) {
            if (params.complete) {
                params.complete(XMLHttpRequest, status)
            }
        }
    })
}




