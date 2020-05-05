import React from "react";
import {Link} from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/WelcomePage.css";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class SideNavbar extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains a list of randomly picked paintings
    this.state = {
      pushedMenuDisplay: false,
      poppedMenuDisplay: false,
      randPaintings:[],
      searchContent:[]
    }

    // Any instance method should be binded here
    this.pushedSidebar = this.pushedSidebar.bind(this);
    this.poppedSidebar = this.poppedSidebar.bind(this);
    this.showMenuList = this.showMenuList.bind(this);
    this.showArtisitAlpha = this.showArtisitAlpha.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    /*
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/randPaintings",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      console.log(res);
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(PaintingList => {
      if (!PaintingList) return;

      // Map each UrlObj in UrlList to an HTML element:
      let paintingsList = PaintingList.map((PaintingObj, i) =>
      <li><img key={i} src={PaintingObj.Image_Source} alt="" className="sliding-img"/></li>
      );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        randPaintings: paintingsList
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
    */
  }


  /* Set Toggle Button */
  pushedSidebar() {
    // if now state is false, then open the menu
    if (!this.state.pushedMenuDisplay) {
      /* Set the width of the side navigation to 250px */
      if (
        document.getElementById("sidebar-push") &&
        document.getElementById("main")
      ) {
        document.getElementById("sidebar-push").style.width = "250px";
        document.getElementById("main").style.marginLeft = "298px";
      }
    }
    // else close it
    else {
      /* Set the width of the side navigation to 0 */
      if (
        document.getElementById("sidebar-push") &&
        document.getElementById("main")
      ) {
        document.getElementById("sidebar-push").style.width = "0";
        document.getElementById("main").style.marginLeft = "48px";
      }
    }

    // last convert the state
    this.setState({pushedMenuDisplay: !this.state.pushedMenuDisplay});
  }

  poppedSidebar() {
    if (!this.state.poppedMenuDisplay) {
      if (
        document.getElementById("sidebar-pop")&&
        document.getElementById("main")
      ) {
        document.getElementById("sidebar-pop").style.width = "450px";
        document.getElementById("main").style.filter = "brightness(50%)";
        document.getElementById("main").style.transition = "0.5s";
      }
    }
    else {
      /* Set the width of the side navigation to 0 */
      if (
        document.getElementById("sidebar-pop")&&
        document.getElementById("main")
      ) {
        document.getElementById("sidebar-pop").style.width = "0";
        document.getElementById("main").style.filter = "brightness(100%)";
        document.getElementById("main").style.transition = "0.5s";
      }
    }

    // last convert the state
    this.setState({poppedMenuDisplay: !this.state.poppedMenuDisplay});
  }

  showMenuList(searchKey) {
    fetch("http://localhost:8081/menu/"+searchKey,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(menuList => {
      if (!menuList) return;
      let menuDiv = menuList.map((content, i) =>
        <Link className="content-text" to={"/display/"+searchKey+"/"+content.value}> {content.value} </Link>
      );

      this.setState({
        searchContent: menuDiv
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showArtisitAlpha(){
    var alphaList = [];
    var i = 'A'.charCodeAt(0), j = 'Z'.charCodeAt(0);
    for (; i <= j; ++i) {
        alphaList.push(String.fromCharCode(i));
    }

    let menuDiv = alphaList.map((content, i) =>
      <div><Link to={"/artist/" + content}>{content}</Link></div>
    );

    this.setState({searchContent: menuDiv});
  }

  render() {

    return (


      <div className="SideNavbar">
        <div className="sidenav-fixed">
          <div className="sidenav-icon">
            <button onClick={this.poppedSidebar}><FontAwesomeIcon icon="heart" /></button>
          </div>
          <div className="sidenav-icon">
            <button className="btn-search" onClick={this.pushedSidebar}><FontAwesomeIcon icon="search"/></button>
          </div>
          <div className="sidenav-icon">
            <button onClick={this.poppedSidebar}><FontAwesomeIcon icon={['fab', 'hotjar']}/></button>
          </div>
        </div>


       <div id="sidebar-push" className="sidenav">
        <div className="side-menu">
          <div>
            <Link className="menu-text">Artist</Link>
            <Button onClick={this.showArtisitAlpha}><FontAwesomeIcon icon="angle-double-right"/></Button>
          </div>
          <div>
            <Link className="menu-text" to={"/populars"}>Period</Link>
            <Button onClick={() => this.showMenuList("TIMELINE_START")}><FontAwesomeIcon icon="angle-double-right"/></Button>
          </div>
          <div>
            <Link  className="menu-text"to={"/populars/FORM"}>Form</Link>
            <Button onClick={() => this.showMenuList("FORM")}><FontAwesomeIcon icon="angle-double-right"/></Button>
          </div>
          <div>
            <Link className="menu-text" to={"/populars/TYPE"}>Type</Link>
            <Button onClick={() => this.showMenuList("TYPE")}><FontAwesomeIcon icon="angle-double-right"/></Button>
          </div>
          <div>
            <Link className="menu-text" to={"/populars/SCHOOL"}>School</Link>
            <Button onClick={() => this.showMenuList("SCHOOL")}><FontAwesomeIcon icon="angle-double-right"/></Button>
          </div>
        </div>

        <ScrollArea speed={0.8} className="side-content">
          {this.state.searchContent}
        </ScrollArea>

       </div>

       <div id="sidebar-pop" className="sidenav">
         <a href="#home">Home</a>
         <a href="#link">Link</a>
         <a href="#link">Link</a>
       </div>

      </div>

    );
  }

}
