import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [previousTime, setPreviousTime] = useState(0);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const handleStartPause = () => {
    setRunning(!running);
  };

  const handleStop = () => {
    if (running) {
      setRunning(false); // Pause the timer
      setPreviousTime(time); // Store the current time
    }
  };

  const handleReset = () => {
    setTime(0); // Reset the timer to 0
    setPreviousTime(0); // Reset the previous time
    setRunning(false); // Ensure the timer is paused
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.time}>{time}s</h1>
      <div>
        <button style={styles.button} onClick={handleStartPause}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button style={styles.button} onClick={handleStop}>Stop</button>
        <button style={styles.button} onClick={handleReset}>Reset</button>
      </div>
      {running && (
        <p>Running...</p>
      )}
      {!running && time !== 0 && (
        <p>Paused at {previousTime}s</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  time: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  button: {
    fontSize: '1rem',
    margin: '0.5rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
};

export default Stopwatch;
