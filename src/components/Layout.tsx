import { nanoid } from '@reduxjs/toolkit';
import { AppUser } from 'models/user.model';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { createGame } from 'services/game.service';

const fakeUser: AppUser = {
  id: nanoid(),
  firstName: 'Bugs',
  lastName: 'Bunny',
  fullName: 'Bugs Bunny'
};

export default function Layout() {
  const navigate = useNavigate();

  async function startGame() {
    try {
      const newGame = await createGame({
        user: fakeUser,
        size: 'sm',
        lang: ['en', 'ru'],
        type: 'single'
      });
      navigate(`games/${newGame.id}`);
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
