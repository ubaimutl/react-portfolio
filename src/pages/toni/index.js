import React from "react";
// import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
    datatoni,
    meta,
} from "../../content_option";

export const Toni = () => {
    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Toni Joseph | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4">Toni Y. Joseph</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5">
                        <h3 className="color_sec py-4">{datatoni.title}</h3>
                    </Col>
                    <Col lg="7" className="d-flex align-items-center">
                        <div>
                            <p>{datatoni.tonijoseph}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};
