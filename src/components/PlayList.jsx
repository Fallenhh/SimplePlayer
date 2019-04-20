import React, { Component } from 'react';
import { List, Button, Input } from 'antd';
class PlayList extends Component {
    state = {}
    render() {
        return (
            <div>
                <Input
                    placeholder="Playlist Id e.g. 82954460"
                    onChange={this.props.handleChangePlaylist}
                />
                <Button
                    onClick={this.props.handleSongList}
                    type="primary">
                    Get
                </Button>

                <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={this.props.songList}
                    renderItem={item => (
                        <List.Item key={item.index}>
                            <List.Item.Meta
                                title={<font color={item.index === this.props.currentIndex ? "blue" : "black"}>{item.title}</font>}
                                description={<font color={item.index === this.props.currentIndex ? "cornflowerblue" : "grey"}>{item.artist}</font>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default PlayList;