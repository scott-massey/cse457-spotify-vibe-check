import React, { useState } from "react"
import { Box, Button, Modal, Typography } from "@mui/material"

import "./HelpModal.css"

import iqrDemo from "../assets/iqrDemo.png"
import signInButton from "../assets/signInButton.png"
import playlistSelector from "../assets/playlistSelector.png"
import songSelector from "../assets/songSelector.png"
import selectedSong from "../assets/selectedSong.png"
import bubbleChart from "../assets/bubbleChart.png"

const HelpModal = ({ modalOpen, closeHelpModal, ...props }) => {
  const [step, setStep] = useState(0)
  const nextStep = () => {
    if (step === renderFns.length - 1) {
      closeHelpModal()
    } else {
      setStep(step + 1)
    }
  }
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
	if (step === 0) {
		closeHelpModal()
	}
  }

  const renderContent = () => {
    return renderFns[step]()
  }

  return (
    <Modal open={modalOpen} onClose={closeHelpModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 600,
          bgcolor: "background.paper",
          boxShadow: 12,
          p: 4,
          flexDirection: "column",
          paddingBottom: "16px",
        }}
      >
        <Box sx={{ height: "90%", width: "100%" }}>{renderContent()}</Box>
        <Box
          sx={{
            height: "fit-content",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid black",
            paddingTop: "16px",
          }}
        >
          <Button variant="contained" onClick={prevStep} sx={{backgroundColor: "#1db954", '&:hover': {backgroundColor: '#17863d'}}}>
            {step === 0 ? "Close" : "Back"}
          </Button>
          <Button variant="contained" onClick={nextStep} sx={{backgroundColor: "#1db954", '&:hover': {backgroundColor: '#17863d'}}}>
            {step === renderFns.length - 1 ? "Close" : "Next"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default HelpModal

const renderIntro = () => {
  return (
    <React.Fragment>
      <Box className="help-modal-start">
        <Typography component="h1" variant="h4">
          Welcome to The Spotify Vibe Check!
        </Typography>
        <Typography component="h2" variant="h6" gutterBottom>
          This website will help you curate the "vibes" of your Spotify
          playlists.
        </Typography>
      </Box>
    </React.Fragment>
  )
}

const renderBackground = () => {
  return (
    <React.Fragment>
      <Typography variant="body1">
        This tool achieves analyzes playlists by aggregating a variety of
        metrics Spotify provides for every individual song:
      </Typography>
      <ul>
        <li>
          Acousticnesss: How acoustic the song is, i.e. the use of acoustic
          instruments or electric ones. The higher the value, the more acoustic.
        </li>
        <li>
          Danceability: How easily can you dance to the song. The higher the
          value, the more danceable.
        </li>
        <li>
          Energy: A measure of "intensity and activity". High values mean the
          song feels "fast, loud, and noisy".
        </li>
        <li>
          Instrumentalness: A measure of whether the song contains vocals. Songs
          without fewer vocals will score higher.
        </li>
        <li>Loudness: A measure of how loud the song is, in dB.</li>
        <li>Tempo: The tempo of the song, in BPM (beats per minute)</li>
        <li>
          Valence: How happy or sad the song is. The higher the value, the
          happier the song is.
        </li>
      </ul>
    </React.Fragment>
  )
}

const renderSignIn = () => {
  return (
    <React.Fragment>
      <Typography variant="body1">
        First, this app works best if you sign in with your Spotify account.
        Don't have an account? No worries! You can still demo the visualizations
        using one of our demo playlists.
      </Typography>
      <Typography variant="body1">
        You can sign in with your Spotify account by clicking the "Sign In With
        Spotify" button in the top right corner of the page:
      </Typography>
      <br />
      <img
        src={signInButton}
        alt="Sign In Button"
        className="help-modal-image"
		height="100px"
      />
    </React.Fragment>
  )
}

const renderSelectPlaylist = () => {
  return (
    <React.Fragment>
      <Typography variant="h5">
        Next, select a playlist from the playlist selector:
      </Typography>
      <img
        src={playlistSelector}
        alt="Playlist Selector"
        className="help-modal-image"
        width={500}
      />
    </React.Fragment>
  )
}

const renderIqrVis = () => {
  return (
    <React.Fragment>
      <Typography variant="h5">
        You'll first notice a visualization for your playlist that looks like
        this:
      </Typography>
      <img
        className="help-modal-image"
        src={iqrDemo}
        alt="IQR Visualization"
        width={500}
      />
      <Typography variant="body1">
        This visualization shows the distribution of the audio features of your
        playlist.
      </Typography>
      <Typography variant="body1">
        Hover over any of the labels on the left to get a description of what
        the attribute represents.
      </Typography>
      <br />
      <Typography variant="body1">
        Each marking on the graph represents a different aggregate value for
        your playlist:
      </Typography>
      <ul className="list-horizontal">
        <li>
          <Typography variant="body1">
            Red circle - The minimum value for that attribute.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Blue circle - The average value for that attribute.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Green circle - The maximum value for that attribute.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Vertical line markers - The first and third quartiles for that
            attribute.
          </Typography>
        </li>
      </ul>
    </React.Fragment>
  )
}

const renderSelectSong = () => {
  return (
    <React.Fragment>
      <Typography variant="h5">
        Next, select a song from the playlist to see its individual audio
        features:
      </Typography>
      <img
        src={songSelector}
        alt="Song Selector"
        className="help-modal-image"
        width={300}
      />
    </React.Fragment>
  )
}

const renderSelectSong2 = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Once you select a song, you'll see two changes:
      </Typography>
      <img
        src={selectedSong}
        alt="Selected Song"
        className="help-modal-image"
        width={700}
      />
      <ul className="list-horizontal">
        <li>A yellow dot will appear on each line for that individual song.</li>
        <li>The song will be visualized graphically on a radar chart.</li>
      </ul>
    </React.Fragment>
  )
}

const renderIqrTips = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Here are some tips for getting more out these first two charts:
      </Typography>
      <ul>
        <li>
          The horizontal line in the middle represents the "neutral" value for
          each attribute. For example, for valence that means the song is
          neither happy nor sad.
        </li>
        <li>
          The width of the line connecting all of the markers represents the
          spread of that attribute's values for your playlist. The smaller the
          line, the more similar the songs in your playlists are.
        </li>
        <li>
          Individual songs outside the quartiles are outliers and might not fit
          the overall theme of your playlist. These songs would be good to
          remove.
        </li>
      </ul>
    </React.Fragment>
  )
}

const renderBubbleChart = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        The third visualization is a bubble chart:
      </Typography>
      <img
        src={bubbleChart}
        alt="Bubble Chart"
        className="help-modal-image"
        height={340}
      />
      <Typography variant="body1">
        Hover over any bubble to see the artist's name and the number of songs
        by that artist in your playlist.
      </Typography>
      <Typography variant="body1">
        This chart is useful for identifying how diverse your playlist is. If
        you have a lot of songs by one artist, you might want to add more
        variety to your playlist.
      </Typography>
    </React.Fragment>
  )
}

const renderConclusion = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        That's it! You're ready to start using the app.
      </Typography>
    </React.Fragment>
  )
}

const renderFns = [
  renderIntro,
  renderBackground,
  renderSignIn,
  renderSelectPlaylist,
  renderIqrVis,
  renderSelectSong,
  renderSelectSong2,
  renderIqrTips,
  renderBubbleChart,
  renderConclusion,
]
