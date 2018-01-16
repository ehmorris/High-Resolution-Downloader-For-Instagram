import React, {Component} from 'react';

class UI extends Component {
  render() {
    const buttonStyle = {
      background: 'rgba(0, 0, 0, .75)',
      borderRadius: '.25rem',
      color: 'inherit',
      display: 'block',
      float: 'left',
      margin: '.5rem 0 0 .5rem',
      padding: '.25rem .5rem',
      textDecoration: 'none'
    };

    return (
      <div style={{
        animation: 'scaleIn .1s ease',
        color: '#fff',
        cursor: 'default',
        fontFamily: '-apple-system, system-ui, sans-serif',
        fontSize: '14px',
        transformOrigin: 'center',
        userSelect: 'none',
        whiteSpace: 'nowrap'
      }}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(.8);
            }
            to {
              opacity: 1,
              transform: scale(1);
            }
          }
        `}} />

        <div style={{
          float: 'left',
          fontWeight: 'bold',
          margin: '.5rem 0 0 .5rem',
          padding: '.25rem .5rem',
          textShadow: '0 0 .25rem #000',
        }}>Copied!</div>
        <a
          style={buttonStyle}
          href={this.props.url}
          download
        >Download</a>
        <a
          style={buttonStyle}
          href={this.props.url}
          target="_blank"
        >Open in tab</a>
      </div>
    );
  }
}

export default UI;
