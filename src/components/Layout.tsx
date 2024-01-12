import { Link, Outlet } from 'react-router-dom';
import { createGame } from 'services/firebase/game';

export default function Layout() {
  async function startGame() {
    try {
      const response = await createGame();
      // if (!response.ok) {
      //   throw new Error('Network response was not ok.');
      // }
      // const result = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/">
              Dashboard
            </Link>
          </li>
          <li className="mr-6">
            <button className="text-blue-500 hover:text-blue-800" onClick={startGame}>
              Start new game
            </button>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
