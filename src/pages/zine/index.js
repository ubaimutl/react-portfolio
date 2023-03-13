import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { zine, meta } from "../../content_option";

export const PDFViewer = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Zine </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-3"> Our Zine </h1>{" "}
            <p>
            Skateboarding is more than just a piece of wood with wheels. It has a history of rebelling against authority, a creative aspect that is solely special to an individual, and most importantly, a way to escape reality. The main goal of the zine was not only to represent the core values of Skateboarding at Berkeley, but to also show the raw emotions and difficulties that come with the sport: whether it being a broken board, to injuries, to the many laughs we share together as a skateboarding family. This zine represents just that –  a collection of memories. 
            </p>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {zine.map((data, i) => {
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
      </Container>
    </HelmetProvider>
  );
};
