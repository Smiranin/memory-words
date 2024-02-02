import { useEffect, useState } from 'react';

export default function PlayerTimer() {
  const [time, setTime] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimerDisplay(seconds + 1);
    }, 1000);

    function updateTimerDisplay(seconds: number) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
      setTime(formattedTime);
      setSeconds(seconds);
    }

    return () => clearInterval(intervalId);
  }, [seconds]);
  return <div>{time}</div>;
}
