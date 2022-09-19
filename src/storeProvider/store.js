import React, { createContext, useReducer, useContext } from 'react';

let initState = {
  projectName: '系统',
};

let reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "setProjectName":
      return { ...state, projectName: state.projectName === '系统' ? '示例系统' : '系统' };
    default:
      return state;
  }
};

const StoreContext = createContext(null);

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
