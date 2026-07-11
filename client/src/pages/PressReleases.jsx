import React, { useState, useEffect } from 'react';
import { FileText, Edit2, Trash2, X } from 'lucide-react';
import './PressReleases.css';

const PressReleases = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // Auth modal state
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [authUsername, setAuthUsername] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        setIsAdmin(!!localStorage.getItem('adminToken'));
        
        const fetchNews = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/news');
                if (!res.ok) throw new Error('Failed to fetch press releases');
                const data = await res.json();
                // Sort by date descending (assuming newer items are created later, or sorting by createdAt)
                data.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
                setNews(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load press releases. Database connection might be offline.');
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.');
    };

    // Get today's date for the header
    const today = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const handleDelete = async (id) => {
        if (!isAdmin) {
            setPendingAction({ type: 'delete', id });
            setAuthModalOpen(true);
            return;
        }

        if (!window.confirm('Are you sure you want to delete this press release?')) return;
        
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`http://localhost:5000/api/news/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setNews(news.filter(item => item._id !== id));
            } else {
                alert('Failed to delete.');
            }
        } catch (err) {
            console.error(err);
            alert('Server error.');
        }
    };

    const openEditModal = (item) => {
        if (!isAdmin) {
            setPendingAction({ type: 'edit', item });
            setAuthModalOpen(true);
            return;
        }
        setEditingItem(item);
        setEditTitle(item.title);
        setEditContent(item.content || '');
        setEditModalOpen(true);
    };

    const handleAuthSubmit = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: authUsername, password: authPassword })
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('adminToken', data.token);
                setIsAdmin(true);
                setAuthModalOpen(false);
                setAuthError('');
                
                // Execute pending action
                if (pendingAction.type === 'delete') {
                    // Have to call handleDelete directly or just prompt confirm here
                    if (window.confirm('Are you sure you want to delete this press release?')) {
                        const deleteRes = await fetch(`http://localhost:5000/api/news/${pendingAction.id}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${data.token}` }
                        });
                        if (deleteRes.ok) setNews(news.filter(i => i._id !== pendingAction.id));
                    }
                } else if (pendingAction.type === 'edit') {
                    setEditingItem(pendingAction.item);
                    setEditTitle(pendingAction.item.title);
                    setEditContent(pendingAction.item.content || '');
                    setEditModalOpen(true);
                }
                setPendingAction(null);
            } else {
                setAuthError('Invalid credentials');
            }
        } catch (err) {
            setAuthError('Server error');
        }
    };

    const handleEditSave = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`http://localhost:5000/api/news/${editingItem._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ title: editTitle, content: editContent })
            });
            
            if (res.ok) {
                const updatedItem = await res.json();
                setNews(news.map(item => item._id === updatedItem._id ? updatedItem : item));
                setEditModalOpen(false);
            } else {
                alert('Failed to update.');
            }
        } catch (err) {
            console.error(err);
            alert('Server error.');
        }
    };

    return (
        <div className="press-releases-container">
            <div className="pr-header">
                <h2>DFCCIL PRESS RELEASE</h2>
                <div className="last-updated">Last Updated On:{today}</div>
            </div>
            
            <div className="pr-table-wrapper">
                <table className="pr-table">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>HEADLINE</th>
                            <th>RELEASE DATE</th>
                            <th>DETAILS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>Loading press releases...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'red' }}>{error}</td>
                            </tr>
                        )}
                        {!loading && !error && news.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No press releases available.</td>
                            </tr>
                        )}
                        {!loading && !error && news.map((item, index) => (
                            <tr key={item._id || index}>
                                <td>{news.length - index}</td>
                                <td>{item.title}</td>
                                <td>{formatDate(item.createdAt || item.date)}</td>
                                <td>
                                    {item.fileUrl ? (
                                        <a 
                                            href={`http://localhost:5000${item.fileUrl}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="view-pdf-link"
                                        >
                                            View PDF <FileText className="pdf-icon" />
                                        </a>
                                    ) : (
                                        <span className="no-file">No File Attached</span>
                                    )}
                                </td>
                                <td className="actions-cell">
                                    <button className="action-btn edit-btn" onClick={() => openEditModal(item)} title="Edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(item._id)} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit Press Release</h3>
                            <button className="close-btn" onClick={() => setEditModalOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    value={editTitle} 
                                    onChange={(e) => setEditTitle(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea 
                                    value={editContent} 
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows="4"
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setEditModalOpen(false)}>Cancel</button>
                            <button className="btn-save" onClick={handleEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Auth Modal */}
            {authModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h3>Admin Login Required</h3>
                            <button className="close-btn" onClick={() => { setAuthModalOpen(false); setAuthError(''); }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {authError && <div style={{ color: 'red', marginBottom: '10px' }}>{authError}</div>}
                            <div className="form-group">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    value={authUsername} 
                                    onChange={(e) => setAuthUsername(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    value={authPassword} 
                                    onChange={(e) => setAuthPassword(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => { setAuthModalOpen(false); setAuthError(''); }}>Cancel</button>
                            <button className="btn-save" onClick={handleAuthSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PressReleases;
