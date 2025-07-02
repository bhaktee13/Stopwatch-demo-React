import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [eTime, seteTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        seteTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - eTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    seteTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(eTime / (1000 * 60 * 60));
    let minutes = Math.floor((eTime / (1000 * 60)) % 60);
    let seconds = Math.floor((eTime / 1000) % 60);
    let miliseconds = Math.floor((eTime % 1000) / 10);

    const padZero = (number) => (number < 10 ? "0" : "") + number;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(miliseconds)}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="start-button" onClick={start} disabled={isRunning}>
          Start
        </button>
        <button className="stop-button" onClick={stop} disabled={!isRunning}>
          Stop
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
