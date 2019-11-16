import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, View,YellowBox } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import axios from 'axios';


class VideoStudy extends Component {
  videoPlayer;
 
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      Url:'',
      currentTime: 0,
      duration: 0,
      isFullScreen: true,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
  }
  componentDidMount(){
    axios.get("https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")
    .then(res=>{
        // console.log(res.config.url)
        this.setState({Url:res.config.url})
        // console.log(this.state.users)
    } )
}
 
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => { alert('Exit full screen'); };
    
  
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });
 
  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          // source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
          source={{uri: this.state.Url}}
          style={styles.mediaPlayer}
          volume={10}
          resizeMode={"cover"}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
    );
  }
}
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    // height:100
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    // height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    width:'100%',
  
  },
});
export default VideoStudy;