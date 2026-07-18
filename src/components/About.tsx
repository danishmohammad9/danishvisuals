import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am Mohammad Danish, a professional Video Editor and Motion Graphics Specialist.
          With a focus on storytelling, dynamic text animation, and seamless transitions,
          I bring stories to life using Adobe Premiere Pro and After Effects.
        </p>
        <div className="about-metrics">
          <div className="metric-box">
            <h4>30+</h4>
            <p>Shorts & Narratives Crafted</p>
          </div>
          <div className="metric-box">
            <h4>100%</h4>
            <p>Timeline Precision & Deadlines</p>
          </div>
          <div className="metric-box">
            <h4>100s</h4>
            <p>Hours Spent in Timeline</p>
          </div>
          <div className="metric-box">
            <h4>Premium</h4>
            <p>Text Animation & Motion Graphics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
