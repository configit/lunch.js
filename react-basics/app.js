import ReactDOM from 'react-dom';
import React from 'react';
import settings from './settings';
import terminalStore from './terminalStore';

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

const KeyRow = ({ keys, activeKey = '', keySize, onKeyPress }) => (
  <div>
    {keys.split('').map( (key,i) =>
      <Key
        char={key}
        isActive={key.toLowerCase() === activeKey.toLowerCase()}
        key={key + i}
        size={keySize}
        onKeyPress={onKeyPress}/>
    )}
  </div>
)
KeyRow.propTypes = {
  keys: React.PropTypes.string.isRequired,
  onKeyPress: React.PropTypes.func.isRequired,
  keySize: React.PropTypes.string.isRequired
}

const Keyboard = ({favorites, keySize, activeKey, onKeyPress}) => (
  <div className="keyboard">
    {
      ['qwertyuiop', 'asdfghjkl', 'zxcvbnm,.', favorites]
      .filter( r => !!r )
      .map( r => (
        <KeyRow key={r}
          activeKey={activeKey}
          keys={r}
          keySize={keySize}
          onKeyPress={onKeyPress}/>
      ) )
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

/**
 * Application component deals with:
 *
 *  * Managing the state of the app (UI state and 'domain-model' state)
 *  * Componsing the UI through other state less components
 */
class App extends React.Component {

  constructor( props ) {
    super( props );

    // get initial state from data services and a pure UI state (activeKey)
    this.state = Object.assign(
      {},
      terminalStore.getInitialState(),
      settings.getDefaultSettings(),
      { activeKey: '' }
    );

    this.handleKeyDown = this.handleKeyDown.bind( this );
    this.handleKeyUp = this.handleKeyUp.bind( this );
  }

  /**
   * When component is rendered hook up DOM key handlers to support
   * highlight a key when the user types
   */
  componentDidMount() {
    document.addEventListener( 'keydown', this.handleKeyDown, false );
    document.addEventListener( 'keyup', this.handleKeyUp, false );
  }

  /**
   * Cleanup when component is removed
   */
  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.handleKeyDown, false );
    document.removeEventListener( 'keyup', this.handleKeyUp, false );
  }

  handleKeyDown( e ) {
    var activeKey = String.fromCharCode( e.keyCode );
    this.setState( { activeKey } );
    this.handleOutputAppend( activeKey.toLowerCase() );
  }

  handleKeyUp() {
    this.setState( { activeKey: '' } );
  }

  handleOutputAppend( char ) {
    this.setState( state => terminalStore.append( state, char ) );
  }

  handleOutputClear( ) {
    this.setState( terminalStore.clear() );
  }

  handleFavoritesChanged( favorites ) {
    this.setState( terminalStore.setFavories( favorites ) );
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

          <Keyboard
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