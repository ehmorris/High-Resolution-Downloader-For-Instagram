import React, {Component} from 'react';
import Frame from 'react-frame-component';
import Buttons from './Buttons';
import CopyToClipboard from './CopyToClipboard';

class UI extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      top: this.props.mediaRect.top,
      copied: false
    };
  }

  componentDidMount() {
    this.initialTopOffset = window.scrollY;
    this.initialTop = this.state.top;
    document.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.setClicked);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.setClicked);
  }

  handleScroll(event) {
    const pixelsTraveled = window.scrollY - this.initialTopOffset;
    const newTop = this.initialTop - pixelsTraveled;
    this.setState({ top: newTop });

    if (newTop < -150) {
      this.props.shouldUnmount();
    }
  }

  setClicked() {
    this.setState({ copied: true });
  }

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: `${this.state.top}px`,
          left: `${this.props.mediaRect.left}px`,
          overflow: 'hidden',
          width: '340px',
          height: '60px',
          zIndex: '100'
        }}
      >
        {this.state.copied &&
          <CopyToClipboard content={this.props.url} />
        }
        <Frame>
          <Buttons copied={this.state.copied} url={this.props.url} />
        </Frame>
      </div>
    );
  }
}

export default UI;
