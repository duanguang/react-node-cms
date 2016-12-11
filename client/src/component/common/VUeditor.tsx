/**
 * Created by xiaoduan on 2016/12/3.
 */
import * as React from 'react';
import {IAntdProps} from "custom-antd";
import {ueditor} from "../../utils/ueditor";

export interface IVUeditorProps{
}

export default class VUeditor extends React.Component<IAntdProps&IVUeditorProps,any>{
    private editor;
    constructor(props) {
        super(props);
    }
    initEditor(){
        var ue=ueditor(this.props.id);
        this.editor = ue;
        var me = this;
        this.editor.ready( function( ueditor ) {
            if(!ueditor){
                UE.delEditor(me.props.id);
                me.initEditor();
            }
            /*var value = me.props.value?me.props.value:'<p></p>';
            console.log(me)
            editor.setContent(value);*/
        });
    }
    componentDidMount(){
        this.initEditor();
    }
    render() {
        return (
            <script id={this.props.id}  name="content" type="text/plain">

            </script>
        )
    }
}