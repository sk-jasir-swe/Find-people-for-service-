import { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialProfessionals } from '../data/professionals';
import { meetingSpaces } from '../data/meetingSpaces';
import { generateId } from '../utils/generateId';
const C = createContext(null);
export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage(
    'connext_current_user',
    null,
  );
  const [professionals, setProfessionals] = useLocalStorage(
    'connext_professionals',
    initialProfessionals,
  );
  const [bookings, setBookings] = useLocalStorage('connext_bookings', []);
  const [payments, setPayments] = useLocalStorage('connext_payments', []);
  const [chats, setChats] = useLocalStorage('connext_chats', {});
  const [connections, setConnections] = useLocalStorage(
    'connext_connections',
    [],
  );
  const [toast, setToast] = useState(null);
  const notify = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };
  const login = (name, role = 'user') => {
    const n = name.trim() || 'Demo User';
    const u = {
      id: `demo_${n.toLowerCase().replace(/\W+/g, '_')}`,
      name: n,
      email: `${n.toLowerCase().replace(/\s+/g, '.')}@demo.local`,
      role,
      avatar: n
        .split(/\s+/)
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    };
    setCurrentUser(u);
    notify(`Welcome, ${n}`);
    return u;
  };
  const logout = () => {
    setCurrentUser(null);
    notify('You have been logged out');
  };
  const connect = (pid) => {
    if (!currentUser) return false;
    setConnections((prev) =>
      prev.some((c) => c.userId === currentUser.id && c.professionalId === pid)
        ? prev
        : [
            ...prev,
            {
              id: generateId('conn'),
              userId: currentUser.id,
              professionalId: pid,
              createdAt: new Date().toISOString(),
            },
          ],
    );
    notify('Connection saved');
    return true;
  };
  const isConnected = (pid) =>
    !!currentUser &&
    connections.some(
      (c) => c.userId === currentUser.id && c.professionalId === pid,
    );
  const addPayment = (data) => {
    const p = {
      id: generateId('pay'),
      userId: currentUser?.id || 'guest',
      status: 'success',
      mode: 'DEMO',
      createdAt: new Date().toISOString(),
      ...data,
    };
    setPayments((prev) => [p, ...prev]);
    return p;
  };
  const startChat = (pid) => {
    if (!currentUser) return null;
    const key = `${currentUser.id}_${pid}`;
    setChats((prev) =>
      prev[key]
        ? prev
        : {
            ...prev,
            [key]: [
              {
                id: generateId('msg'),
                sender: 'professional',
                text: 'Hi there! Thanks for reaching out. What would you like to work on?',
                createdAt: new Date().toISOString(),
              },
            ],
          },
    );
    connect(pid);
    return key;
  };
  const sendMessage = (key, text) => {
    if (!text.trim()) return;
    setChats((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id: generateId('msg'),
          sender: 'user',
          text: text.trim(),
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  };
  const bookMeeting = (data) => {
    const b = {
      id: generateId('booking'),
      userId: currentUser?.id || 'guest',
      status: 'Confirmed (demo)',
      createdAt: new Date().toISOString(),
      ...data,
    };
    setBookings((prev) => [b, ...prev]);
    return b;
  };
  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
      professionals,
      setProfessionals,
      bookings,
      setBookings,
      payments,
      setPayments,
      chats,
      setChats,
      connections,
      connect,
      isConnected,
      addPayment,
      startChat,
      sendMessage,
      bookMeeting,
      meetingSpaces,
      notify,
      toast,
    }),
    [currentUser, professionals, bookings, payments, chats, connections, toast],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useApp = () => {
  const x = useContext(C);
  if (!x) throw new Error('useApp must be inside AppProvider');
  return x;
};
