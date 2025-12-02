import { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { verifyAdminPassword, setAdminToken } from '../lib/adminAuth';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (verifyAdminPassword(password)) {
        setAdminToken('admin_authenticated');
        setPassword('');
        setLoading(false);
        onLogin();
      } else {
        setError('Şifre yanlış');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#3A1A20] to-[#2A0A10] rounded-lg p-8 w-full max-w-md border-2 border-[#D4AF37]/30 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-[#D4AF37]">Admin Giriş</h2>
          <button
            onClick={onClose}
            className="text-[#D4AF37] hover:text-[#F5F5DC] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                       text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="Şifre girin"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-[#D4AF37] text-[#2A0A10] font-bold rounded
                     hover:bg-[#F5F5DC] transition-colors duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
