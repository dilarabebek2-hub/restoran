import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import { isAdminAuthenticated } from '../lib/adminAuth';

export default function AdminPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(!isAdminAuthenticated());
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());

  const handleLogin = () => {
    setAuthenticated(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <AdminLogin
        isOpen={isLoginOpen && !authenticated}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      {authenticated && <AdminPanel />}
    </>
  );
}
