import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Treebeard } from 'react-treebeard';

let styles = {
    marginTop: '20px',
};


class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.data };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled) {
        const { cursor, data } = this.state;
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <Treebeard
                    data={data}
                    onToggle={this.onToggle}
                />
            </div >
        );
    }
}

const mapStateToProps = state => {
    const result = state.songs.reduce(function (r, a) {
        const k = a.band + " - " + a.album
        r[k] = r[k] || [];
        r[k].push(a);
        return r;
    }, Object.create(null));

    const songs = Object.keys(result).reduce(function (acc, key) {
        const ch = result[key].map(function (obj) {
            return { name: obj.song };
        });
        acc.push({ name: key, toggled: false, children: ch });

        return acc;
    }, []);

    const album = (({ name: "Albums", toggle: false, children: songs }))

    return { data: album };
};

export default connect(mapStateToProps, {})(SongList);