import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "@Context";
import { fetchAndUpdatePerformers } from "@Realm";

import App from './App'
import Auth from './Auth'

const MainNavigator = () => {
  const { user } = React.useContext(AuthContext);


  React.useEffect(() => {
    if (user) fetchAndUpdatePerformers()
  }, [user])

  return (
    <NavigationContainer>
      {user ? <App /> : <Auth />}
    </NavigationContainer>
  );
};

export default MainNavigator;
