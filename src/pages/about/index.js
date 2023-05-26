import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";
import gi from "../../header/gi.jpeg";

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Sobre mi</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            {/*<h3 className="color_sec py-4">{dataabout.title}</h3>*/}
            <img className="gi-about" alt="gi image" src={gi} />
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p className="about">
                {/*{dataabout.aboutme}*/}
                Soy Amai Alada, trabajadora de la luz @psicologacuantica. Este
                es el nombre que elegí para manifestar mi propósito de luz en la
                Tierra, Soy mamá de Anakin y de Laira, acompaño el proceso de
                evolución de la conciencia, a través de armonización de energías
                femeninas y masculinas, en ascensión de Gaia.<br></br>
                <br></br>
                Estudié Lic. en Psicología. Maestría de Reiki Usui Tibetano y
                Karmic y cristaloterapia. Aprendí a meditar de Maestros del
                Tíbet, y mi propio camino de evolución me llevo a canalizar: el
                trabajo con los cuerpos sutiles: la Psicología Cuántica, teoría
                técnica y terapéutica.<br></br>
                <br></br>
                Trabajo a través de meditaciones de contacto con el canal de
                luz, elevando las frecuencias vibraciones del ser. A través de
                recursos como, alquimia, el arte y la respiración consciente.
                <br></br>
                <br></br>
                Acompaño el proceso de evolución y desarrollo del ser hacia la
                divinidad, a través de sesiones individuales, talleres,
                ceremonias y retiros grupales, on line y presencial.
              </p>
            </div>
          </Col>
        </Row>
        {/*<Row className=" sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Work Timline</h3>
          </Col>
          <Col lg="7"> 
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{data.jobtitle}</th>
                      <td>{data.where}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row> */}
        {/*<Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="7">
            {skills.map((data, i) => {
              return (
                <div key={i}>
                  <h3 className="progress-title">{data.name}</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${data.value}%`,
                      }}
                    >
                      <div className="progress-value">{data.value}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>*/}
        {/*<Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4">services</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => {
              return (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">{data.title}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row>*/}
      </Container>
    </HelmetProvider>
  );
};
