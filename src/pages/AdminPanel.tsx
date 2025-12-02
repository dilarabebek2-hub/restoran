import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Edit2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { removeAdminToken } from '../lib/adminAuth';

interface Table {
  id: string;
  table_number: number;
  capacity: number;
  location: string;
  status: string;
}

interface Chef {
  id: string;
  name: string;
  biography: string;
  signature_dish: string;
  image_url: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  status: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'tables' | 'chefs' | 'menu' | 'reservations'>('tables');
  const [tables, setTables] = useState<Table[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Table form
  const [tableForm, setTableForm] = useState({ table_number: '', capacity: '', location: '', status: 'available' });
  // Chef form
  const [chefForm, setChefForm] = useState({ name: '', biography: '', signature_dish: '', image_url: '' });
  // Menu form
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', category: 'Saray Başlangıçları', image_url: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'tables') {
        const { data } = await supabase.from('tables').select('*').order('table_number');
        setTables(data || []);
      } else if (activeTab === 'chefs') {
        const { data } = await supabase.from('chefs').select('*').order('name');
        setChefs(data || []);
      } else if (activeTab === 'menu') {
        const { data } = await supabase.from('menu_items').select('*').order('category');
        setMenuItems(data || []);
      } else if (activeTab === 'reservations') {
        const { data } = await supabase.from('reservations').select('*').order('reservation_date', { ascending: false });
        setReservations(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Table operations
  const handleSaveTable = async () => {
    if (!tableForm.table_number || !tableForm.capacity || !tableForm.location) {
      alert('Tüm alanları doldurun');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('tables')
          .update({
            table_number: parseInt(tableForm.table_number),
            capacity: parseInt(tableForm.capacity),
            location: tableForm.location,
            status: tableForm.status
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tables')
          .insert([{
            table_number: parseInt(tableForm.table_number),
            capacity: parseInt(tableForm.capacity),
            location: tableForm.location,
            status: tableForm.status
          }]);

        if (error) throw error;
      }

      setTableForm({ table_number: '', capacity: '', location: '', status: 'available' });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving table:', error);
      alert('Hata oluştu');
    }
  };

  const handleEditTable = (table: Table) => {
    setTableForm({
      table_number: table.table_number.toString(),
      capacity: table.capacity.toString(),
      location: table.location,
      status: table.status
    });
    setEditingId(table.id);
    setShowForm(true);
  };

  const handleDeleteTable = async (id: string) => {
    if (!confirm('Bu masayı silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('tables').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting table:', error);
      alert('Hata oluştu');
    }
  };

  // Chef operations
  const handleSaveChef = async () => {
    if (!chefForm.name || !chefForm.biography || !chefForm.signature_dish || !chefForm.image_url) {
      alert('Tüm alanları doldurun');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('chefs')
          .update(chefForm)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('chefs').insert([chefForm]);
        if (error) throw error;
      }

      setChefForm({ name: '', biography: '', signature_dish: '', image_url: '' });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving chef:', error);
      alert('Hata oluştu');
    }
  };

  const handleEditChef = (chef: Chef) => {
    setChefForm(chef);
    setEditingId(chef.id);
    setShowForm(true);
  };

  const handleDeleteChef = async (id: string) => {
    if (!confirm('Bu aşçıyı silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('chefs').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting chef:', error);
      alert('Hata oluştu');
    }
  };

  // Menu operations
  const handleSaveMenuItem = async () => {
    if (!menuForm.name || !menuForm.description || !menuForm.price || !menuForm.image_url) {
      alert('Tüm alanları doldurun');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('menu_items')
          .update({
            ...menuForm,
            price: parseFloat(menuForm.price)
          })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('menu_items').insert([{
          ...menuForm,
          price: parseFloat(menuForm.price)
        }]);
        if (error) throw error;
      }

      setMenuForm({ name: '', description: '', price: '', category: 'Saray Başlangıçları', image_url: '' });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Hata oluştu');
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm('Bu yemeği silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Hata oluştu');
    }
  };

  const handleLogout = () => {
    removeAdminToken();
    window.location.href = '/';
  };

  const resetForm = () => {
    setTableForm({ table_number: '', capacity: '', location: '', status: 'available' });
    setChefForm({ name: '', biography: '', signature_dish: '', image_url: '' });
    setMenuForm({ name: '', description: '', price: '', category: 'Saray Başlangıçları', image_url: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#2A0A10]">
      <nav className="bg-[#1a0508] border-b border-[#D4AF37]/20 p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-[#D4AF37]">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded
                     hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6 border-b border-[#D4AF37]/20 overflow-x-auto">
          {(['tables', 'chefs', 'menu', 'reservations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                resetForm();
              }}
              className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#F5F5DC]/60 hover:text-[#F5F5DC]'
              }`}
            >
              {tab === 'tables' && 'Masalar'}
              {tab === 'chefs' && 'Aşçılar'}
              {tab === 'menu' && 'Menü'}
              {tab === 'reservations' && 'Rezervasyonlar'}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#3A1A20] to-[#2A0A10] rounded-lg p-8 w-full max-w-2xl border-2 border-[#D4AF37]/30 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#D4AF37]">
                  {activeTab === 'tables' && (editingId ? 'Masayı Düzenle' : 'Yeni Masa Ekle')}
                  {activeTab === 'chefs' && (editingId ? 'Aşçıyı Düzenle' : 'Yeni Aşçı Ekle')}
                  {activeTab === 'menu' && (editingId ? 'Yemeği Düzenle' : 'Yeni Yemek Ekle')}
                </h2>
                <button onClick={resetForm} className="text-[#D4AF37] hover:text-[#F5F5DC]">
                  <X size={24} />
                </button>
              </div>

              {activeTab === 'tables' && (
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Masa Numarası"
                    value={tableForm.table_number}
                    onChange={(e) => setTableForm({ ...tableForm, table_number: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="number"
                    placeholder="Kapasite (Kişi)"
                    value={tableForm.capacity}
                    onChange={(e) => setTableForm({ ...tableForm, capacity: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="text"
                    placeholder="Konum (Örn: Pencere Yanı)"
                    value={tableForm.location}
                    onChange={(e) => setTableForm({ ...tableForm, location: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <select
                    value={tableForm.status}
                    onChange={(e) => setTableForm({ ...tableForm, status: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="available">Müsait</option>
                    <option value="reserved">Rezerveli</option>
                    <option value="occupied">Dolu</option>
                  </select>
                  <button
                    onClick={handleSaveTable}
                    className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded hover:bg-[#F5F5DC] transition-colors"
                  >
                    Kaydet
                  </button>
                </div>
              )}

              {activeTab === 'chefs' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Aşçı Adı"
                    value={chefForm.name}
                    onChange={(e) => setChefForm({ ...chefForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    placeholder="Biyografi"
                    value={chefForm.biography}
                    onChange={(e) => setChefForm({ ...chefForm, biography: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] h-24"
                  />
                  <input
                    type="text"
                    placeholder="İmza Yemeği"
                    value={chefForm.signature_dish}
                    onChange={(e) => setChefForm({ ...chefForm, signature_dish: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="url"
                    placeholder="Resim URL"
                    value={chefForm.image_url}
                    onChange={(e) => setChefForm({ ...chefForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={handleSaveChef}
                    className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded hover:bg-[#F5F5DC] transition-colors"
                  >
                    Kaydet
                  </button>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Yemek Adı"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <textarea
                    placeholder="Açıklama"
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] h-20"
                  />
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Saray Başlangıçları</option>
                    <option>Taş Fırın</option>
                    <option>Ana Yemekler</option>
                    <option>Tatlılar</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Fiyat (₺)"
                    step="0.01"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input
                    type="url"
                    placeholder="Resim URL"
                    value={menuForm.image_url}
                    onChange={(e) => setMenuForm({ ...menuForm, image_url: e.target.value })}
                    className="w-full px-4 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={handleSaveMenuItem}
                    className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded hover:bg-[#F5F5DC] transition-colors"
                  >
                    Kaydet
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-[#F5F5DC]">Yükleniyor...</div>
        ) : (
          <>
            {activeTab === 'tables' && (
              <div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-semibold hover:bg-[#F5F5DC] transition-colors"
                >
                  <Plus size={18} />
                  Yeni Masa Ekle
                </button>
                <div className="grid gap-4">
                  {tables.map(table => (
                    <div key={table.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20 flex justify-between items-center">
                      <div>
                        <h3 className="text-[#D4AF37] font-bold">Masa {table.table_number}</h3>
                        <p className="text-[#F5F5DC]/80">{table.capacity} Kişilik - {table.location}</p>
                        <p className="text-sm text-[#F5F5DC]/60">Durum: {table.status === 'available' ? 'Müsait' : table.status === 'reserved' ? 'Rezerveli' : 'Dolu'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTable(table)}
                          className="p-2 bg-blue-600 rounded hover:bg-blue-700"
                        >
                          <Edit2 size={18} className="text-white" />
                        </button>
                        <button
                          onClick={() => handleDeleteTable(table.id)}
                          className="p-2 bg-red-600 rounded hover:bg-red-700"
                        >
                          <Trash2 size={18} className="text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chefs' && (
              <div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-semibold hover:bg-[#F5F5DC] transition-colors"
                >
                  <Plus size={18} />
                  Yeni Aşçı Ekle
                </button>
                <div className="grid gap-4">
                  {chefs.map(chef => (
                    <div key={chef.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[#D4AF37] font-bold text-lg">{chef.name}</h3>
                          <p className="text-[#F5F5DC]/80 text-sm line-clamp-2">{chef.biography}</p>
                          <p className="text-sm text-[#D4AF37] mt-2">İmza Yemeği: {chef.signature_dish}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditChef(chef)}
                            className="p-2 bg-blue-600 rounded hover:bg-blue-700"
                          >
                            <Edit2 size={18} className="text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteChef(chef.id)}
                            className="p-2 bg-red-600 rounded hover:bg-red-700"
                          >
                            <Trash2 size={18} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-semibold hover:bg-[#F5F5DC] transition-colors"
                >
                  <Plus size={18} />
                  Yeni Yemek Ekle
                </button>
                <div className="grid gap-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[#D4AF37] font-bold text-lg">{item.name}</h3>
                          <p className="text-[#F5F5DC]/80 text-sm">{item.description}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-[#F5F5DC]/60">{item.category}</span>
                            <span className="text-[#D4AF37] font-bold">₺{item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditMenuItem(item)}
                            className="p-2 bg-blue-600 rounded hover:bg-blue-700"
                          >
                            <Edit2 size={18} className="text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="p-2 bg-red-600 rounded hover:bg-red-700"
                          >
                            <Trash2 size={18} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div>
                <div className="space-y-4">
                  {reservations.length === 0 ? (
                    <p className="text-[#F5F5DC]/60">Henüz rezervasyon bulunmuyor</p>
                  ) : (
                    reservations.map(res => (
                      <div key={res.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[#D4AF37] font-bold">{res.customer_name}</p>
                            <p className="text-[#F5F5DC]/80 text-sm">{res.customer_email}</p>
                            <p className="text-[#F5F5DC]/80 text-sm">{res.customer_phone}</p>
                          </div>
                          <div>
                            <p className="text-[#F5F5DC]">{res.reservation_date} - {res.reservation_time}</p>
                            <p className="text-[#F5F5DC]/80 text-sm">{res.guest_count} Kişi</p>
                            <p className="text-sm text-[#D4AF37] font-semibold">Durum: {res.status === 'pending' ? 'Beklemede' : res.status === 'confirmed' ? 'Onaylandı' : res.status === 'completed' ? 'Tamamlandı' : 'İptal'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
