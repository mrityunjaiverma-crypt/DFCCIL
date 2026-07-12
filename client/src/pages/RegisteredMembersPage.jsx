import React, { useState, useEffect } from 'react';
import './RegisteredMembersPage.css';
import { Users, Search } from 'lucide-react';

const RegisteredMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/registrations');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      } else {
        throw new Error('Server returned an error');
      }
    } catch (err) {
      console.warn('Backend unreachable, loading from local storage as fallback for demo purposes:', err);
      // Fallback for Netlify demo without backend
      const localData = JSON.parse(localStorage.getItem('mockRegistrations') || '[]');
      setMembers(localData);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-page-container">
      <div className="members-header">
        <div className="header-content">
          <h2><Users className="inline-icon" /> Registered Members</h2>
          <p>Official list of DFCCIL employees who have registered for the housing society.</p>
        </div>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or dept..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="members-content fade-in">
        {loading ? (
          <div className="text-center py-10">Loading members...</div>
        ) : error ? (
          <div className="error-message text-center">{error}</div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-10">No members found matching your search.</div>
        ) : (
          <div className="members-table-wrapper">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Flat Preference</th>
                  <th>Date Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td className="member-name">{member.fullName}</td>
                    <td>{member.employeeId}</td>
                    <td>{member.department}</td>
                    <td><span className="flat-badge">{member.flatType}</span></td>
                    <td>{new Date(member.registrationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredMembersPage;
