import ReactDOM from 'react-dom';
import React from 'react';

const Key = ( { char, size, onKeyPress } ) => (
   <button
     style={{ fontSize: size }}
     onClick={()=>onKeyPress(char)}>
     {char.toUpperCase()}
   </button>
);
Key.propTypes = {
  char: React.PropTypes.string.isRequired,
  onKeyPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.string.isRequired
}

const KeyBoardRow = ({ keys, size, onKeyPress }) => (
  <div>
    {keys.split('').map( (key,i) =>
      <Key
        char={key}
        key={key + i}
        size={size}
        onKeyPress={onKeyPress}/>
    )}
  </div>
)
KeyBoardRow.propTypes = {
  keys: React.PropTypes.string.isRequired,
  onKeyPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.string.isRequired
}

const Terminal = ({ output, favorites, keySize, onKeyPress, onClear }) => (
  <div>
    <div className="keyboard">
      <KeyBoardRow keys="1234567890" size={keySize} onKeyPress={onKeyPress}/>
      <KeyBoardRow keys="qwertyuiop" size={keySize} onKeyPress={onKeyPress}/>
      <KeyBoardRow keys="asdfghjkl" size={keySize} onKeyPress={onKeyPress}/>
      <KeyBoardRow keys="zxcvbnm,." size={keySize} onKeyPress={onKeyPress}/>
      { favorites &&
        <KeyBoardRow keys={favorites} size={keySize} onKeyPress={onKeyPress}/>
      }
    </div>
    <hr/>
    <code> > {output}</code>
    <hr/>
    <button onClick={()=>onClear()}>Clear</button>
  </div>
)
Terminal.propTypes = {
  output: React.PropTypes.string.isRequired,
  favorites: React.PropTypes.string.isRequired,
  keySize: React.PropTypes.string.isRequired,
  onKeyPress: React.PropTypes.func.isRequired,
  onClear: React.PropTypes.func.isRequired
}

const Slider = ({value, onChange, min=12, max=48}) => (
  <input type="range"
    value={value}
    onChange={(e)=>onChange(e.target.value)}
    min={min} max={max}/>
)
Slider.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
}

class App extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      output: '',
      favorites: '',
      keySize: '24',
    }
  }

  handleOutputAppend( char ) {
    this.setState( state => ({
      output: state.output + char
    }));
  }

  handleOutputClear( ) {
    this.setState( { output: '' } );
  }

  handleSizeChanged( size ) {
    this.setState( { keySize: size } );
  }

  handleFavoritesChanged( favorites ) {
    this.setState( { favorites } );
  }

  render() {
    return (
      <div>
        <Slider value={this.state.keySize}
          onChange={this.handleSizeChanged.bind(this)}/>

        <input
          type="text"
          value={this.state.favorites}
          onChange={(e)=>this.handleFavoritesChanged(e.target.value)}/>

        <Terminal {...this.state}
          onClear={this.handleOutputClear.bind(this)}
          onKeyPress={this.handleOutputAppend.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render( <App/>, document.getElementById( 'app' ) );