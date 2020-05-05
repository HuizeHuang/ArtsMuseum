/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-04 18:49:17
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 19:44:57
 */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/WelcomePage.css";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TopNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	componentDidMount() {
		// const pageList = ['dashboard', 'recommendations', 'bestgenres', 'posters'];
    //
		// let navbarDivs = pageList.map((page, i) => {
		// 	if (this.props.active === page) {
		// 		return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
		// 	}
		// 	else {
		// 		return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
		// 	}
		// })
    //
		// this.setState({
		// 	navDivs: navbarDivs
		// });
	}

	render() {
		return (
      <div className="TopNavbar">
       <div className="home">
				 <Link className="link" to="/welcomepage">HUWANG Art Gallery </Link>
       </div>
       <div className="login">
         <Link className="link" to="/login"><FontAwesomeIcon icon={['far', 'user']}/> </Link>
       </div>
      </div>
        );
	}
}
