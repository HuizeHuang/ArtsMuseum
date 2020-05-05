/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-04 18:49:17
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 19:15:52
 */
import React from 'react';
import {Link} from 'react-router-dom';
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

          <div>TITLE:{this.props.title} </div>
          <div>SIZE: {this.props.size}</div>
          <div>ARTIST: {this.props.artist}</div>
					<div>CREATED AT: <Link to={"/display/TIMELINE_START/"+this.props.start}>{this.props.date}</Link> </div>
          <div>TECHNIQUE: {this.props.technique}</div>
					<div>TYPE: <Link to={"/display/TYPE/"+this.props.type}>{this.props.type}</Link> </div>
					<div>FORM: <Link to={"/display/FORM/"+this.props.form}>{this.props.form}</Link> </div>
					<div>SCHOOL: <Link to={"/display/SCHOOL/"+this.props.school}>{this.props.school}</Link></div>
          <div>NOW AT: {this.props.location}</div>
          <div>{this.props.description}</div>
					<div><button onClick={this.toggleLike}>{this.state.likeIcon}</button></div>

        </div>

      </div>

    );
	}
}
