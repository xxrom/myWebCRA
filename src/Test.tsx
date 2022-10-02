import React, { memo, useCallback, useState } from "react";
import { css } from "@linaria/core";
import { Test2 } from "./Test2";

// Create a class name
const title = css`
  font-size: 24px;
  font-weight: bold;
  color: red;
`;

export const Test = memo(({ test }: { test?: string }) => {
  const [count, setCount] = useState(0);

  const onAdd = useCallback(() => setCount((state) => state + 1), []);

  return (
    <div>
      <div
        onClick={onAdd}
        className={title}
      >{`Test 44554 ${test}: ${count}`}</div>
      <Test2 />
    </div>
  );
});
