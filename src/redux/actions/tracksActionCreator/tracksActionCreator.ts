import actionTypes from "../actionTypes";
import { Track } from "../../../types/Track";

export const loadAllTracksAction = (tracks: Track[]) => ({
  type: actionTypes.loadAllTracks,
  tracks,
});

export const deleteTrackAction = (id: string) => ({
  type: actionTypes.deleteTrack,
  id,
});
