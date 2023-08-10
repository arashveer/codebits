import "../styles/app.css";

export default function Header() {
  return (
    <div className="flex head">
      <div className="head-label">
        <a href="https://code.arashveer.com">codebits</a>
      </div>
      <a
        href="https://github.com/arashveer/codebits"
        className="flex github-link"
        target="_blank"
      >
        Check out this repo!
        <div className="github-icon"></div>
      </a>
    </div>
  );
}
