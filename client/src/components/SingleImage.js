import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/SingleImage.css";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import SingleImageInfo from './SingleImageInfo'

export default class SingleImage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains a list of randomly picked paintings
    this.state = {
        imageInfoDiv:"",
        recImagesDiv:[]
    }

    // Any instance method should be binded here
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentDidMount() {
    this.fetchImages();

  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.imageID !== prevProps.match.params.imageID) {
      this.fetchImages();
    }
  }

  fetchImages(){
    fetch("http://localhost:8081/image/"+this.props.match.params.imageID,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(imageInfoArr => {
      if (!imageInfoArr) return;
      var imgInfo = imageInfoArr[0];
      var imgInfoDiv = <SingleImageInfo source={imgInfo.IMAGE_SOURCE} title={imgInfo.TITLE} size={imgInfo.SIZES}
        artist={imgInfo.AUTHOR} date={imgInfo.CREATED_TIME} technique={imgInfo.TECHNIQUE} type={imgInfo.TYPE}
        form={imgInfo.FORM} school={imgInfo.SCHOOL} location={imgInfo.LOCATION} description={imgInfo.DESCRIPTION}/>;

      this.setState({
        imageInfoDiv: imgInfoDiv
      });

    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

    fetch("http://localhost:8081/populars/"+this.props.match.params.imageID,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(imageList => {
      if (!imageList) return;

      let recImages = imageList.map((imgObj, i) =>
      <div className="rec-img-container"><Link to={"/singleimage/" + imgObj.ID}><img key={i} src={imgObj.image_source} alt=""/></Link></div>
      );
      console.log(recImages);

      this.setState({
        recImagesDiv:recImages
      });

    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  toggleLike(){
    var icon = this.state.likeState ? <FontAwesomeIcon icon={['far', 'heart']} /> : <FontAwesomeIcon icon="heart" />;
    this.setState ({
      likeIcon: icon,
      likeState: !this.state.likeState
    });
  }

  render() {

    return (
    <div>

      <SideNavbar />


      <div id="main">

        <TopNavbar/>

        {this.state.imageInfoDiv}

        <div className="rec-section">
          <h1> Explore more artworks </h1>

          <div className="rec-imgs">
            {this.state.recImagesDiv}
          </div>

        </div>

        <Footer />

      </div>

    </div>

    );
  }

}
