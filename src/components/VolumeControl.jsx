import React, { Component } from 'react';
import { Button, Slider, Row, Col } from 'antd';
class VolumeControl extends Component {
    state = {}
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Button
                            onClick={this.props.handleMute}
                            type={this.props.muted ? "danger" : ""}
                            shape="circle" icon="sound"
                        />
                    </Col>
                    <Col span={18}>
                        <Slider
                            onChange={this.props.handleChangeVolume}
                            value={this.props.volume}
                            min={0}
                            max={100}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default VolumeControl;