import React, { Component } from 'react';
import { List, Button } from 'antd';
class PlayList extends Component {
    state = {}
    render() {
        return (
            <div>

                <Button onClick={this.props.getSongList} type="primary">log</Button>
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