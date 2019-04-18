import React, { Component } from 'react';
import Panel from './Panel';
import PlayList from './PlayList';
class Music extends Component {
    state = {
        muted: false,
        onPlay: false,
        duration: 0,
        volume: 100,
        songList: [
            { index: 0, uri: "./test.mp3", title: "Discovery", artist: "Electro-Light" }],
        currentIndex: 0
    };


    audio = new Audio(this.state.songList[this.state.currentIndex].uri);

    tick() {
        // this.setState(prevState => ({
        //     seconds: prevState.seconds + 1
        // }));
        this.setState({
            duration: this.audio.duration,
            currentTime: this.audio.currentTime
        });
    }

    componentDidMount() {
        console.log('yes');
        this.audio.addEventListener("ended", () => { this.onNext() });
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    togglePlayPause = () => {
        this.setState({ onPlay: !this.state.onPlay }, () => {
            this.state.onPlay ? this.audio.play() : this.audio.pause();
        });
    }

    toggleMute = () => {
        this.setState({ muted: !this.state.muted }, () => {
            this.audio.muted = this.state.muted;
        });
    }

    onNext = () => {
        this.setState({ currentIndex: ((this.state.currentIndex + 1) % this.state.songList.length) }, () => {
            this.audio.src = this.state.songList[this.state.currentIndex].uri;
            if (this.state.onPlay) {
                this.setState({ onPlay: true }, () => {
                    this.audio.play();
                })
            }
        });

    }

    onPrev = () => {
        this.setState({ currentIndex: ((this.state.currentIndex - 1 + this.state.songList.length) % this.state.songList.length) }, () => {
            this.audio.src = this.state.songList[this.state.currentIndex].uri;
            if (this.state.onPlay) {
                this.setState({ onPlay: true }, () => {
                    this.audio.play();
                })
            }
        });
    }

    onChangeProgress = (progress) => {
        this.audio.currentTime = this.audio.duration * progress;
        this.setState({
            currentTime: this.audio.duration * progress
        });
    }
    onChangeVolume = (volume) => {
        this.audio.volume = volume / 100;
        this.setState({ volume: volume });
        this.setState({ muted: false }, () => {
            this.audio.muted = this.state.muted;
        });
    }

    getSongList = () => {
        console.log('test');
        fetch('http://musicapi.leanapp.cn/playlist/detail?id=82954460')
            .then(response => {
                return response.json();
            })
            .then(playlistDetail => {
                console.log(playlistDetail);
                const { playlist } = playlistDetail;
                const { trackIds } = playlist;
                this.setState({
                    songList: trackIds.map((track, index) => {
                        return { index: index, uri: `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`, title: 'test', artist: 'test' }

                    })
                    , currentIndex: 0
                }, () => { this.audio.src = this.state.songList[this.state.currentIndex].uri })
            });
    }

    render() {
        return (
            <div>
                <div>
                    <Panel
                        onPlay={this.state.onPlay}
                        handlePlayPause={this.togglePlayPause}
                        handleNext={this.onNext}
                        handlePrev={this.onPrev}
                        progress={this.state.currentTime / this.state.duration}
                        handleChangeProgress={this.onChangeProgress}
                        duration={this.state.duration}
                        currentTime={this.state.currentTime}
                        handleMute={this.toggleMute}
                        handleChangeVolume={this.onChangeVolume}
                        volume={this.state.volume}
                        muted={this.state.muted}
                    />
                </div>
                <div>
                    <PlayList
                        songList={this.state.songList}
                        currentIndex={this.state.currentIndex}
                        getSongList={this.getSongList}
                    />
                </div>
            </div>
        );
    }
}

export default Music;