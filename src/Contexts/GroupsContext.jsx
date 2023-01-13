import { createContext, useContext } from "react";

const ContextObject = createContext({});

const Context = ({ data, children }) => (
  <ContextObject.Provider value={data}>{children}</ContextObject.Provider>
);

const useContextHook = () => {
  const context = useContext(ContextObject);
  if (context === undefined) {
    throw new Error("useContextHook can only be used inside a Context");
  }
  return context;
};

export { Context, useContextHook };
