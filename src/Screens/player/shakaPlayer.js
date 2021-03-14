import React from "react"
const shaka = require("shaka-player/dist/shaka-player.ui.js")
import $ from "jquery"
import {trackEvent} from '../../manager/analyticsManager'

import "./player.css"
import "shaka-player/dist/controls.css"
//Creating class component
class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    // ;
    //Creating reference to store video component on DOM
    this.videoComponent = React.createRef()

    //Creating reference to store video container on DOM
    this.videoContainer = React.createRef()

    //Initializing reference to error handlers
    this.onErrorEvent = this.onErrorEvent.bind(this)
    this.onError = this.onError.bind(this)
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail)
  }

  onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error)
  }

  componentDidMount() {
    $(".loader-wrapper").show()
    $(".logo").hide()
    //Link to MPEG-DASH video
    var manifestUri = "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd"
    //'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    var wideVineLicenceUrl = "https://widevine-proxy.appspot.com/proxy"

    //Getting reference to video and video container on DOM
    const video = this.videoComponent.current
    const videoContainer = this.videoContainer.current

    //Initialize shaka player
    var player = new shaka.Player(video)

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video)
    ui.getControls()

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent)
    player.configure({
      drm: {
        servers: {
          "com.widevine.alpha": wideVineLicenceUrl,
        },
      },
    })

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(manifestUri)
      .then(function () {
        $(".loader-wrapper").hide() //hides the loader
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!")
        trackEvent('Screen View',{"PageName": "Player Screen"})
        
      })
      .catch(this.onError) // onError is executed if the asynchronous load fails.
  }

  componentWillUnmount() {
    $(".logo").show()
  }

  render() {
    /*
		Returning video with a container. Remember, when setting up shaka player with custom UI, you must
		add your video component inside a container
		The container will be used by shaka player to add your customized UI for the player
		*/
    return (
      <div className="video-container" ref={this.videoContainer}>
        <video
          autoPlay
          className="shaka-video"
          ref={this.videoComponent}
          // poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default VideoPlayer
