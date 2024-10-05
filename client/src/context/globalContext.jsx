// // AppContext.js
// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch user information from the backend
//   const fetchUserInfo = async () => {
//     try {
//       const response = await axios.get('/api/user/whoami', {
//         credentials: 'include',
//       });
//       console.log('response', response);
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user info on component mount
//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   return (
//     <AppContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user information from the backend
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/api/user/whoami', {
        credentials: 'include',
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};
