import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Podcast & Photos </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Photos </h1>{" "}
            <p>
              To check out our podcasts, scroll down below our org's sick photos
            </p>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.desctiption}</p>
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-5 mb-4"> The Grind: Sk8@Cal's Podcast </h1>{" "}
            <p>
              With every sesh, The Grind will take listeners on an immersive
              ride with everyday skaters in the Berkeley community, to uncover
              the profound ways that skating has influenced their lives.
            </p>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/episode/4fBivgsUh0J69qYSe6ayRj?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <br></br>
        <br></br>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/episode/5rrjDj42d0oUfBd8vR0e3S?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <br></br>
        <br></br>
      </Container>
    </HelmetProvider>
  );
};
