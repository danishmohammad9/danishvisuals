import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Video Editor & Motion Graphics</h4>
                <h5>Self-Employed</h5>
              </div>
              <h3>2026 - PRESENT</h3>
            </div>
            <p>
              Dedicated 100+ hours to intensive timeline production in Adobe Premiere Pro and After Effects. Spearheaded end-to-end editing for a storytelling Shorts channel—designing kinetic typography, custom text animations, and motion graphics optimized for high viewer retention and engagement.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sports Video Analyst (Level 1)</h4>
                <h5>Hudl</h5>
              </div>
              <h3>2025 - 2026</h3>
            </div>
            <p>
              Promoted to Level 1 to lead precise video tagging and footage optimization workflows. Mastered rapid timeline scrubbing, frame accuracy, and high-volume asset organization, ensuring flawless delivery under tight execution schedules.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Sports Video Analyst</h4>
                <h5>Hudl</h5>
              </div>
              <h3>2024 - 2025</h3>
            </div>
            <p>
              Analyzed game footage and broke down complex sports dynamics. Developed a sharp eye for granular motion tracking, frame-by-frame asset observation, and pacing—skills that directly translate into precise, high-speed timeline adjustments.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Performance Marketer & Content Strategist</h4>
                <h5>Self-Employed / Freelance</h5>
              </div>
              <h3>2022 - 2024</h3>
            </div>
            <p>
              Executed digital marketing campaigns and managed high-converting meta ads. Analyzed viewer retention metrics to engineer high-impact sales funnels, mastering visual storytelling and customer psychology to capture audience attention instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
