import _ from "lodash";
import React, { Component } from 'react';
import logo from './../logo.svg';
import YTSearch from "youtube-api-search";
import SearchBar from './search_bar';
import VideoList from "./video_list";
import VideoDetail from "./video_detail";
const API_KEY = "AIzaSyCFzP5lTSMN11NaHSWNjGiCwp0XXEPn-YA";

class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("marshmello");
  }
    
    videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
    
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Video App</h1>
          </header>
        </div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
