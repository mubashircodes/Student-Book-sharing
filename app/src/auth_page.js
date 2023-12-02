import * as React from 'react';
import { Amplify } from 'aws-amplify';
import { TopNav } from './top_navigation';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

export const UserContext = React.createContext({
  userEmail: '',
});

function AuthPage({ signOut, user, children }) {
  return (
    <>
      <UserContext.Provider value={{
        userEmail: user?.signInDetails?.loginId,
      }}>
        <TopNav signOut={signOut} user={user} />
        {/* <h1>Hello {user.username}</h1> */}
        {/* <button onClick={signOut}>Sign out</button> */}
        {children}
      </UserContext.Provider>
    </>


  );
}

export default withAuthenticator(AuthPage);
