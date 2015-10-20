import ReactDOM from 'react-dom';
import React from 'react';

const Key = ( { char, size, isActive, onKeyPress } ) => {
  var style = { fontSize: size };
  if ( isActive ) {
    style.backgroundColor = 'gray';
    style.border = 'none';
  }
  return (
    <button
      style={style}
      onClick={()=>onKeyPress(char)}>
      {char}
    </button>
  );
};
Key.propTypes = {
  char: React.PropTypes.string.isRequired,
  onKeyPress: React.PropTypes.func.isRequired,
  size: React.PropTypes.string.isRequired
}

const KeyBoardRow = ({ keys, activeKey, size, onKeyPress }) => (
  <div>
    {keys.split('').map( (key,i) =>
      <Key
        char={key}
        isActive={key.toLowerCase() === activeKey.toLowerCase()}
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

const KeyBoard = ({favorites, keySize, activeKey, onKeyPress}) => (
  <div className="keyboard">
    <KeyBoardRow keys="1234567890" size={keySize} activeKey={activeKey} onKeyPress={onKeyPress}/>
    <KeyBoardRow keys="qwertyuiop" size={keySize} activeKey={activeKey} onKeyPress={onKeyPress}/>
    <KeyBoardRow keys="asdfghjkl" size={keySize} activeKey={activeKey} onKeyPress={onKeyPress}/>
    <KeyBoardRow keys="zxcvbnm,." size={keySize} activeKey={activeKey} onKeyPress={onKeyPress}/>
    { favorites &&
      <KeyBoardRow keys={favorites} size={keySize} onKeyPress={onKeyPress}/>
    }
  </div>
)

const Terminal = ({ output, onClear, children }) => (
  <div>
    {children}
    <hr/>
    <code> > {output}</code>
    <hr/>
    <button onClick={()=>onClear()}>Clear</button>
  </div>
)
Terminal.propTypes = {
  output: React.PropTypes.string.isRequired,
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

var terminalService = {
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

var settings = {

  getDefaultSettings() {
    return { keySize: '24' };
  },

  setKeySize( keySize ) {
    return { keySize };
  }
}

class App extends React.Component {

  constructor( props ) {
    super( props );

    this.state = Object.assign(
      {},
      terminalService.getInitialState(),
      settings.getDefaultSettings(),
      { activeKey: '' }
    );
  }

  componentDidMount() {
    document.addEventListener( 'keydown', this.handleKeyDown.bind(this), false );
    document.addEventListener( 'keyup', this.handleKeyUp.bind(this), false );
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.handleKeyDown.bind(this), false );
    document.removeEventListener( 'keyup', this.handleKeyUp.bind(this), false );
  }

  handleKeyDown( e ) {
    this.setState( { activeKey: String.fromCharCode( e.keyCode ) } );
    this.handleOutputAppend( String.fromCharCode( e.keyCode ).toLowerCase() );
  }

  handleKeyUp() {
    this.setState( { activeKey: '' } );
  }

  handleOutputAppend( char ) {
    this.setState( state => terminalService.append( state, char ) );
  }

  handleOutputClear( ) {
    this.setState( terminalService.clear() );
  }

  handleFavoritesChanged( favorites ) {
    this.setState( terminalService.setFavories( favorites ) );
  }

  handleSizeChanged( size ) {
    this.setState( settings.setKeySize( size ) );
  }

  render() {
    var {keySize, favorites, output, activeKey} = this.state;
    return (
      <div>
        <Slider value={keySize}
          onChange={this.handleSizeChanged.bind(this)}/>

        <input
          type="text"
          value={favorites}
          onChange={(e)=>this.handleFavoritesChanged(e.target.value)}/>

        <Terminal
          output={output}
          onClear={this.handleOutputClear.bind(this)}>

          <KeyBoard
            activeKey={activeKey}
            favorites={favorites}
            keySize={keySize}
            onKeyPress={this.handleOutputAppend.bind(this)} />

        </Terminal>
      </div>
    );
  }
}

ReactDOM.render( <App/>, document.getElementById( 'app' ) );