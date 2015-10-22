
export default {

  getInitialState( ) {
    return {
      output: '',
      favorites: ''
    }
  },

  append( state, str ){
    return { output: state.output + str };
  },

  clear( state ) {
    return { output: '' };
  },

  setFavories( favorites ) {
    return { favorites: favorites };
  }
}
