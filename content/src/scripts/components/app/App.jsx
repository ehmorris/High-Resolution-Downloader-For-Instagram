import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonContainerHeight = '28px'
  }

  componentDidMount() {
    document.body.style.transform = `translateY(${this.buttonContainerHeight})`;
  }

  findLargeAsset(tagName) {
    const assets = document.querySelectorAll(tagName);
    if (assets) {
      return Array.from(assets).find((asset) => asset.clientWidth > 200);
    } else {
      return false;
    }
  }

  findImage() { return this.findLargeAsset('img'); }

  findVideo() { return this.findLargeAsset('video'); }

  findVideoPosterUrl(video) { return video.poster; }

  findVideoUrl(video) { return video.src; }

  pickSourceFromSrcset(srcset, filterByConstraint) {
    return srcset.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');
      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  findImageUrl(imageTag) {
    const srcset = imageTag.srcset.split(',');
    return this.pickSourceFromSrcset(srcset, '1080w');
  }

  generateButton(link, copy = 'Download') {
    return (
      <a
        style={{
          color: '#fff',
          margin: '0 .5em'
        }}
        key={link}
        href={link}
        download={link}
      >{copy}</a>
    )
  }

  renderButtons() {
    const buttons = [];

    if (this.findVideo()) {
      const video = this.findVideo();

      buttons.push(this.generateButton(
        this.findVideoPosterUrl(video),
        'Download video thumbnail'
      ));

      buttons.push(this.generateButton(
        this.findVideoUrl(video),
        'Download video'
      ));
    }

    if (this.findImage()) {
      buttons.push(this.generateButton(
        this.findImageUrl(this.findImage()),
        'Download image'
      ));
    }

    return buttons;
  }

  render() {
    const buttonContainerStyles = {
      background: '#3897f0',
      border: '1px solid #3897f0',
      display: 'block',
      font: '600 14px/26px -apple-system, BlinkMacSystemFont, sans-serif',
      height: this.buttonContainerHeight,
      left: '0',
      outline: 'none',
      padding: '0 8px',
      position: 'absolute',
      textAlign: 'center',
      top: `-${this.buttonContainerHeight}`,
      width: '100%',
      zIndex: '1'
    }

    return (
      <div style={buttonContainerStyles}>
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;
