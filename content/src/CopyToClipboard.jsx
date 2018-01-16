import React, {Component} from 'react';

class CopyToClipboard extends Component {
  componentDidMount() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(this.url);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }

  render() {
    return (
      <div
        style={{
          opacity: '0',
          pointerEvents: 'none',
          position: 'absolute'
        }}
        ref={(input) => { this.url = input; }}
      >{this.props.content}</div>
    );
  }
}

export default CopyToClipboard;
