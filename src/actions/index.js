export const CHANGE_SCREEN = 'CHANGE_SCREEN';
export const CHANGE_DIMENSION = 'CHANGE_DIMENSION';
export const ADD_DIMENSION = 'ADD_DIMENSION';
export const REMOVE_DIMENSION = 'REMOVE_DIMENSION';

export function changeScreen(id) {
  return {
    type: CHANGE_SCREEN,
    id
  }
}

export function changeDimension(id, value) {
  return {
    type: CHANGE_DIMENSION,
    id,
    value
  }
}

export function addDimension() {
  return { type: ADD_DIMENSION }
}

export function removeDimension(id = -1) {
  return {
    type: REMOVE_DIMENSION,
    id
  }
}
