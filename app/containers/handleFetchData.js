let ageTemp = [
    {label: '新生儿', value: 'AgeRangeNewborn'},
    {label: '儿童', value: 'AgeRangeChild'},
    {label: '青年', value: 'AgeRangeYoung'},
    {label: '成人', value: 'AgeRangeAdult'},
    {label: '老年', value: 'AgeRangeOlder'}
];

export const handleFetchData = function (data, type, v,asideNav) {
    /*
     * v : bool,是否为某个版本的数据
     * type : 处理的数据类型，normal，ency，synonyms
     * */

    let _data = {}

    if (v) {
        _data.versionID = data.id || '';
    } else {
        _data.id = data.id || "";
    }

    if (data.metadata) {
        let metadata = data.metadata;

        if (metadata.revision) {
            let revision = metadata.revision

            if (v) {
                _data.id = revision.id || '';
            } else {
                _data.versionID = revision.versionID || '';
            }
        }
        if (metadata.basic) {
            let basic = metadata.basic;

            _data.publishState = basic.published || false;
            _data.publishTime = basic.publishedTime && basic.publishedTime != '0001-01-01T00:00:00.000Z' ? (new Date(basic.publishedTime)).toLocaleString() : "";
            _data.latestUpdateTime = basic.latestUpdateTime && basic.latestUpdateTime != '0001-01-01T00:00:00.000Z' ? (new Date(basic.latestUpdateTime)).toLocaleString() : "";
            _data.latestUpdateByUser = basic.latestUpdateByUser || "";
        }
    }

    if (type == 'normal') {
        normal(data, _data, asideNav)

    } else if (type == 'ency') {
        ency(data, _data)

    } else if (type == 'synonyms') {
        synonyms(data, _data)

    } else if(type=="structured"){      //数据结构化
        structured(data,_data)
    }


    let _json = {
        id: _data.id,
        versionID: _data.versionID,
        latestUpdateTime: _data.latestUpdateTime,
        latestUpdateByUser: _data.latestUpdateByUser
    }

    let _publishState = {
        publishState: _data.publishState,
        publishTime: _data.publishTime
    }

    return {_data, _json, _publishState};
}

export const handleVersionsList = function (data) {
    let draftData = {},
        currentData = {},
        historyVersions = [];

    if (data.versions) {

        data.versions.forEach(function (val, idx) {
            if (val.metadata) {
                let metadata = val.metadata;

                let time = '',
                    name = '',
                    id = '',
                    vid = val.id;

                id = metadata.revision ? (metadata.revision.id ? metadata.revision.id : "") : "";
                if (metadata.basic) {
                    let basic = metadata.basic;
                    time = basic.latestUpdateTime && basic.latestUpdateTime != '0001-01-01T00:00:00.000Z' ? (new Date(basic.latestUpdateTime)).toLocaleString() : "";
                    name = metadata.basic.latestUpdateByUser || "";
                }


                if (metadata.revision.current) {    //当前版本
                    currentData.id = id;
                    currentData.time = time;
                    currentData.name = name;
                    currentData.vid = vid;

                } else if (metadata.basic.draft) {   //草稿
                    draftData.id = id;
                    draftData.time = time;
                    draftData.name = name;
                    draftData.vid = vid;

                } else {        //历史版本
                    let json = {};
                    json.time = time;
                    json.name = name;
                    json.id = id;
                    json.vid = vid;
                    historyVersions.push(json);

                }

            }
        })

    }

    //前端设置当前版本
    // let _currentV={
    //     id: "",
    //     latestUpdateByUser: "",
    //     latestUpdateTime: "",
    //     versionID: ""
    // }
    //
    // if(JSON.stringify(currentData)!='{}'){
    //     _currentV.id=currentData.id || '';
    //     _currentV.latestUpdateByUser=currentData.name || '';
    //     _currentV.latestUpdateTime=currentData.time || '';
    //     _currentV.versionID=currentData.vid || '';
    //
    // }else if(JSON.stringify(draftData)!='{}'){
    //     _currentV.id=draftData.id || '';
    //     _currentV.latestUpdateByUser=draftData.name || '';
    //     _currentV.latestUpdateTime=draftData.time || '';
    //     _currentV.versionID=draftData.vid || '';
    //
    // }else if(historyVersions.length>0){
    //     let _h=historyVersions[0];
    //     _currentV.id=_h.id || '';
    //     _currentV.latestUpdateByUser=_h.name || '';
    //     _currentV.latestUpdateTime=_h.time || '';
    //     _currentV.versionID=_h.vid || '';
    //
    // }
    //前端设置当前版本end

    let _data = {
        draftData: draftData,
        currentData: currentData,
        historyVersions: historyVersions,
        // currentV:_currentV
    }

    return _data
}

