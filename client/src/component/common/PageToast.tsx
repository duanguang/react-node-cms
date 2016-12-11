import * as React from "react";
import {IPageContextProps, page} from "../../utils/page";
import Toast from "./Toast";

interface IPageToastProps extends IPageContextProps {

}

@page()
export default class PageToast extends React.Component<IPageToastProps,void> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {loading, submitting} = this.props.page;

        return (
            <Toast show={loading || submitting} icon="loading">
                { submitting ? '数据提交中' : '数据加载中'}
            </Toast>
        );
    }
}