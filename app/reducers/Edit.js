import {ActionType} from "../actions/ActionType";

export const editSynonyms = (state = {
    content: [],
    newValue: '',
    id: '',
    editIndex: ''
}, action)=> {
    switch (action.type) {

        case ActionType.EDIT_SYNONYMS_INIT:
            return Object.assign({},
                state,
                action.data
            )
        case ActionType.EDIT_SYNONYMS_MODAL_INPUT:
            return Object.assign({},
                state,
                {
                    newValue: action.value,
                    editIndex: action.idx
                }
            )

        case ActionType.EDIT_SYNONYMS_ADD:

            let addContent = JSON.parse(JSON.stringify(state.content));

            let json = {name: action.text};
            addContent.unshift(json);

            return Object.assign({},
                state,
                {
                    content: addContent
                }
            )
        case ActionType.EDIT_SYNONYMS_DELETE:

            let deleteContent = JSON.parse(JSON.stringify(state.content));

            deleteContent.splice(action.idx, 1);

            return Object.assign({},
                state,
                {
                    content: deleteContent
                }
            )
        case ActionType.EDIT_SYNONYMS_EDIT:

            let editContent = JSON.parse(JSON.stringify(state.content));

            editContent[action.idx].name = action.value;

            return Object.assign({},
                state,
                {
                    content: editContent
                }
            )

        default:
            return state
    }
}

