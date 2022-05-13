import {
  FETCH_CAR_TYPES,
  FETCH_CAR_TYPES_SUCCESS,
  FETCH_CAR_TYPES_FAILED,
  ADD_VEHICLE,
  ADD_VEHICLE_TYPE,
  FETCH_VEHICLE_TYPES_FAILED,
  FETCH_VEHICLE_TYPES_SUCCESS,
  EDIT_VEHICLE_TYPE,
  EDIT_VEHICLE_TAGS,
  FETCH_VEHICLE_TAGS_SUCCESS,
  FETCH_VEHICLE_TAGS_FAILED,
} from '../actions/types';

export const INITIAL_STATE = {
  cars: null,
  vehicleType: null,
  vehicleTags: null,
  loading: false,
  error: {
    flag: false,
    msg: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CAR_TYPES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CAR_TYPES_SUCCESS:
      return {
        ...state,
        cars: action.payload,
        loading: false,
      };
    case FETCH_CAR_TYPES_FAILED:
      return {
        ...state,
        cars: [],
        loading: false,
        error: {
          flag: true,
          msg: action.payload,
        },
      };
    case ADD_VEHICLE_TYPE:
      return {
        ...state,
        vehicleType: action.payload,
      };

    case FETCH_VEHICLE_TYPES_SUCCESS:
      return {
        ...state,
        vehicleType: action.payload,
        loading: false,
      };
    case FETCH_VEHICLE_TYPES_FAILED:
      return {
        ...state,
        vehicleType: [],
        loading: false,
        error: {
          flag: true,
          msg: action.payload,
        },
      };
    case ADD_VEHICLE:
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };
    case EDIT_VEHICLE_TYPE:
      return {
        ...state,
        vehicleType: action.payload,
      };
    case EDIT_VEHICLE_TAGS:
      return {
        ...state,
        vehicleTags: action.payload,
      };
    case FETCH_VEHICLE_TAGS_SUCCESS:
      return {
        ...state,
        vehicleTags: action.payload,
        loading: false,
      };
    case FETCH_VEHICLE_TAGS_FAILED:
      return {
        ...state,
        vehicleTags: [],
        loading: false,
        error: {
          flag: true,
          msg: action.payload,
        },
      };

    default:
      return state;
  }
};
