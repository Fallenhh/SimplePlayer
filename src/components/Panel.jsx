import React, { Component } from 'react';
import { Button, Slider, Row, Col } from 'antd';
import VolumeControl from './VolumeControl';
class Panel extends Component {
    state = {}

    timeFormatter = (seconds) => {
        if (isNaN(seconds)) { return "--:--" }
        seconds = Math.round(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    progressFormatter = () => {
        return this.timeFormatter(this.props.currentTime)
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={1}>
                        <Button
                            type="primary"
                            icon="step-backward"
                            shape="circle"
                            size="large"
                            onClick={this.props.handlePrev}
                        />
                    </Col>
                    <Col span={1}>
                        <Button
                            type="primary"
                            icon={this.props.onPlay ? 'pause' : 'caret-right'}
                            shape="circle"
                            size="large"
                            onClick={this.props.handlePlayPause}
                        />
                    </Col>
                    <Col span={1}>
                        <Button
                            type="primary"
                            icon="step-forward"
                            shape="circle"
                            size="large"
                            onClick={this.props.handleNext}
                        />
                    </Col>
                    <Col span={2}>
                        <div>
                            <font size="3">{this.timeFormatter(this.props.currentTime)}/{this.timeFormatter(this.props.duration)}</font>
                        </div>
                    </Col>
                    <Col xs={8} sm={10} md={12} lg={14} xl={16}>
                        <Slider
                            min={0}
                            max={1}
                            onChange={this.props.handleChangeProgress}
                            value={this.props.currentTime / this.props.duration}
                            step={0.0005}
                            tipFormatter={this.progressFormatter}
                        />
                    </Col>
                    <Col span={3}>
                        <VolumeControl
                            handleMute={this.props.handleMute}
                            handleChangeVolume={this.props.handleChangeVolume}
                            volume={this.props.volume}
                            muted={this.props.muted}
                        />
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Panel;