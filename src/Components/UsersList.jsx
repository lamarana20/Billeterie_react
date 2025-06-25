// src/pages/admin/UsersList.jsx
import React from 'react';
import { users } from '../Components/AuthContext'; // ⬅️ chemin correct selon ton projet


const UsersList = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Liste des utilisateurs</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Téléphone</th>
              <th className="p-2">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone || '—'}</td>
                <td className="p-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
