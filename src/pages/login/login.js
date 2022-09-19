import React, { useState } from 'react';

let HookCount =  () => {
  let [count, setCount] = useState(0);
  return (
    <div>
      <h4>you click {count} times</h4>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  );
};

export default HookCount
