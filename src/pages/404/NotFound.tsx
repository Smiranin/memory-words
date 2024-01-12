import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link className="text-blue-500 hover:text-blue-800" to="/">
          Go to the dashboard
        </Link>
      </p>
    </div>
  );
}
