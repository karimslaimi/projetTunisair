import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Routes } from 'react-router-dom';

const THEME_CONFIG = {
    navCollapsed: false,
    sideNavTheme: 'SIDE_NAV_LIGHT',
    locale: 'en',
    navType: "SIDE",
    topNavColor: '#3e82f7',
    headerNavColor: '',
    mobileNav: false,
    currentTheme: 'light',
    direction: 'ltr'
};
const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
      <div className="App">
        <Provider store={store}>
            <Router>
              <Routes>
                <Route path="/" component={Views}/>
              </Routes>
            </Router>
        </Provider>
      </div>
  );
}

export default App;