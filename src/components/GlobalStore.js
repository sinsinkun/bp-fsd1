import { createContext, useReducer, useContext } from "react";

const initialData = {
  showLoad: true
};

/*! IMPORTANT all your reducer functionality goes here */
const reduceFn = (state, action) => {
  switch (action.do) {
  case "toggleLoading":
    return {...state, showLoad: !state.showLoad};
  default:
    throw new Error(`Invalid action type: ${action.do}`);
  }
}

const StoreContext = createContext();

const StoreProvider = function(props){
  const [state, dispatch] = useReducer( reduceFn, initialData );

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  )
}

const useStoreContext = function(){ return useContext(StoreContext) };

export { StoreProvider, useStoreContext }