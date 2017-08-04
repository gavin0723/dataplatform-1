import {_fetchData} from "../../actions";

export const submitProcess ={

    commitCallback:function(params){

        let {data, type, modal, editFooter, scope, setSubmitState}=params;
        let self=this;

        if (type == 'save') {  // 仅保存草稿

            let _arr = [
                {title: '保存', description: '保存成功', status: 'finish'},
                {title: '提议', description: '', status: 'wait'},
                {title: '批准', description: '', status: 'wait'},
                {title: '发布至当前版本', description: '', status: 'wait'},
            ];
            setSubmitState(_arr);
            modal(true, '_editCommit');

        } else if (type == 'propose') {

            let _arr = [
                {title: '保存', description: '保存成功', status: 'finish'},
                {title: '提议', description: '正在提议...', status: 'wait'},
                {title: '批准', description: '', status: 'wait'},
                {title: '发布至当前版本', description: '', status: 'wait'},
            ];
            setSubmitState(_arr);

            if (!editFooter.approveValue) {  // 提议

                let _params={data, type, scope, modal, setSubmitState};
                self.propose(_params);

            } else {  //提议并批准

                let _params={data, type, scope, modal, editFooter, setSubmitState};
                self.admit(_params);

            }
        }

    },

    propose:function(params) {  //提议

        let {data, type, scope, modal, setSubmitState}=params;
        let vid = data.versionID;

        _fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${vid}/propose`,
            method: 'post',
            data: data,
            success: function () {

                let _arr = [
                    {title: '保存', description: '保存成功', status: 'finish'},
                    {title: '提议', description: '提议成功', status: 'finish'},
                    {title: '批准', description: '', status: 'wait'},
                    {title: '发布至当前版本', description: '', status: 'wait'},
                ];
                setSubmitState(_arr);


            },
            error: function () {
                let _arr = [
                    {title: '保存', description: '保存成功', status: 'finish'},
                    {title: '提议', description: '提议失败', status: 'error'},
                    {title: '批准', description: '', status: 'wait'},
                    {title: '发布至当前版本', description: '', status: 'wait'},
                ];
                setSubmitState(_arr);
            },
            complete: function () {
                modal(true, '_editPropose');
            }
        })
    },

    admit:function(params) {  //提议并批准

        let self=this;
        let {data, type, scope, modal, editFooter, setSubmitState}=params;
        let vid = data.versionID;

        _fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${vid}/admit`,
            method: 'post',
            data: {},
            success: function (data) {

                if (!editFooter.setCurrentDisabled && editFooter.setCurrentValue) {  //设为当前版本

                    let _arr = [
                        {title: '保存', description: '保存成功', status: 'finish'},
                        {title: '提议', description: '提议成功', status: 'finish'},
                        {title: '批准', description: '已批准', status: 'finish'},
                        {title: '发布至当前版本', description: '正在发布...', status: 'wait'}
                    ];
                    setSubmitState(_arr);

                    let _params={vid, scope, modal, setSubmitState};
                    self.setCurrent(_params);

                } else {

                    let _arr = [
                        {title: '保存', description: '保存成功', status: 'finish'},
                        {title: '提议', description: '提议成功', status: 'finish'},
                        {title: '批准', description: '已批准', status: 'finish'},
                        {title: '发布至当前版本', description: '', status: 'wait'},
                    ];
                    setSubmitState(_arr);

                    modal(true, '_editAdmit')

                }

            },
            error: function () {
                let _arr = [
                    {title: '保存', description: '保存成功', status: 'finish'},
                    {title: '提议', description: '提议失败', status: 'finish'},
                    {title: '批准', description: '', status: 'error'},
                    {title: '发布至当前版本', description: '', status: ''},
                ];
                setSubmitState(_arr);

                modal(true, '_editAdmit')

            }
        })
    },

    setCurrent:function(params){  //设为当前版本

        let {vid, scope, modal, setSubmitState}=params;

        _fetchData({
            url: `/_/dataplatform/document/repository/${scope}/version/${vid}/setcurrent`,
            method: 'post',
            data: {},
            success: function () {
                let _arr = [
                    {title: '保存', description: '保存成功', status: 'finish'},
                    {title: '提议', description: '提议成功', status: 'finish'},
                    {title: '批准', description: '已批准', status: 'finish'},
                    {title: '发布至当前版本', description: '发布成功', status: 'finish'},
                ];
                setSubmitState(_arr)

            },
            error: function () {
                let _arr = [
                    {title: '保存', description: '保存成功', status: 'finish'},
                    {title: '提议', description: '提议成功', status: 'finish'},
                    {title: '批准', description: '已批准', status: 'finish'},
                    {title: '发布至当前版本', description: '发布失败', status: 'error'},
                ];

                setSubmitState(_arr)
            },
            complete: function () {
                modal(true, '_editSetCurrent')

            }
        })
    }
}