// 处理标准(疾病)
function normal(data, _data,asideNav) {

    let content = data.content || {};
    if (content.name) {
        let name = content.name;

        _data.name = name.name || "";
        _data.friendlyName = name.friendlyName || "";
        _data.shortName = name.shortName || "";
    }

    if (content.constraint) {
        let constraint = content.constraint;
        if (constraint.ageRanges) {
            let ageRange = constraint.ageRanges,
                {str,arr}=handleAge(ageRange);
            _data.ageRange=arr;
            _data.ageRangeCont=str;

        }
        if (constraint.genders) {
            let gender = constraint.genders,
                {str,arr}=handleGender(gender);
            _data.gender = arr;
            _data.genderCont=str;

        }
    }

    if (content.icd10s) {
        let icd10s = content.icd10s;
        _data.icd10 = icd10s;

        // resolveICD10(icd10s,_data);
    }


    // 解析科室数据
    // if (content.department) {
    //     let department = content.department;
    //     _data.departmentId = department.id || '';
    //
    //     if (department.content && department.content.name) {
    //         _data.departmentText = department.content.name.name || '';
    //     }
    // } else {
    //     _data.departmentId = '';
    //     _data.departmentText = '';
    // }
    // 解析科室数据完


    if(asideNav=='symptom'){    //调用症状数据处理函数
        symptom(data,_data)
    }else if(asideNav=='labitem'){
        labitem(data,_data)
    }
}


//处理年龄段约束
function handleAge(ageRange){
    let str='',arr=[];
    ageRange.map(val=>{
        ageTemp.map(item=>{
            if(val==item.value){
                str+=item.label+" ，";
                arr.push(val)
            }
        })
    });

    return {str,arr}
}
//处理性别约束
function handleGender(gender){
    let str='',arr=[];
    gender.map(val=>{
        if(val=="GenderMale"){
            str+='男 ，';
            arr.push(val)

        }else if(val=="GenderFemale"){
            str+='女 ，';
            arr.push(val)

        }
    })
    return {str,arr}
}
// 处理百科
function ency(data, _data) {

    let content = data.content || {};

    _data.chapters = content.chapters || [];

    if (content.name) {
        let name = content.name;
        _data.name = name.name;
        _data.shortName = name.shortName;
        _data.friendlyName = name.friendlyName
    }
}

// 处理同义词
function synonyms(data, _data) {
    let content = data.content || {};
    _data.content = content.items || [];

    if (content.name) {
        let name = content.name;
        _data.name = name.name;
        _data.shortName = name.shortName;
        _data.friendlyName = name.friendlyName
    }
}

// 处理结构化
function structured(data,_data){
    let content = data.content || {};

    _data.labeledText=content.labeledText || '';
    _data.originText=content.originText || '';

    if(content.name && JSON.stringify(content.name) != '{}'){
        _data.name=content.name.name || '';
        _data.friendlyName=content.name.friendlyName || '';
        _data.shortName=content.name.shortName || '';
    }

}