export const editNormalData = (state = {
    idReadOnly: false,
    type: 'edit',
    id: '',
    versionID: '',
    revisionIndex: '',
    name: '',
    friendlyName: '',
    shortName: '',
    ageRange: [],
    gender: [],
    // departmentId: '',
    // departmentText: '',
    departmentArr: [],
    symptomAttrsList: []
}, action)=> {

    let initState = {
        id: '',
        versionID: '',
        revisionIndex: '',
        name: '',
        friendlyName: '',
        shortName: '',
        ageRange: [],
        gender: [],
        icd10: [
            {id: '', system: 'cn-beijing', code: ''}
        ],
        // departmentId: '',
        // departmentText: ''
        departmentArr: []
        // symptomAttrsList:[]

    }

    switch (action.type) {
        case ActionType.EDIT_NORMAL_INIT:
            return Object.assign({},
                {
                    idReadOnly: false,
                    type: 'add',
                    ...initState,
                },
            )

        case ActionType.EDIT_NORMAL_TYPE:
            return Object.assign({},
                state,
                {
                    type: action._type
                }
            )

        case ActionType.EDIT_NORMAL_DATA:

            let normalData = action.data;
            if (!normalData.icd10) {
                normalData.icd10 = [{
                    id: '',
                    system: 'cn-beijing',
                    code: ''
                }]
            }

            return Object.assign({},
                {
                    ...initState
                },
                {
                    idReadOnly: true,
                    type: 'edit',
                    ...normalData
                }
            )

        case ActionType.EDIT_NORMAL_NAME_CHANGE:
            return Object.assign({},
                state,
                {
                    name: action.newValue
                }
            )
        case ActionType.EDIT_NORMAL_FRIENDLYNAME_CHANGE:
            return Object.assign({},
                state,
                {
                    friendlyName: action.newValue
                }
            )
        case ActionType.EDIT_NORMAL_SHORTNAME_CHANGE:
            return Object.assign({},
                state,
                {
                    shortName: action.newValue
                }
            )
        case ActionType.EDIT_NORMAL_GENDER_CHANGE:
            return Object.assign({},
                state,
                {
                    gender: action.newValue
                }
            )
        case ActionType.EDIT_NORMAL_AGE_CHANGE:

            return Object.assign({},
                state,
                {
                    ageRange: action.newValue
                }
            )
        case ActionType.EDIT_NORMAL_OFFICE_CHANGE:
            let _departmentArr = JSON.parse(JSON.stringify(state.departmentArr));
            _departmentArr.push(action.value);
            return Object.assign({},
                state,
                {
                    // departmentId: action.id,
                    // departmentText: action.text
                    departmentArr: _departmentArr
                }
            )
        case ActionType.EDIT_NORMAL_ICD_ADD:
            let newIcd10s = state.icd10;
            let json = {
                id: '',
                system: 'cn-beijing',
                code: ''
            }

            newIcd10s.push(json)

            return Object.assign({},
                state,
                {
                    icd10: newIcd10s
                }
            )
        case ActionType.EDIT_NORMAL_ICD_DELETE:
            let newIcd10 = state.icd10;
            if (newIcd10.length == 1) {
                newIcd10 = [{
                    id: '',
                    system: 'cn-beijing',
                    code: ''
                }]
            } else {
                newIcd10.splice(action.idx, 1);
            }

            return Object.assign({},
                state,
                {
                    icd10: newIcd10
                }
            )
        case ActionType.EDIT_NORMAL_ICD_INPUT_CHANGE:
            let newIcd10InpChange = state.icd10;
            let newIcd10InpEle = newIcd10InpChange[action.idx];

            newIcd10InpEle.code = action.value;
            newIcd10InpEle.id = newIcd10InpEle.system + '-' + newIcd10InpEle.code;

            return Object.assign({},
                state,
                {
                    icd10: newIcd10InpChange
                }
            )

        case ActionType.EDIT_NORMAL_ICD_SELECT_CHANGE:
            let newIcd10SelectChange = state.icd10;
            let newIcd10SeleEle = newIcd10SelectChange[action.idx];

            newIcd10SeleEle.system = action.value;
            newIcd10SeleEle.id = newIcd10SeleEle.system + '-' + newIcd10SeleEle.code;

            return Object.assign({},
                state,
                {
                    icd10: newIcd10SelectChange
                }
            )

        // symptom
        case ActionType.SYMPTOM_EDIT_NORMAL_METADATA:
            let metadataParams = action.params,
                metadataAttrsList = state.symptomAttrsList;

            if (metadataParams.type == 'doc') {
                return Object.assign({},
                    state,
                    {
                        weight: metadataParams.value
                    }
                );
            } else {
                let newList = handleSymptomListChange(metadataParams, metadataAttrsList, 'metadataStr');
                return Object.assign({},
                    state,
                    {
                        symptomAttrsList: newList
                    }
                );
            }

        case ActionType.SYMPTOM_EDIT_NORMAL_NAME:
            let nameParams = action.params,
                nameAttrsList = state.symptomAttrsList;

            return Object.assign({},
                state,
                {
                    symptomAttrsList: handleSymptomListChange(nameParams, nameAttrsList, 'name')
                }
            );
        case ActionType.SYMPTOM_EDIT_NORMAL_KEY:
            let keyParams = action.params,
                keyAttrsList = state.symptomAttrsList;

            return Object.assign({},
                state,
                {
                    symptomAttrsList: handleSymptomListChange(keyParams, keyAttrsList, 'key')
                }
            );
        case ActionType.SYMPTOM_EDIT_NORMAL_GENDER:
            let genderParams = action.params,
                genderAttrsList = state.symptomAttrsList;

            return Object.assign({},
                state,
                {
                    symptomAttrsList: handleSymptomListChange(genderParams, genderAttrsList, 'genderArr')
                }
            );

        case ActionType.SYMPTOM_EDIT_NORMAL_AGERANGE:
            let ageRangeParams = action.params,
                ageRangeAttrsList = state.symptomAttrsList;

            return Object.assign({},
                state,
                {
                    symptomAttrsList: handleSymptomListChange(ageRangeParams, ageRangeAttrsList, 'ageArr')
                }
            );
        case ActionType.SYMPTOM_EDIT_NORMAL_CATEGORIES:
            if (state.categories) {

                let _categoreis = JSON.parse(JSON.stringify(state.categories)),
                    {value, idx}=action.params;
                _categoreis[idx].name = value;

                return Object.assign({},
                    state,
                    {
                        categories: _categoreis
                    }
                )
            } else {
                return Object.assign({}, state)
            }

        case ActionType.SYMPTOM_EDIT_NORMAL_DELETE_CATEGORIES:
            let _deleteCategoreis = JSON.parse(JSON.stringify(state.categories));
            _deleteCategoreis.splice(action.idx, 1);
            return Object.assign({}, state,
                {
                    categories: _deleteCategoreis
                }
            )

        case ActionType.SYMPTOM_EDIT_NORMAL_ADD_CATEGORIES:
            let _addCategoreis = state.categories ? JSON.parse(JSON.stringify(state.categories)) : [];
            for (let i = 0; i < _addCategoreis.length; i++) {
                if (_addCategoreis[i].id == action.params.id) {
                    return Object.assign({}, state)
                }
            }

            _addCategoreis.push(action.params)
            return Object.assign({}, state,
                {
                    categories: _addCategoreis
                }
            )

        case ActionType.SYMPTOM_EDIT_NORMAL_ADD_ATTRS:
            let _addAttrsSymptomAttrsList = state.symptomAttrsList ? JSON.parse(JSON.stringify(state.symptomAttrsList)) : [];
            let _newAttrs = {
                key: '',
                name: '新属性',
                metadataStr: '',
                genderArr: [],
                ageRangerArr: [],
                values: []
            }

            _addAttrsSymptomAttrsList.unshift(_newAttrs);
            return Object.assign({}, state,
                {
                    symptomAttrsList: _addAttrsSymptomAttrsList
                }
            )

        case ActionType.SYMPTOM_EDIT_NORMAL_ADD_ATTRSVALUES:
            let _addAttrsValSymptomAttrsList = state.symptomAttrsList ? JSON.parse(JSON.stringify(state.symptomAttrsList)) : [];
            let _newAttrsVal = {
                key: '',
                name: '新属性值',
                metadataStr: '',
                genderArr: [],
                ageRangerArr: []
            }

            _addAttrsValSymptomAttrsList[action.idx].values.unshift(_newAttrsVal);
            return Object.assign({}, state,
                {
                    symptomAttrsList: _addAttrsValSymptomAttrsList
                }
            )

        case ActionType.SYMPTOM_EDIT_NORMAL_REMOVE_ATTRS:
            let _removeAttrsSymptomAttrsList = JSON.parse(JSON.stringify(state.symptomAttrsList));

            _removeAttrsSymptomAttrsList.splice(action.idx, 1);
            return Object.assign({}, state,
                {
                    symptomAttrsList: _removeAttrsSymptomAttrsList
                }
            )

        case ActionType.SYMPTOM_EDIT_NORMAL_REMOVE_ATTRSVALUES:
            let _removeAttrsValSymptomAttrsList = JSON.parse(JSON.stringify(state.symptomAttrsList));

            _removeAttrsValSymptomAttrsList[action.attrsIdx].values.splice(action.valIdx, 1);
            return Object.assign({}, state,
                {
                    symptomAttrsList: _removeAttrsValSymptomAttrsList
                }
            )
        case ActionType.SYMPTOM_EDIT_NORMAL_SET_COMMON:
            let _commonSymptom = state.commonSymptom ? JSON.parse(JSON.stringify(state.commonSymptom)) : {},
                {common, weight}=action.params;
            if (common) {
                _commonSymptom.common = common == 'yes' ? true : false;
            }

            if (weight || weight == 0) {
                _commonSymptom.weight = weight;
            }

            return Object.assign({}, state,
                {
                    commonSymptom: _commonSymptom
                }
            )

        // labitem
        case ActionType.LABITEM_EDIT_NORMAL_CATEGORIES:
            let _labitemCategories = JSON.parse(JSON.stringify(state.categories));
            _labitemCategories[action.params.idx].value = action.params.value;
            return Object.assign({}, state,
                {
                    categories: _labitemCategories
                }
            )
        case ActionType.LABITEM_EDIT_NORMAL_INPVAL:
            let _labitemState = JSON.parse(JSON.stringify(state));
            _labitemState[action.params.type] = action.params.value;

            return Object.assign({}, state,
                _labitemState
            )

        case ActionType.EDIT_HANDLE_DEPARTMENT:

            let _handleDepartmentArr = state.departmentArr ? JSON.parse(JSON.stringify(state.departmentArr)) : [];

            _handleDepartmentArr.push(action.params);
            return Object.assign({}, state,
                {
                    departmentArr: _handleDepartmentArr
                }
            )
        case ActionType.EDIT_DELETE_DEPARTMENT:
            let _editDepartment = JSON.parse(JSON.stringify(state.departmentArr));

            _editDepartment.splice(action.idx, 1);
            return Object.assign({}, state,
                {
                    departmentArr: _editDepartment
                }
            )

        default:
            return state;
    }
}

