import React, { useContext, useState } from 'react';

const UserContext = React.createContext({ user: null });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        username: user?.oauthId,
        userId: user?._id,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContext, UserProvider, useUser };
