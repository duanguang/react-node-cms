/**
 * Created by DuanG on 2016/12/2.
 */
import * as React from 'react';
import {ICon} from "../ico/ICon";
import VButton from "./VButton";
export const VCardUpload=(props)=>{
    return(
        <div>
            <ICon  type="plus" />
            <div  className="ant-upload-text">上传照片</div>
        </div>
    )
}
export const VTextUpload=(props)=>{
    return(
        <VButton type="ghost">
            <ICon type="upload"/> 点击上传
        </VButton>
    )
}