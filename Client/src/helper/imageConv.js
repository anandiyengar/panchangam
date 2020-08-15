
import htmlToImage from 'html-to-image';

export const conv = (element) =>
 {
    htmlToImage.toJpeg(element, { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click()
    });}