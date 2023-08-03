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
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>
                As a recent graduate with a passion for software engineering, I
                specialize in backend technologies while also dabbling in
                frontend development to craft innovative solutions for modern
                challenges. My expertise spans across both relational and
                nonrelational databases, seamlessly visualizing and interpreting
                data to deliver outstanding results. Determination fuels my
                pursuit of objectives, and my eagerness to learn enables me to
                adapt swiftly in the fast-paced tech landscape.
              </p>
              <p>
                Communication is one of my greatest strengths, fearlessly
                engaging with others to foster seamless collaboration and
                effortlessly assume leadership roles. Working with diverse teams
                excites me, and I thrive in guiding and empowering others to
                excel. I yearn for opportunities that push me to grow and become
                an invaluable asset to any forward-thinking company, eager to
                bridge the gap between theoretical knowledge and real-world
                application.
              </p>
              <p>
                Beyond the realm of programming, I find joy in staying active,
                often exploring the breathtaking mountains of North Carolina
                through hiking. I have a passion for cars and love the
                exhilaration of driving my cherished Challenger. Beyond this, I
                take immense pleasur in teaching and sharing my knowledge with
                others, finding fulfillment in helping them succeed and
                witnessing their progress.
              </p>
              <p>
                Every day, I strive to improve myself by at least 5%,
                maintaining a growth mindset and cherishing the value of wisdom.
                I am an incredibly fast learner and can adapt to any situation.
                My entrepreneurial spirit shines through as I manage two
                thriving businesses alongside my father—a successful car
                dealership and a thriving shoe store.
              </p>
              <p>
                As both a problem solver and a visionary, I'm dedicated to
                finding the most optimal solutions for programming challenges
                and business endeavors alike.
              </p>
              <p>
                I am not just a software engineer; I am a motivated,
                compassionate, and thoughtful individual who embraces challenges
                with an unyielding determination to inspire progress in both
                myself and those around me. I am ready to embark on a journey of
                growth and impact, bringing my unique blend of skills, passion,
                and entrepreneurial spirit to contribute meaningfully to your
                esteemed company.
              </p>
            </div>
          </Col>
        </Row>
        <Row className=" sec_sp">
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
        </Row>
        <Row className="sec_sp">
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
        </Row>
        <Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4">Services</h3>
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
        </Row>
      </Container>
    </HelmetProvider>
  );
};
