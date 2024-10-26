'use client';
import React, { useEffect, useState } from 'react';

const Counter = ({
  countHandler,
  initialCount,
}: {
  countHandler: (count: number) => void;
  initialCount: number;
}) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const plusHandler = (e) => {
    e.preventDefault();
    setCount(count + 1);
    countHandler(count);
  };
  const minusHandler = (e) => {
    e.preventDefault();
    if (count > 1) {
      setCount(count - 1);
      countHandler(count);
    }
  };
  return (
    <div className="bg-slate-300 py-4 px-2 rounded-md min-w-24" onClick={(e) => e.preventDefault()}>
      <div className="flex justify-between">
        <div className={`text-2xl ${count === 1 && 'opacity-35'}`} onClick={(e) => minusHandler(e)}>
          -
        </div>
        <div className="text-2xl">{count}</div>
        <div className="text-2xl" onClick={(e) => plusHandler(e)}>
          +
        </div>
      </div>
    </div>
  );
};

export default Counter;
