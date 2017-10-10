import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonContainerHeight = '28px'

    this.state = {
      image: null,
      video: null,
      assetObserver: null
    }
  }

  componentDidMount() {
    document.body.style.transform = `translateY(${this.buttonContainerHeight})`;

    this.findAssets();
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

  renderButton(link, copy = 'Download') {
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

  watchAsset(asset) {
    var observer = new MutationObserver(() => this.findAssets())
    observer.observe(asset, { attributes: true });
    observer.observe(asset.parentNode.parentNode.parentNode, { childList: true });
  }

  findAssets() {
    const video = this.findVideo();
    const image = this.findImage();

    if (video) {
      this.setState({ video: video, image: null });

      if (!this.state.assetObserver) {
        this.watchAsset(video);
        this.setState({ assetObserver: true });
      }
    }

    if (image) {
      this.setState({ image: image, video: null });

      if (!this.state.assetObserver) {
        this.watchAsset(image);
        this.setState({ assetObserver: true });
      }
    }
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
        {this.state.video &&
          <div>
            <span>'Download video thumbnail'</span>
            <span>'Download video'</span>
          </div>
        }

        {this.state.image &&
          <span>'Download image'</span>
        }
      </div>
    );
  }
}

export default App;
