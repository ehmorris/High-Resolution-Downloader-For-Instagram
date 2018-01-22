### About

This is a simple Chrome Extension that finds the highest resolution url of an Instagram asset on click. It searches through the srcset for the best quality image url and copies it to the clipboard automatically, as well as showing download and open buttons. It works by finding any image asset at a click event’s coordinates, making it resilient to simple DOM changes.

[Available on the Chrome Web Store](https://chrome.google.com/webstore/detail/instagram-high-resolution/jegjlojkkmlmfnhnogmmfbfamjdabgom).

![](https://i.imgur.com/7QSXPTl.png)

### Development

Use `yarn` to install the package file.

Run with `gulp watch`.

Load the `build/` directory in developer mode on [chrome://extensions](chrome://extensions/).

Reload the extension via Chrome when testing.

To generate a build, use Chrome’s “Pack Extension” button on [chrome://extensions](chrome://extensions/) and attach the private key from previous packaged versions.
