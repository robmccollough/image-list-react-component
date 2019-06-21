import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
//Image component
//can recieve properties of 'width', 'height' and 'src'
//Limits rendered image width/height based on those props
class Image extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {};
    //set styles if the props are defined
    if (props.width) {
      this.styles.maxWidth = props.width;
    }
    if (props.height) {
      this.styles.maxHeight = props.height;
    }
    this.num = props.num;
    this.src = props.src;
    this.failedToLoad = this.failedToLoad.bind(this); //still not sure what this is for
  }

  //image load error handling
  failedToLoad(ev) {
    ev.target.style.display = "none";
  }
  //render the image with given src style
  render() {
    return (
      <img
        alt={"img-" + this.num}
        src={this.src}
        style={this.styles}
        onError={this.failedToLoad}
      />
    );
  }
}

//renders a list of images that are given a max width
//list wraps when image reaches 100% page width
//achieve with flex wrap?
class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.images = this.createImageArr(props.size);
    this.maxImageWidth = props.maxImageWidth;
    this.maxImageHeight = props.maxImageHeight;
  }

  // create array of sample image URLS
  //contain as many images as the store has
  createImageArr(numImages) {
    var imageArr = [];
    var baseStr = "https://picsum.photos/id/";
    for (let i = 0; i < numImages; i++) {
      //idNum/width/height
      var idNum = Math.floor(100 + Math.random() * 100).toString();
      var width = Math.floor(Math.random() * 500 + 200).toString();
      var height = Math.floor(Math.random() * 500 + 200).toString();
      var srcStr = baseStr + idNum + "/" + width + "/" + height;
      imageArr.push(
        <div className="imageContainer">
          <Image
            key={i.toString()}
            num={i}
            width={this.maxImageWidth}
            height={this.maxImageHeight}
            src={srcStr}
          />
        </div>
      );
    }
    return imageArr;
  }

  //render title and array of images
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Rob's Favorite Images</h1>
        <div className="container"> {this.images} </div>
      </div>
    );
  }
}

//set image maxWidth and maxHeight, as well as size of list
ReactDOM.render(
  <ImageList maxImageWidth={500} maxImageHeight={500} size={40} />,
  document.getElementById("root")
);