function handleSymptomListChange(action, obj, opt) {

    let newList;
    if (action.type == 'attrs') {
        newList = obj.map(val=> {
            if (val.key == action.key) {
                val[opt] = action.value;
            }
            return val
        })

    } else if (action.type == 'attrsVal') {
        newList = obj.map(val=> {
            val.values.length > 0 && val.values.map(item=> {
                if (item.key == action.key) {
                    item[opt] = action.value;
                }
            })
            return val
        })
    }
    return newList
}

export const editEncy = (state = {
    content: [
        {title: '简介', row: 4, text: ''},
        {title: '典型症状', row: 1, text: ''},
        {title: '身体部位', row: 1, text: ''},
        {title: '病因及预防', row: 1, text: ''},
        {title: '临床表现', row: 4, text: ''},
        {title: '化验检查', row: 4, text: ''},
        {title: '诊断标准', row: 4, text: ''},
        {title: '护理及预后', row: 4, text: ''}
    ],
    id: ''
}, action)=> {
    switch (action.type) {

        case ActionType.EDIT_ENCY_INIT:
            return Object.assign({},
                state,
                {
                    content: [
                        {title: '简介', row: 4, text: ''},
                        {title: '典型症状', row: 1, text: ''},
                        {title: '身体部位', row: 1, text: ''},
                        {title: '病因及预防', row: 1, text: ''},
                        {title: '临床表现', row: 4, text: ''},
                        {title: '化验检查', row: 4, text: ''},
                        {title: '诊断标准', row: 4, text: ''},
                        {title: '护理及预后', row: 4, text: ''}
                    ]
                }
            )

        case ActionType.EDIT_ENCY_INPUT_VALUE:

            let content = JSON.parse(JSON.stringify(state.content));

            content.map(function (val) {

                action.arr.map(function (item) {
                    if (val.title == item.title) {
                        val.text = item.text
                    }
                })

            })

            return Object.assign({},
                state,
                {
                    content: content
                }
            )

        default:
            return state;
    }
}

