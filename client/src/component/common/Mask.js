import * as React from 'react';
import './css/mask.less';
import classNames from "classnames";
export default class Mask extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const transparent = this.props.transparent;
        const className = classNames({
            'kad_mask': !transparent,
            'kad_mask_transparent': transparent
        });
        return (React.createElement("div", {className: className}));
    }
}
