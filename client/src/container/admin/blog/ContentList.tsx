/**
 * Created by DuanG on 2016/12/9.
 */
import * as React from 'react';
import {PromiseState, PromiseStatus} from "../../../utils/redux";
import {connect} from 'react-redux';
import Dispatch = Redux.Dispatch;
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import {RoutesPath} from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";
import {VRow} from "../../../component/layout/VRow";
import {VCol} from "../../../component/layout/VCol";
import GenericComponent from "../../../component/abstract/GenericComponent";
import {CurrentMenu} from "../../../model/menu/currentMenu";
import ContentPageListContainer from "./ContentPageListContainer";


export default class ContentList extends GenericComponent<void,void>{
    private baseCls='cate';
    private currentMenu:CurrentMenu={
        key:RoutesPath.menu.blog.children.contentList.key,
        path:RoutesPath.menu.blog.children.contentList.key,
        title:RoutesPath.menu.blog.children.contentList.title,
        parentTitle:RoutesPath.menu.blog.title,
        parentKey:RoutesPath.menu.blog.key
    }
    constructor(props){
        super(props);
    }




    componentWillReceiveProps(nextProps){

    }
    render(){

        return(
            <div className="panel">
                <SetCurrentMenu currentMenu={this.currentMenu}/>
                <div className="panel-head">
                    <VRow type="flex" justify='start'>
                        <VCol >
                            <strong>内容信息</strong>
                        </VCol>
                        <VCol>
                        </VCol>

                    </VRow>

                </div>
                <div className="padding border-bottom">

                    <ContentPageListContainer
                    >
                    </ContentPageListContainer>

                </div>

            </div>
        )
    }
}