// 处理症状
function symptom(data, _data) {
    let content = data.content || {};

    if(content.metadata && content.metadata.weight){
        _data.weight=content.metadata.weight.toString();
    }

    _data.categories=[];    //当前症状归属分类
    _data.symptomAttrsList=[];  //当前症状属性列表

    //当前文档分类
    if(content.categories &&content.categories.length>0){

        let len=content.categories.length;
        for(var i=0;i<len;i++){

            let val=content.categories[i];

            if( val.content && (!val.content.series || val.content.series=='')){
                continue;
            }
            let json={
                id:val.id,
            };

            if(val.content && JSON.stringify(val.content) != "{}"){
                let name=val.content.name && JSON.stringify(val.content.name) != '{}'?val.content.name : {};
                json.name=name.name;
                json.series=val.content.series || '';
            }
            _data.categories.push(json);
        }
    }

    // 常见症状
    _data.commonSymptom={
        common:false,
        weight: 0
    }
    if(content.commonItemOption && JSON.stringify(content.commonItemOption) != '{}'){
        let common=content.commonItemOption;
        _data.commonSymptom={
            common:common.common || false,
            weight:common.weight || 0
        }
    }

    //处理属性
    if(content.attrs && content.attrs.length>0){
        // _data.symptomAttrsList=[];
        let len=content.attrs.length;

        for(let i=0;i<len;i++){

            let val=content.attrs[i];
            if( !val.key || val.key=='' || !val.name || JSON.stringify(val.name)=='{}' || val.name.name ==''){
                continue;
            }

            let _attrs=handleSymptomAttrs(val).json;
            _attrs.values=[];

            if(val.values && val.values.length>0){
                let _l=val.values.length;
                for(let i=0;i<_l;i++){
                    let item=val.values[i];
                    let {json}=handleSymptomAttrs(item);
                    _attrs.values.push(json);
                }
            }
            _data.symptomAttrsList.push(_attrs);
        }
    }
}

//处理化验
function labitem(data, _data) {
    let content = data.content || {};

    _data.labitemHigherNormal='';
    _data.labitemLowerNormal='';
    _data.labitemUnit='';
    _data.weight='';

    if(content.metadata && content.metadata.weight){
        _data.weight=content.metadata.weight.toString();
    }

    _data.labitemSet=content.set || '';
    _data.labitemSpecimen=content.specimen || '';

    if(content.value && JSON.stringify(content.value) != "{}"){
        let value=content.value;
        _data.labitemHigherNormal=value.higherNormal;
        _data.labitemLowerNormal=value.lowerNormal;
        _data.labitemUnit=value.unit;
    }

    _data.categories=[];    //当前症状归属分类
    //当前文档分类
    if(content.category ){

        let categories=content.category;
        for(let item in categories){
            let json={
                name:item,
                value:categories[item]
            }
            _data.categories.push(json);
        }
    }

}

function handleSymptomAttrs(val){
    let json={
        key:val.key,
        name:val.name.name,
        // weight: '',
        constraintStr:'',
        metadataStr:'',
    };

    if(val.metadata && JSON.stringify(val.metadata) != '{}' && val.metadata.weight){
        // json.weight=val.metadata.weight;
        json.metadataStr=val.metadata.weight;
    }
    if(val.constraint && JSON.stringify(val.constraint)!='{}'){
        let constraint=val.constraint;

        if(constraint.genders && constraint.genders.length>0){
            let {str,arr}=handleGender(constraint.genders);
            json.genderArr=arr;
            json.genderStr=str;
            json.constraintStr+=str;
        }

        if(constraint.ageRanges && constraint.ageRanges.length>0){
            let {str,arr}=handleAge(constraint.ageRanges);
            json.ageStr=str;
            json.ageArr=arr;
            json.constraintStr+=str;
        }


    }
    return {json}
}



export function handleFetchUserInfo(data) {


    let json = {
        userID: data.userID,
        isVisitor: data.isReader || false,
        limit: {}
    }
    if(data.isReader){
        json.isVisitor=true;
    }else{
        data.scopePermissions.map((val)=> {

            if (val.edit) {
                json.limit[val.scope] = 'editor';
            } else if (val.manage) {
                json.limit[val.scope] = 'manager';
            }
            // else {
            //     json.limit[val.scope] = 'visitor';
            // }

        })
    }

    return json;
}

