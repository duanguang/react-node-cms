/**
 * Created by DuanG on 2016/12/2.
 */
import * as React from 'react';
export default class FilterPropsComponent<Props,State> extends React.Component<Props,State>{
    protected getFilterProps() {
        let newProps = {} as Props;
        for (let key in this.props) {
            const targetValue = this.props[key];
            if (typeof targetValue != 'undefined'||key==='value') {
                newProps[key] = targetValue;
            }
        }
        return newProps
    }
}