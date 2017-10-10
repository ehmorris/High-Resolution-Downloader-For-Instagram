import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.buttonContainerHeight = '28px'

    this.state = {
      imageUrl: null,
      videoUrl: null,
      videoPosterUrl: null
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

  watchAsset(asset) {
    var observer = new MutationObserver(() => this.findAssets())
    observer.observe(asset, { attributes: true });
    observer.observe(asset.parentNode.parentNode.parentNode, { childList: true });
  }

  observeMainAsset(asset) {
    this.watchAsset(asset);
  }

  findAssets() {
    const video = this.findVideo();
    const image = this.findImage();

    if (video) {
      this.setState({
        imageUrl: null,
        videoUrl: this.findVideoUrl(video),
        videoPosterUrl: this.findVideoPosterUrl(video)
      });

      this.observeMainAsset(video);
    }

    if (image) {
      this.setState({
        imageUrl: this.findImageUrl(image),
        videoUrl: null,
        videoPosterUrl: null
      });

      this.observeMainAsset(image);
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

    const linkStyles = {
      color: '#fff',
      margin: '0 .5em'
    }

    return (
      <div style={buttonContainerStyles}>
        {this.state.videoUrl &&
          <div style={{ display: 'block' }}>
            <a
              style={linkStyles}
              href={this.state.videoPosterUrl}
              download={this.state.videoPosterUrl}
            >Download video thumbnail</a>

            <a
              style={linkStyles}
              href={this.state.videoUrl}
              download={this.state.videoUrl}
            >Download video</a>
          </div>
        }

        {this.state.imageUrl &&
          <a
            style={linkStyles}
            href={this.state.imageUrl}
            download={this.state.imageUrl}
          >Download image</a>
        }
      </div>
    );
  }
}

export default App;
