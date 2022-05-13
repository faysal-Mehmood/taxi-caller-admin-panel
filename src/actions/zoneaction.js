import { ADD_ZONE } from "./types";
import { zoneRef } from "../config/firebase";

export const fetchZone = (values) => (dispatch) => {
  dispatch({
    type: ADD_ZONE,
    payload: values,
  });

  zoneRef.set(values);
};
