import { carTypesRef, vehicletype } from "../config/firebase";
import {
  FETCH_CAR_TYPES,
  FETCH_CAR_TYPES_SUCCESS,
  FETCH_CAR_TYPES_FAILED,
  EDIT_CAR_TYPE,
  ADD_VEHICLE_TYPE,
} from "./types";

export const fetchCarTypes = () => (dispatch) => {
  dispatch({
    type: FETCH_CAR_TYPES,
    payload: null,
  });
  carTypesRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      dispatch({
        type: FETCH_CAR_TYPES_SUCCESS,
        payload: snapshot.val(),
      });
    } else {
      dispatch({
        type: FETCH_CAR_TYPES_FAILED,
        payload: "No cars available.",
      });
    }
  });
};

export const editCarType = (cartypes, method) => (dispatch) => {
  dispatch({
    type: EDIT_CAR_TYPE,
    payload: method,
  });
  carTypesRef.set(cartypes);
};

//add vehicle type
export const addVehicleType = (cartype) => (dispatch) => {
  dispatch({
    type: ADD_VEHICLE_TYPE,
    payload: cartype,
  });
  vehicletype.set(cartype);
};