export const editFooter = (state = {
    approveDisabled: false,
    setCurrentDisabled: true,

    approveValue: false,
    setCurrentValue: false,
    commitValue: ''
}, action)=> {

    let initState = {
        approveDisabled: false,
        setCurrentDisabled: true,

        approveValue: false,
        setCurrentValue: false,
        commitValue: ''
    }
    switch (action.type) {
        case ActionType.EDIT_FOOTER_INIT:
            return Object.assign({},
                initState
            )
        case ActionType.EDIT_FOOTER_APPROVE:
            return Object.assign({},
                state,
                {
                    approveValue: action.value,
                }
            )
        case ActionType.EDIT_FOOTER_SETCURRENT:
            return Object.assign({},
                state,
                {
                    setCurrentValue: action.value
                }
            )
        case ActionType.EDIT_FOOTER_COMMIT:
            return Object.assign({},
                state,
                {
                    commitValue: action.value
                }
            )
        case ActionType.EDIT_SET_STATE_APPROVE:
            return Object.assign({},
                state,
                {
                    approveDisabled: action.value
                }
            )
        case ActionType.EDIT_SET_STATE_SETCURRENT:
            return Object.assign({},
                state,
                {
                    setCurrentDisabled: action.value
                }
            )
        default:
            return state;
    }
}
