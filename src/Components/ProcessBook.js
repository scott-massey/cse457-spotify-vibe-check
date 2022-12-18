import React from "react"
import { Box } from "@mui/material"

import scottSketch1 from "../Resources/img/scott-sketch-1.png"
import scottSketch2 from "../Resources/img/scott-sketch-2.png"
import josephSketch1 from "../Resources/img/joseph-sketch-1.png"
import josephSketch2 from "../Resources/img/joseph-sketch-2.png"
import robSketch from "../Resources/img/rob-sketch.png"
import fullProject1 from "../Resources/img/full-project-1.png"
import fullProject2 from "../Resources/img/full-project-2.png"

function ProcessBook() {
  return (
    <React.Fragment>
      <Box
        sx={{ paddingLeft: "82px", paddingRight: "32px", paddingTop: "60px" }}
      >
        <div>
          <h2>Basic Info</h2>
          <ul>
            <li>Project title: Spotify Vibe Check</li>
            <li>
              Rob Diorio (473165), Scott Massey (464815), Joseph Merkadeau
              (473513)
            </li>
            <li>
              Robdiorio34@gmail.com, scott.massey@wustl.edu,
              jmerkadeau@wustl.edu
            </li>
            <li>
              <a href="https://github.com/scott-massey/cse457-spotify-vibe-check">
                GH Link
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Background and Motivation</h2>
          <p>
            The three of us love listening to music. We often make playlists
            with the goal of having the songs match each other in “vibe”. I
            (Scott) even use a numerical rating system to try to quantify what
            I’m going for in a certain playlist. We saw that Spotify actually
            rates each song on a variety of different factors, so we wanted to
            see if we could visualize that individual data of a song, and more
            importantly, visualize groups of songs like playlists and albums.
            That way we could legitimately quantify the “vibe” of a playlist.
          </p>
        </div>
        <div>
          <h2>Project Objectives</h2>
          <p>
            Our project will allow users to visualize the audio features of
            their Spotify playlists. The visualizations will help users
            determine the “vibe” of their playlists. Additionally, different
            visualizations will enable users to highlight individual songs at a
            time, helping them determine if a song fits in with the rest of the
            playlist.
          </p>
          <p>
            Overall, this tool will help users better curate their own
            playlists, helping sharpen their music taste and improve their
            playlists.
          </p>
        </div>
        <div>
          <h2>Data</h2>
          <p>
            We will be using data from the Spotify Web API to collect music
            data. We will be fetching playlists, then for each song on the
            playlist we’ll fetch song audio features that Spotify provides,
            including acousticness, danceability, energy, instrumentalness,
            loudness, and valence. We think that these features will be a good
            measure of the “vibe” of a song. In order to do this, we will have
            to make calls to 2 separate endpoints on the API. First, we get the
            current user’s playlists
            <a href="https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists">
              (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)
            </a>
            , then for each song in the playlist we want to visualize, we get
            the audio features (the endpoint can handle up to 100 songs in one
            request){" "}
            <a href="https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists">
              (https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)
            </a>
            .
          </p>
          <p>
            This allows users to sign in to their Spotify account through our
            web page so that they can use this visualization on their own
            playlists and listening data. For users who do not have Spotify, or
            wish to not link their account, we will have the same visualizations
            available for Obama’s summer playlists. Every year, Obama shares his
            summer playlist consisting of about 40 songs. We’ve collected and
            will allow users to visualize these playlists from the past 4
            summers.
          </p>
          <p>
            <a href="https://www.billboard.com/music/pop/barack-obama-2022-summer-playlist-1235118261/">
              Obama '22 Summer Playlist
            </a>
          </p>
          <p>
            <a href="https://www.rollingstone.com/music/music-news/barack-obama-2021-summer-playlist-1195408/">
              Obama '21 Summer Playlist
            </a>
          </p>
          <p>
            <a href="https://www.billboard.com/music/pop/barack-obama-2020-summer-playlist-9435742/">
              Obama '20 Summer Playlist
            </a>
          </p>
        </div>
        <div>
          <h2>Data Processing</h2>
          <p>
            Spotify’s Web API provides data in a very clean and easy to use
            format, so not much cleanup will be necessary. Given the audio
            features for each song in a playlist, we will be finding some basic
            summary statistics for each feature to find the general
            distribution. This includes the means, quartiles, and variance for
            each feature. Given the response from the API call for the features
            on each track, we will append a track’s information and audio
            features as an object to an array. This way we have a clean array of
            objects that contains only the information that we are interested in
            displaying. From here, the summary statistics will be easy to
            calculate, and can be stored separately.
          </p>
        </div>
        <div>
          <h2>Visualization Design</h2>
          <h3>Individual Sketches</h3>
          <div>
            <img src={scottSketch1} alt="scott" width="500" />
            <img src={scottSketch2} alt="scott" width="500" />
            <img src={josephSketch1} alt="joseph" width="500" />
            <img src={robSketch} alt="rob" width="500" />
            <img src={josephSketch2} alt="joseph" width="500" />
          </div>
          <h3>Full Project Sketch</h3>
          <div>
            <img src={fullProject1} alt="full-project" width="500" />
            <img src={fullProject2} alt="full-project" width="500" />
          </div>
        </div>
        <div>
          <h2>Must-Have Features</h2>
          <ul>
            <li>
              Some variation of a spider chart to display a song/playlist’s
              attributes
            </li>
            <li>
              An IQR line chart that displays the spread of a playlist's
              attributes relative to a median line down the middle
            </li>
            <li>Spotify login/integration for data pulling</li>
            <li>
              Playlist and song selection capability to change data being passed
              through visualizations{" "}
            </li>
          </ul>
        </div>
        <div>
          <h2>Optional Features</h2>
          <ul>
            <li>
              Preloaded celebrity playlists to select from for playlist
              comparisons
            </li>
            <li>
              Top artist and genre bubble charts for a users overall profile
            </li>
            <li>Video demo and how to operate the site</li>
            <li>
              Highlight individual songs on the IQR chart to visualize one
              song's place in relation to a playlist
            </li>
          </ul>
        </div>
        <div>
          <h2>Implementation</h2>
          <p>
            The implementation is described, in detail, in the welcome modal
            that appears when the page loads. You can also access it by clicking
            on the ? icon in the menu.
          </p>
        </div>
        <div>
          <h2>Evaluation</h2>
          <p>Here are some takeaways we got from our visualizations:</p>
          <ul>
            <li>
              Overall, the visualizations were generally helpful for visualizing
              the vibes of a playlist.
            </li>
            <li>
              The bigger the playlist, the more likely each attribute would have
              a wide spread of "vibes".
            </li>
            <li>
              Personally, I (Scott) am not as good at curating specific vibes on
              playlists than I thought.
            </li>
            <li>
              Visualizing individual songs as specific points on the iqr line
              chart was incredibly helpful for finding out what songs in the
              playlist were outliers.
            </li>
            <li>
              The best improvements around the visualization probably lie
              outside the actual visualizations and more on auxiliary features.
              For example, it would be nice to have an easy way to remove songs
              from a playlist. Additionally, some "smart" recommendations around
              songs to add or remove, as well as easy ways to visualize these
              individual songs could be helpful.
            </li>
            <li>
              Another major feature we weren't able to get to is visualizing
              multiple individual songs on both the iqr chart and the radar
              chart at once. As we played with the visualization, we decided it
              would not be valuable enough to visualize multiple individual
              songs at once.
            </li>
          </ul>
        </div>
        <div>
          <h2>Project Schedule</h2>
          <p>From 11/14 on</p>
          <ul>
            <li>
              Week 3, Nov 14: Have a prototype of the split line playlist chart
              ready. Ideally, we’ll have also started on the basic prototypes
              for the other charts as well. Rob and Joseph will be doing more of
              the work here, with Scott as support.
            </li>
            <li>
              Week 4, Nov 21: Have a “draft” of all of our charts ready on the
              page.{" "}
            </li>
            <li>
              Week 5, Nov 28: Thanksgiving, no work the previous week.
              Potentially some tweaking. If time allows, we’ll implement some
              optional features.
            </li>
            <li>
              Week 6, Dec 1: Tweaks of the final product, final touches on
              process book.{" "}
            </li>
          </ul>
        </div>
      </Box>
    </React.Fragment>
  )
}

export default ProcessBook
