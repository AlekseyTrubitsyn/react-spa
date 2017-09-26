export const CHANGE_SCREEN = 'CHANGE_SCREEN';
export const CHANGE_DIMENSION = 'CHANGE_DIMENSION';

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