export function handleAdminStats(data) {
    /*
        let total = [
            {name: '疾病', num: '280', current: 'disease'},
        ];

        let type = [
            {name: '标准', current: 'normal', num: 120},
        ];

        let tabCont = [
            {name: '待审核', num: '0', current: 'audit'},
        ];
    */

    let dictionary = [
        {name:'疾病',current:'disease'},
        {name:'检查',current:'examitem'},
        {name:'化验',current:'labitem'},
        {name:'症状',current:'symptom'},
        {name:'结构化',current:'conll'}
    ];
    let stats = [];
    let clsStats = {
        typeCount: [
            {name: '标准', current: 'normal', num:0},
            {name: '百科', current: 'wiki', num:  0},
            {name: '同义词', current: 'synonyms', num: 0}
        ],
        tabCount:[
            {name: '待审核', current: 'audit', num:  0},
            {name: '编辑中', current: 'edit', num:0},
            {name: '已拒绝', current: 'refused', num:0}
        ]
    };


    if (data.stats && JSON.stringify(data.stats) != '{}'){
        for(let i in data.stats){

            let val=data.stats[i];

            let commonStats = val.commonStats || {};
            dictionary.map((item)=> {

                if (val.scope == item.current) {
                    stats.push({
                        name: item.name,
                        current: val.scope,
                        num: commonStats.totalCount ? commonStats.totalCount : 0,
                        userType: val.userType || ''
                    })
                }
            });

            clsStats[val.scope] = {
                typeCount: [
                    {name: '标准', current: 'normal', num: commonStats.standardCount ? commonStats.standardCount : 0},
                    {name: '百科', current: 'wiki', num: commonStats.wikiCount ? commonStats.wikiCount : 0},
                    {name: '同义词', current: 'synonyms', num: commonStats.synonymCount ? commonStats.synonymCount : 0}
                ],
                tabCount: []
            };

            if (val.userType == 'manager') {
                let managerStats = val.managerStats || {};
                clsStats[val.scope].tabCount = [
                    {name: '待审核', current: 'audit', num: managerStats.auditDocCount ? managerStats.auditDocCount : 0},
                    {name: '待修改', current: 'modify', num: managerStats.editDocCount ? managerStats.editDocCount : 0},
                    {name: '已拒绝', current: 'refused', num: managerStats.refusedDocCount ? managerStats.refusedDocCount : 0},
                    {name: '待发布',current: 'publish', num: managerStats.toPublishDocCount ? managerStats.toPublishDocCount : 0 }
                ]

            } else if (val.userType == 'editor') {
                let editorStats = val.editorStats || {};
                clsStats[val.scope].tabCount = [
                    // {name: '已通过', current: 'audit', num: editorStats.admitDocCount ? editorStats.admitDocCount : 0},
                    {name: '待审核', current: 'audit', num: editorStats.auditDocCount ? editorStats.auditDocCount : 0},
                    {name: '编辑中', current: 'edit', num: editorStats.editDocCount ? editorStats.editDocCount : 0},
                    {name: '已拒绝', current: 'refused', num: editorStats.refusedDocCount ? editorStats.refusedDocCount : 0}
                ]
            }


        }
    }

    return {stats, clsStats}
}

export function handleAdminTable(data) {
    let list = [],
        stats = {};

    stats.start = data.start || 0;
    stats.size = data.size || 10;
    stats.count = data.count || 1;

    data.documents && data.documents.length > 0 && data.documents.map(function (val, idx) {
        let time = '',
            json = {};

        json.name = val.content.name ? (val.content.name.name ? val.content.name.name : '') : '';
        json.id = val.id;
        json.vid = val.revision ? (val.revision.versionID ? val.revision.versionID : '') : '';

        if (val.metadata && val.metadata.basic) {
            let basic = val.metadata.basic;
            if (basic.latestUpdateTime && basic.latestUpdateTime != "0001-01-01T00:00:00.000Z") {
                time = (new Date(basic.latestUpdateTime)).toLocaleString();
            }
            json.user = basic.latestUpdateByUser ? basic.latestUpdateByUser : '';
        }

        json.time = time;
        list.push(json)

    });

    return {list, stats}

}


