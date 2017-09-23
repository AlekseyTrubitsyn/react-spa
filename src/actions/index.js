export const CHANGE_SCREEN = 'CHANGE_SCREEN';

export function changeScreen(id) {
  return {
    type: CHANGE_SCREEN,
    id
  }
}
