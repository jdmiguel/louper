import { ReactNode, createContext, useState, useContext } from 'react';
import { View } from '@/utils/types';

const ViewContext = createContext({
  view: 'home',
  updateView: (_: View) => {},
});

type Props = {
  children: ReactNode;
};

const ViewContextProvider = ({ children }: Props) => {
  const [view, setView] = useState('home');

  const updateView = (currentView: View) => setView(currentView);

  const viewContextValue = {
    view,
    updateView,
  };

  return <ViewContext.Provider value={viewContextValue}>{children}</ViewContext.Provider>;
};

const useView = () => useContext(ViewContext);

export { ViewContextProvider, useView };

export default ViewContext;
