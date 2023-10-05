import React, { Component } from "react";
import "./Show.css";
import { Link, NavLink } from "react-router-dom";
class ShowBook extends Component {
  constructor(props) {
    super(props);
    this.state = { class: "", w: "", h: "", hidenD: "", hidenC: "" };
  }

  onChangeClass = () => {
    switch (this.props.type) {
      case 1:
        this.setState({ class: "flex" });
        this.setState({ w: 510, h: 360, hidenD: "block", hidenC: "none" });
        break;
      case 2:
        this.setState({ class: "flex-column" });
        this.setState({ w: 240, h: 170, hidenD: "none", hidenC: "none" });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div key={10}>
        <div className={this.state.class} onLoad={this.onChangeClass} key={11}>
          <img
            src={this.props.src}
            alt=""
            style={{ width: this.state.w, height: this.state.h }}
          />
          <div key={12}>
            <h4>
              <NavLink
                to={`/book/${this.props.id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {this.props.title}
              </NavLink>
            </h4>
            <p style={{ display: this.state.hidenD }}>
              {this.props.description}
            </p>
            <ul
              style={{ listStyle: "disc outside", display: this.state.hidenC }}
            >
              <li>{this.props.content}</li>
            </ul>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ShowBook;
