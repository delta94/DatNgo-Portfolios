import React, { useState, useEffect } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import { Container, Row, Col } from "reactstrap";
import Typed from "react-typed";

const Index = props => {
  const [roles, setRoles] = useState([
    "Developer",
    "Tech Lover",
    "Team Player",
    "Course Creater",
    "React.js",
    "Angular",
    "VueJs"
  ]);

  const [isFlipping, setIsFlipping] = useState(false);

  let cardAnimationInterval;

  const animateCard = () => {
    cardAnimationInterval = setInterval(() => {
      setIsFlipping(!isFlipping);
    }, 50000);
  };

  useEffect(() => {
    animateCard();

    return () => {
      cardAnimationInterval && clearInterval(cardAnimationInterval);
    };
  });

  const { isAuthenticated, user } = props.auth;

  return (
    <BaseLayout
      router={props.router}
      className={`cover ${isFlipping ? "cover-1" : "cover-0"}`}
      {...props.auth}
      headerType="index"
      title="Dat Ngo - Portfolio"
    >
      <div className="main-section">
        <div className="background-image">
          <img className="image" src="/static/images/background-index.png" />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                  <div className="front">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img
                      alt="Guy programing welcome picture"
                      className="image"
                      src="/static/images/section-1.jpg"
                    />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>

                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Get Your Projects Done </h2>
                      <div className="hero-section-content-intro">
                        Profesional and top quality service in web develepment.
                      </div>
                    </div>
                    <img
                      alt="Guy programing welcome picture"
                      className="image"
                      src="/static/images/section-2.jpg"
                    />
                    <div className="shadow-custom shadow-custom-2">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  {isAuthenticated && (
                    <span>
                      <b>{user.name}</b>
                    </span>
                  )}{" "}
                  Welcome to the portfolio website of Dat Ngo. Get informed,
                  collaborate and discover projects I was working on through the
                  years!
                </h1>
              </div>

              <Typed
                loop
                typeSpeed={60}
                backSpeed={60}
                strings={roles}
                backDelay={1000}
                loopCount={0}
                showCursor
                cursorChar="|"
                className="self-typed"
              />

              <div className="hero-welcome-bio">
                <h1>Let's take a look on my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <span className="service-link">
          Vector Illustration by{" "}
          <a rel="nofollow" target="_blank" href="https://www.vecteezy.com/">
            www.vecteezy.com
          </a>
        </span>
      </div>
    </BaseLayout>
  );
};

export default Index;
