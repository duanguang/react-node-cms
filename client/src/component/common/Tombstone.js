import * as React from 'react';
export default class TombstoneComponent extends React.Component {
    store() {
        this.props.storeModel && this.props.storeModel(this.state);
        this.$tombstone = true;
    }
    restore() {
        return this.props.$$state;
    }
    routerWillLeave(nextLocation) {
        if (!this.$tombstone) {
            this.props.clearModel && this.props.clearModel();
        }
    }
}
