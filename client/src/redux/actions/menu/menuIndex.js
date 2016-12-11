import { PromiseActionType, PromiseAction } from "../../../utils/redux";
import * as menuService from '../../../api/menu/menuService';
/**
 * Created by xiaoduan on 2016/11/17.
 */
export const GET_CURRENT_MENU = new PromiseActionType('menu/menuIndex/GET_CURRENT_MENU');
export function getCurrentMenu(currentMenu) {
    return (dispatch, getState) => {
        let currentMenuProps = getState().menuIndex.currentMenu.data;
        if (!currentMenuProps || (currentMenuProps && currentMenuProps.key !== currentMenu.key)) {
            dispatch(new PromiseAction(() => menuService.getCurrentMenu(currentMenu), GET_CURRENT_MENU.types));
        }
    };
}
export function getCurrentMenuProps() {
    return (dispatch, getState) => {
        let currentMenuProps = getState().menuIndex.currentMenu.data;
        if (currentMenuProps) {
            dispatch(new PromiseAction(() => {
                return new Promise((resolve) => {
                    resolve(getState().menuIndex.currentMenu);
                });
            }, GET_CURRENT_MENU.types));
        }
    };
}
