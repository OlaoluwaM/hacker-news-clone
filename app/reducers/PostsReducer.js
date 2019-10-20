export default function postsReducer(state, action) {
  switch (action.type) {
    case 'Success':
      return {
        posts: action.data,
        error: null
      };
    case 'Error':
      return {
        posts: null,
        error: 'Could not get posts at this time'
      };
    case 'Reset':
      return {
        posts: null,
        error: null
      };
    default:
      throw new Error('Action not recognized');
  }
}
