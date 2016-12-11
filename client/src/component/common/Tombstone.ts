import * as React from 'react';

export interface ITombstoneProps<TState> {
    $$state:TState;
    storeModel:(state:TState)=>void;
    clearModel:()=>void;
}

export default class TombstoneComponent<TProps extends ITombstoneProps<TState>,TState> extends React.Component<TProps,TState> {
    private $tombstone:boolean;

    store() {
        this.props.storeModel && this.props.storeModel(this.state);
        this.$tombstone = true;
    }

    restore():TState {
        return this.props.$$state;
    }

    routerWillLeave(nextLocation) {
        if(!this.$tombstone){
            this.props.clearModel && this.props.clearModel();
        }
    }
}
