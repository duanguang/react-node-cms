import * as React from 'react';
import { ICon } from "../ico/ICon";
import VButton from "./VButton";
export const VCardUpload = (props) => {
    return (React.createElement("div", null, React.createElement(ICon, {type: "plus"}), React.createElement("div", {className: "ant-upload-text"}, "上传照片")));
};
export const VTextUpload = (props) => {
    return (React.createElement(VButton, {type: "ghost"}, React.createElement(ICon, {type: "upload"}), " 点击上传"));
};
