import React, { useState } from 'react';
import { SystemUser } from '../../types';
import { toNepaliDigits } from '../../utils/nepaliDate';
import {
  Users,
  UserPlus,
  Shield,
  Search,
  Eye,
  Edit2,
  Trash2,
  X,
  Save,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface UserManagementViewProps {
  users: SystemUser[];
  onAddUser: (user: SystemUser) => void;
  onUpdateUser: (user: SystemUser) => void;
  onDeleteUser: (id: string) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('शाखा अधिकृत');
  const [branch, setBranch] = useState('उजुरी छानबिन शाखा');
  const [role, setRole] = useState<'super_admin' | 'admin' | 'officer' | 'operator'>('officer');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const filtered = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.designation.toLowerCase().includes(q) ||
      u.branch.toLowerCase().includes(q)
    );
  });

  const openNewModal = () => {
    setEditingUser(null);
    setName('');
    setUsername('');
    setEmail('');
    setPhone('');
    setDesignation('शाखा अधिकृत');
    setBranch('उजुरी तथा उजुरी छानबिन शाखा');
    setRole('officer');
    setStatus('active');
    setIsModalOpen(true);
  };

  const openEditModal = (u: SystemUser) => {
    setEditingUser(u);
    setName(u.name);
    setUsername(u.username);
    setEmail(u.email);
    setPhone(u.phone);
    setDesignation(u.designation);
    setBranch(u.branch);
    setRole(u.role);
    setStatus(u.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      alert('नाम र प्रयोगकर्ता नाम अनिवार्य छ।');
      return;
    }

    if (editingUser) {
      onUpdateUser({
        ...editingUser,
        name,
        username,
        email,
        phone,
        designation,
        branch,
        role,
        status
      });
    } else {
      const newUser: SystemUser = {
        id: `USR-${Date.now()}`,
        name,
        username,
        email,
        phone,
        designation,
        branch,
        role,
        status,
        lastLogin: 'अहिलेसम्म लगइन नभएको'
      };
      onAddUser(newUser);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 p-1 text-xs">
      {/* Header with Stats */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-[#0c2f55] rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#0c2f55] m-0">
              प्रणाली प्रयोगकर्ता व्यवस्थापन (User Access Control)
            </h2>
            <p className="text-gray-500 text-[11px] m-0">
              राष्ट्रिय सतर्कता केन्द्रका अधिकृत तथा प्राविधिकहरूको भूमिका तथा पहुँच अधिकार
            </p>
          </div>
        </div>

        <button
          onClick={openNewModal}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#0c2f55] hover:bg-[#124275] text-white rounded-lg font-bold cursor-pointer shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>नयाँ प्रयोगकर्ता थप्नुहोस्</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-[#dbe4ef] shadow-xs overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between gap-2 bg-[#f8fafc]">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="नाम, पद, शाखा खोज्नुहोस्..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cfdbe8] rounded bg-white"
            />
          </div>
          <span className="text-[11px] text-gray-500">
            कुल: <b>{toNepaliDigits(filtered.length)}</b> जना प्रयोगकर्ता
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#e9edf5] text-[#0c2f55] border-b font-bold text-[11px]">
                <th className="p-2.5 text-left">नाम / पद</th>
                <th className="p-2.5 text-left">प्रयोगकर्ता नाम</th>
                <th className="p-2.5 text-left">शाखा / महाशाखा</th>
                <th className="p-2.5 text-left">भूमिका (Role)</th>
                <th className="p-2.5 text-left">सम्पर्क नम्बर</th>
                <th className="p-2.5 text-left">अन्तिम लगइन</th>
                <th className="p-2.5 text-center">स्थिति</th>
                <th className="p-2.5 text-center">कार्य</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2f7]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="p-2.5">
                    <span className="font-bold text-[#0c2f55] block">{u.name}</span>
                    <span className="text-[10px] text-gray-400">{u.designation}</span>
                  </td>
                  <td className="p-2.5 font-mono text-blue-700">{u.username}</td>
                  <td className="p-2.5 text-gray-700">{u.branch}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'super_admin'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'admin'
                          ? 'bg-blue-100 text-blue-800'
                          : u.role === 'officer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {u.role === 'super_admin'
                        ? 'सुपर प्रशासक'
                        : u.role === 'admin'
                        ? 'प्रशासक'
                        : u.role === 'officer'
                        ? 'अनुगमन अधिकृत'
                        : 'डाटा अपरेटर'}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-gray-600">{u.phone || '—'}</td>
                  <td className="p-2.5 font-mono text-gray-500">{u.lastLogin}</td>
                  <td className="p-2.5 text-center">
                    {u.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        <CheckCircle className="w-3 h-3" /> सक्रिय
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-bold text-[10px]">
                        <XCircle className="w-3 h-3" /> निष्क्रिय
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(u)}
                        className="p-1 rounded text-amber-600 hover:bg-amber-100"
                        title="सम्पादन"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`के तपाईं निश्चित हुनुहुन्छ? ${u.name}`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        className="p-1 rounded text-red-600 hover:bg-red-100"
                        title="मेटाउनुहोस्"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-5 text-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#0c2f55]">
                {editingUser ? 'प्रयोगकर्ता सम्पादन' : 'नयाँ प्रयोगकर्ता खाता सिर्जना'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">पूरा नाम *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-1.5 border rounded font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">प्रयोगकर्ता नाम (Username) *</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">पद</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">शाखा / महाशाखा</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full p-1.5 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">भूमिका (Role)</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-1.5 border rounded bg-white font-semibold"
                  >
                    <option value="super_admin">सुपर प्रशासक (Super Admin)</option>
                    <option value="admin">प्रशासक (Admin)</option>
                    <option value="officer">अनुगमन अधिकृत (Monitoring Officer)</option>
                    <option value="operator">डाटा अपरेटर (Data Operator)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">सम्पर्क नम्बर</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-1.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border rounded bg-white font-bold"
                >
                  रद्द
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0c2f55] text-white rounded font-bold flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>सुरक्षित गर्नुहोस्</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
