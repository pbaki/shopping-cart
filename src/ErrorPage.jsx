import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>This route doesn't exist</h1>
      <Link className="link" to="/">
        You can go back to the home page by clicking here
      </Link>
    </div>
  );
};

export default ErrorPage;
