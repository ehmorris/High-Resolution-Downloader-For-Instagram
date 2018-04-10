import React, {Component} from 'react';
import Button from './Button';
import Notice from './Notice';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = { blobUrl: null };
    this.downloadAbortController = new AbortController();
    this.downloadAbortControllerSignal = this.downloadAbortController.signal;
  }

  componentDidMount() {
    this.convertUrlToBlobUrl(this.props.url)
      .then((blobUrl) => {
        this.setState({ blobUrl: blobUrl });
      });
  }

  componentWillUnmount() {
    this.fetchAbortController.abort();
  }

  convertUrlToBlobUrl(url) {
    return fetch(url, {this.downloadAbortControllerSignal})
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  }

  render() {
    const containerStyle = {
      color: '#fff',
      cursor: 'default',
      fontFamily: '-apple-system, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '600',
      transformOrigin: 'center',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }

    return (
      <div style={containerStyle}>
        {this.props.copied &&
          <Notice>URL COPIED</Notice>
        }

        <Button
          href={this.state.blobUrl}
          download
        >DOWNLOAD</Button>

        <Button
          href={this.props.url}
          target="_blank"
        >OPEN IN TAB</Button>
      </div>
    );
  }
}

export default Buttons;
