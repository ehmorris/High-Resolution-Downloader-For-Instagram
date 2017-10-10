import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonHeight = '28px'
  }

  componentDidMount() {
    this.setDownloadImage();
    document.body.style.transform = `translateY(${this.buttonHeight})`;
  }

  pickSourceFromSrcset(srcset, filterByConstraint) {
    return srcset.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');

      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  findImage() {
    const imageTag = Array.from(document.querySelectorAll('img')).find((image) => image.naturalWidth > 200);
    const srcset = imageTag.srcset.split(',');

    return this.pickSourceFromSrcset(srcset, '1080w');
  }

  setDownloadImage() {
    const imageUrl = this.findImage();
    this.downloadButton.href = imageUrl;
  }

  render() {
    const buttonStyles = {
      background: '#3897f0',
      border: '1px solid #3897f0',
      color: '#fff',
      font: '600 14px/26px -apple-system, BlinkMacSystemFont, sans-serif',
      height: this.buttonHeight,
      left: '0',
      outline: 'none',
      padding: '0 8px',
      position: 'absolute',
      textAlign: 'center',
      top: `-${this.buttonHeight}`,
      width: '100%',
      zIndex: '1'
    }

    return (
      <a
        ref={(downloadButton) => { this.downloadButton = downloadButton; }}
        style={buttonStyles}
        href=""
        download=""
      >
        Download High Resolution Copy
      </a>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
