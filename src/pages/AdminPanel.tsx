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

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'tables' | 'chefs' | 'menu'>('tables');
  const [tables, setTables] = useState<Table[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [tableForm, setTableForm] = useState({ table_number: '', capacity: '', location: '', status: 'available' });
  const [chefForm, setChefForm] = useState({ name: '', biography: '', signature_dish: '', image_url: '' });
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', category: 'Saray Başlangıçları', image_url: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tablesData, chefsData, menuData] = await Promise.all([
        supabase.from('tables').select('*').order('table_number'),
        supabase.from('chefs').select('*').order('name'),
        supabase.from('menu_items').select('*').order('category')
      ]);
      if (tablesData.data) setTables(tablesData.data);
      if (chefsData.data) setChefs(chefsData.data);
      if (menuData.data) setMenuItems(menuData.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTableForm({ table_number: '', capacity: '', location: '', status: 'available' });
    setChefForm({ name: '', biography: '', signature_dish: '', image_url: '' });
    setMenuForm({ name: '', description: '', price: '', category: 'Saray Başlangıçları', image_url: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSaveTable = async () => {
    if (!tableForm.table_number || !tableForm.capacity || !tableForm.location) {
      alert('Tüm alanları doldurun');
      return;
    }
    try {
      if (editingId) {
        await supabase.from('tables').update({
          table_number: parseInt(tableForm.table_number),
          capacity: parseInt(tableForm.capacity),
          location: tableForm.location,
          status: tableForm.status
        }).eq('id', editingId);
      } else {
        await supabase.from('tables').insert([{
          table_number: parseInt(tableForm.table_number),
          capacity: parseInt(tableForm.capacity),
          location: tableForm.location,
          status: tableForm.status
        }]);
      }
      fetchData();
      resetForm();
    } catch (error) {
      alert('Hata oluştu');
    }
  };

  const handleSaveChef = async () => {
    if (!chefForm.name || !chefForm.biography || !chefForm.signature_dish || !chefForm.image_url) {
      alert('Tüm alanları doldurun');
      return;
    }
    try {
      if (editingId) {
        await supabase.from('chefs').update(chefForm).eq('id', editingId);
      } else {
        await supabase.from('chefs').insert([chefForm]);
      }
      fetchData();
      resetForm();
    } catch (error) {
      alert('Hata oluştu');
    }
  };

  const handleSaveMenuItem = async () => {
    if (!menuForm.name || !menuForm.description || !menuForm.price || !menuForm.image_url) {
      alert('Tüm alanları doldurun');
      return;
    }
    try {
      if (editingId) {
        await supabase.from('menu_items').update({
          name: menuForm.name,
          description: menuForm.description,
          price: parseFloat(menuForm.price),
          category: menuForm.category,
          image_url: menuForm.image_url
        }).eq('id', editingId);
      } else {
        await supabase.from('menu_items').insert([{
          name: menuForm.name,
          description: menuForm.description,
          price: parseFloat(menuForm.price),
          category: menuForm.category,
          image_url: menuForm.image_url
        }]);
      }
      fetchData();
      resetForm();
    } catch (error) {
      alert('Hata oluştu');
    }
  };

  const handleLogout = () => {
    removeAdminToken();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#2A0A10]">
      <nav className="bg-[#1a0508] border-b border-[#D4AF37]/20 p-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-serif text-2xl font-bold text-[#D4AF37]">Admin Panel</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6 border-b border-[#D4AF37]/20">
          {(['tables', 'chefs', 'menu'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); resetForm(); }}
              className={`px-4 py-2 font-semibold ${activeTab === tab ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#F5F5DC]/60'}`}
            >
              {tab === 'tables' && 'Masalar'}
              {tab === 'chefs' && 'Aşçılar'}
              {tab === 'menu' && 'Menü'}
            </button>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#3A1A20] rounded-lg p-8 w-full max-w-md border-2 border-[#D4AF37]/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl font-bold text-[#D4AF37]">
                  {activeTab === 'tables' && (editingId ? 'Masayı Düzenle' : 'Yeni Masa')}
                  {activeTab === 'chefs' && (editingId ? 'Aşçıyı Düzenle' : 'Yeni Aşçı')}
                  {activeTab === 'menu' && (editingId ? 'Yemeği Düzenle' : 'Yeni Yemek')}
                </h2>
                <button onClick={resetForm} className="text-[#D4AF37]">
                  <X size={24} />
                </button>
              </div>

              {activeTab === 'tables' && (
                <div className="space-y-3">
                  <input type="number" placeholder="Masa No" value={tableForm.table_number} onChange={(e) => setTableForm({...tableForm, table_number: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <input type="number" placeholder="Kapasite" value={tableForm.capacity} onChange={(e) => setTableForm({...tableForm, capacity: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <input type="text" placeholder="Konum" value={tableForm.location} onChange={(e) => setTableForm({...tableForm, location: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <select value={tableForm.status} onChange={(e) => setTableForm({...tableForm, status: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]">
                    <option value="available">Müsait</option>
                    <option value="reserved">Rezerveli</option>
                  </select>
                  <button onClick={handleSaveTable} className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded">Kaydet</button>
                </div>
              )}

              {activeTab === 'chefs' && (
                <div className="space-y-3">
                  <input type="text" placeholder="Adı" value={chefForm.name} onChange={(e) => setChefForm({...chefForm, name: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <textarea placeholder="Biyografi" value={chefForm.biography} onChange={(e) => setChefForm({...chefForm, biography: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] h-20" />
                  <input type="text" placeholder="İmza Yemeği" value={chefForm.signature_dish} onChange={(e) => setChefForm({...chefForm, signature_dish: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <input type="url" placeholder="Resim URL" value={chefForm.image_url} onChange={(e) => setChefForm({...chefForm, image_url: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <button onClick={handleSaveChef} className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded">Kaydet</button>
                </div>
              )}

              {activeTab === 'menu' && (
                <div className="space-y-3">
                  <input type="text" placeholder="Yemek Adı" value={menuForm.name} onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <textarea placeholder="Açıklama" value={menuForm.description} onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC] h-16" />
                  <select value={menuForm.category} onChange={(e) => setMenuForm({...menuForm, category: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]">
                    <option>Saray Başlangıçları</option>
                    <option>Taş Fırın</option>
                    <option>Ana Yemekler</option>
                    <option>Tatlılar</option>
                  </select>
                  <input type="number" placeholder="Fiyat" step="0.01" value={menuForm.price} onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <input type="url" placeholder="Resim URL" value={menuForm.image_url} onChange={(e) => setMenuForm({...menuForm, image_url: e.target.value})} className="w-full px-3 py-2 bg-[#2A0A10] border border-[#D4AF37]/30 rounded text-[#F5F5DC]" />
                  <button onClick={handleSaveMenuItem} className="w-full py-2 bg-[#D4AF37] text-[#2A0A10] font-bold rounded">Kaydet</button>
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
                <button onClick={() => {resetForm(); setShowForm(true);}} className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-bold hover:bg-[#F5F5DC]">
                  <Plus size={18} />
                  Yeni Masa Ekle
                </button>
                <div className="grid gap-3">
                  {tables.length === 0 ? (
                    <p className="text-[#F5F5DC]/60">Henüz masa eklenmemiş</p>
                  ) : (
                    tables.map(table => (
                      <div key={table.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20 flex justify-between items-center">
                        <div>
                          <h3 className="text-[#D4AF37] font-bold">Masa {table.table_number}</h3>
                          <p className="text-[#F5F5DC]/80 text-sm">{table.capacity} Kişi - {table.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setTableForm({table_number: table.table_number.toString(), capacity: table.capacity.toString(), location: table.location, status: table.status}); setEditingId(table.id); setShowForm(true); }} className="p-2 bg-blue-600 rounded hover:bg-blue-700">
                            <Edit2 size={16} className="text-white" />
                          </button>
                          <button onClick={async () => { if(confirm('Sil?')) { await supabase.from('tables').delete().eq('id', table.id); fetchData(); }}} className="p-2 bg-red-600 rounded hover:bg-red-700">
                            <Trash2 size={16} className="text-white" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'chefs' && (
              <div>
                <button onClick={() => {resetForm(); setShowForm(true);}} className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-bold hover:bg-[#F5F5DC]">
                  <Plus size={18} />
                  Yeni Aşçı Ekle
                </button>
                <div className="grid gap-3">
                  {chefs.length === 0 ? (
                    <p className="text-[#F5F5DC]/60">Henüz aşçı eklenmemiş</p>
                  ) : (
                    chefs.map(chef => (
                      <div key={chef.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-[#D4AF37] font-bold">{chef.name}</h3>
                            <p className="text-[#F5F5DC]/80 text-sm line-clamp-2">{chef.biography}</p>
                            <p className="text-sm text-[#D4AF37] mt-1">İmza: {chef.signature_dish}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => { setChefForm(chef); setEditingId(chef.id); setShowForm(true); }} className="p-2 bg-blue-600 rounded hover:bg-blue-700">
                              <Edit2 size={16} className="text-white" />
                            </button>
                            <button onClick={async () => { if(confirm('Sil?')) { await supabase.from('chefs').delete().eq('id', chef.id); fetchData(); }}} className="p-2 bg-red-600 rounded hover:bg-red-700">
                              <Trash2 size={16} className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <button onClick={() => {resetForm(); setShowForm(true);}} className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2A0A10] rounded font-bold hover:bg-[#F5F5DC]">
                  <Plus size={18} />
                  Yeni Yemek Ekle
                </button>
                <div className="grid gap-3">
                  {menuItems.length === 0 ? (
                    <p className="text-[#F5F5DC]/60">Henüz yemek eklenmemiş</p>
                  ) : (
                    menuItems.map(item => (
                      <div key={item.id} className="bg-[#3A1A20] p-4 rounded border border-[#D4AF37]/20">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-[#D4AF37] font-bold">{item.name}</h3>
                            <p className="text-[#F5F5DC]/80 text-sm">{item.description}</p>
                            <div className="flex gap-4 mt-1 text-sm">
                              <span className="text-[#F5F5DC]/60">{item.category}</span>
                              <span className="text-[#D4AF37] font-bold">₺{item.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => { setMenuForm({name: item.name, description: item.description, price: item.price.toString(), category: item.category, image_url: item.image_url}); setEditingId(item.id); setShowForm(true); }} className="p-2 bg-blue-600 rounded hover:bg-blue-700">
                              <Edit2 size={16} className="text-white" />
                            </button>
                            <button onClick={async () => { if(confirm('Sil?')) { await supabase.from('menu_items').delete().eq('id', item.id); fetchData(); }}} className="p-2 bg-red-600 rounded hover:bg-red-700">
                              <Trash2 size={16} className="text-white" />
                            </button>
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
