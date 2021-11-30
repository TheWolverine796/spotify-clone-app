import React from "react";
import { useCallback } from "react";
import "./Footer.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Grid, Slider } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Player from "./Player";
import debounce from "lodash";

function Footer(props) {
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState();
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  return (
    <div className="footer">
      <div className="footer__left">
        <img className="footer__albumLogo" src={props.song.img_src} alt="" />
        <div className="footer__songInfo">
          <h4>{props.song.title}</h4>
          <p>{props.song.artist}</p>
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon
          className="footer__green"
          onClick={() => props.ShuffleSong()}
        />
        <SkipPreviousIcon
          className="footer__icon"
          onClick={() => props.SkipSong(false)}
        />
        {props.isPlaying ? (
          <PauseCircleFilledIcon
            className="footer__icon"
            fontSize="large"
            onClick={() => props.setIsPlaying(!props.isPlaying)}
          />
        ) : (
          <PlayCircleFilledIcon
            className="footer__icon"
            fontSize="large"
            onClick={() => props.setIsPlaying(!props.isPlaying)}
          />
        )}

        {/* <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={props.percentage} />
        </Box> */}

        <SkipNextIcon
          className="footer__icon"
          onClick={() => props.SkipSong()}
        />
        <RepeatIcon
          className="footer__green"
          // onClick={() => props.RepeatSong()}
        />
      </div>

      <div className="footer__right">
        <Grid container className="space-x-3 md:space-x-4">
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              size="small"
              className="w-14 md:w-28"
              // value={50}
              // onChange={(e) => setVolume(Number(e.target.value))}
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
