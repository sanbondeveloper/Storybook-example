import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function expensiveComputation(a: number, b: number) {
  return a + b;
}

function ExpensiveComponent({ value }: { value: number }) {
  useEffect(() => {
    console.log('rendering!');
  }, []);

  return <span>{value + 1000}</span>;
}

function App() {
  const [value, setValue] = useState(0);
  const memoizedValue = useMemo(() => expensiveComputation(10, 20), []);
  const MemoizedComponent = useMemo(
    () => <ExpensiveComponent value={value} />,
    [value]
  );

  // useMemo로 useCallback을 구현하는 경우 다음과 같이 불필요하게 코드가 길어지고 혼동을 야기할 수 있다.
  const increase = useCallback(function handleClick() {
    setValue((prev) => prev + 1);
  }, []);

  return (
    <div>
      <button onClick={increase}>증가</button>
      <div>{memoizedValue}</div>
      {MemoizedComponent}
    </div>
  );
}

export default App;
