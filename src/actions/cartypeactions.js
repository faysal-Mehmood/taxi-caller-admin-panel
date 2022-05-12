import { vehiclesRef, vehicletype, vehicleTagsRef } from '../config/firebase';
import {
  FETCH_CAR_TYPES,
  FETCH_CAR_TYPES_SUCCESS,
  FETCH_CAR_TYPES_FAILED,
  EDIT_VEHICLE_TYPE,
  ADD_VEHICLE_TYPE,
  FETCH_VEHICLE_TYPES_SUCCESS,
  FETCH_VEHICLE_TYPES_FAILED,
  EDIT_VEHICLE,
  ADD_VEHICLE_TAGS,
  FETCH_VEHICLE_TAGS_SUCCESS,
  FETCH_VEHICLE_TAGS_FAILED,
} from './types';

export const fetchCarTypes = () => (dispatch) => {
  dispatch({
    type: FETCH_CAR_TYPES,
    payload: null,
  });
  vehiclesRef.on('value', (snapshot) => {
    if (snapshot.val()) {
      dispatch({
        type: FETCH_CAR_TYPES_SUCCESS,
        payload: snapshot.val(),
      });
    } else {
      dispatch({
        type: FETCH_CAR_TYPES_FAILED,
        payload: 'No cars available.',
      });
    }
  });
};

export const editVehicle = (vehiclesdata, method) => (dispatch) => {
  dispatch({
    type: EDIT_VEHICLE,
    payload: method,
  });
  vehiclesRef.set(vehiclesdata);
};

//add vehicle type
export const addVehicleType = (cartype) => (dispatch) => {
  dispatch({
    type: ADD_VEHICLE_TYPE,
    payload: cartype,
  });
  vehicletype.set(cartype);
};
//fetch vehicle type
export const fetchVehicleTypes = () => (dispatch) => {
  dispatch({
    type: FETCH_CAR_TYPES,
    payload: null,
  });
  vehicletype.on('value', (snapshot) => {
    if (snapshot.val()) {
      dispatch({
        type: FETCH_VEHICLE_TYPES_SUCCESS,
        payload: snapshot.val(),
      });
    } else {
      dispatch({
        type: FETCH_VEHICLE_TYPES_FAILED,
        payload: 'No vehic type available available.',
      });
    }
  });
};
//edit vehicle type
export const editVehicleType = (cartype) => (dispatch) => {
  dispatch({
    type: EDIT_VEHICLE_TYPE,
    payload: cartype,
  });
  vehicletype.set(cartype);
};
//add vehicle tag
export const addVehicleTag = (cartag) => (dispatch) => {
  dispatch({
    type: ADD_VEHICLE_TAGS,
    payload: cartag,
  });
  vehicleTagsRef.set(cartag);
};

export const fetchVehicleTags = () => (dispatch) => {
  dispatch({
    type: FETCH_CAR_TYPES,
    payload: null,
  });
  vehicleTagsRef.on('value', (snapshot) => {
    if (snapshot.val()) {
      dispatch({
        type: FETCH_VEHICLE_TAGS_SUCCESS,
        payload: snapshot.val(),
      });
    } else {
      dispatch({
        type: FETCH_VEHICLE_TAGS_FAILED,
        payload: 'No vehicle tags available available.',
      });
    }
  });
};
