/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-04 18:49:17
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 19:15:52
 */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/SingleImage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios" 

export default class SingleImageInfo extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      likeState: false,
      likeIcon: <FontAwesomeIcon icon={['far', 'heart']} />
    }
    this.toggleLike = this.toggleLike.bind(this);

  }

  toggleLike(){
    var icon = this.state.likeState ? <FontAwesomeIcon icon={['far', 'heart']} /> : <FontAwesomeIcon icon="heart" />;
    if (this.props.loggedInStatus !== "LOGGED_IN") {

      alert("Please login before star an image")
    } else {
      axios.post('http://localhost:8081/users/collect/', { userID: this.props.userID, imageID: this.props.imageID })
    .then(response => {
        console.log(response);

        if (response.data.status === true) {
          
        } else {
            alert("Failure to star");
        }
        
    }).catch(error => {

    });
    }
    this.setState ({
      likeIcon: icon,
      likeState: !this.state.likeState
    });

    
  }

 


	render() {
		return (
      <div className="img-info-section">

        <div className="img-section">
          <div className="img-container">
            <img src={this.props.source} alt=""/>
          </div>
        </div>

        <div className="info-section">

          <div>TITLE: {this.props.title}</div>
          <div>SIZE: {this.props.size}</div>
          <div>ARTIST: {this.props.artist}</div>
          <div>CREATED AT: {this.props.date}</div>
          <div>TECHNIQUE: {this.props.technique}</div>
          <div>TYPE: {this.props.type}</div>
          <div>FORM: {this.props.form}</div>
          <div>SCHOOL: {this.props.school}</div>
          <div>NOW AT: {this.props.location}</div>
          <div>{this.props.description}</div>
				<div><button onClick={this.toggleLike}>{this.state.likeIcon}</button></div>

        </div>

      </div>

    );
	}
}
