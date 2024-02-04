import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';

const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchTokenAndConnect = async () => {
      const token = await SecureStore.getItemAsync('token');
      const newSocket = io(serverPath, {
        query: { token },
        transports: ['websocket'],
      });

      setSocket(newSocket);
      
      newSocket.on('connect', () => {
        console.log('Connected to the server successfully');
      });

      newSocket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      return () => {
        newSocket.disconnect();
      };
    };

    fetchTokenAndConnect();
  }, [serverPath]);

  return socket;
};

export default useSocket;