import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/SingleImage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
