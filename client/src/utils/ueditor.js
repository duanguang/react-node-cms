/**
 * Created by xiaoduan on 2016/12/3.
 */
require('../../common/libs/ueditor/ueditor.config.js');
require('../../common/libs/ueditor/ueditor.all.min.js');
require('../../common/libs/ueditor/zh-cn.js');
export const ueditor = (id) => {
    return UE.getEditor(id || 'content', { toolbars: [[
                'fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
                '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'simpleupload',
                'horizontal', 'date', 'time',
            ]],
        lang: "zh-cn",
        'fontfamily': [
            { label: '', name: 'songti', val: '宋体,SimSun' },
            { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
            { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
            { label: '', name: 'heiti', val: '黑体, SimHei' },
            { label: '', name: 'lishu', val: '隶书, SimLi' },
            { label: '', name: 'andaleMono', val: 'andale mono' },
            { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
            { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
            { label: '', name: 'comicSansMs', val: 'comic sans ms' },
            { label: '', name: 'impact', val: 'impact,chicago' },
            { label: '', name: 'timesNewRoman', val: 'times new roman' }
        ],
        'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
        enableAutoSave: false,
        autoHeightEnabled: false,
        initialFrameHeight: 200,
        initialFrameWidth: '100%',
        readonly: false,
        UEDITOR_HOME_URL: '/common/libs/ueditor/',
        serverUrl: '',
        codeMirrorJsUrl: 'http://127.0.0.1:3008',
        codeMirrorCssUrl: 'http://127.0.0.1:3008'
    });
};
export function getContent(id) {
    let content = '';
    let editor = ueditor(id);
    if (editor) {
        content = editor.getContent();
    }
    return content;
}
