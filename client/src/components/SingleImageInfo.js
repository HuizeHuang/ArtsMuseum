import React from 'react';
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
