import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <div className="portfolio-container">
        <Container className="About-header">
          <Helmet>
            <meta charSet="utf-8" />
            <title> Portfolio | {meta.title} </title>{" "}
            <meta name="description" content={meta.description} />
          </Helmet>
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4"> My Portfolio </h1>{" "}
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
        </Container>
        <div className="po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po-item">
                <div className="image-container">
                  <img src={data.img} alt="" />
                </div>
                <div className="content">
                  <h2>{data.heading}</h2>
                  <p>{data.description}</p>
                  <br></br>
                  <p>{data.description2}</p>
                  <div className="content-viewbtn">
                    <a href={data.link}>View Project</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HelmetProvider>
  );
};
