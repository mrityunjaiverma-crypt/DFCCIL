import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            if (file) {
                formData.append('file', file);
            }

            const res = await fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`
                    // Do NOT set Content-Type manually when sending FormData, browser will set it with the correct boundary
                },
                body: formData
            });

            if (res.ok) {
                setMessage('Successfully added new press release / letter!');
                setTitle('');
                setContent('');
                setFile(null);
                // Reset the file input visually
                const fileInput = document.getElementById('fileUpload');
                if (fileInput) fileInput.value = '';
            } else {
                const errorData = await res.json().catch(() => ({}));
                setMessage(`Failed to add: ${errorData.message || 'Session expired or Server Error'}`);
            }
        } catch (err) {
            setMessage('Server error.');
        }
    };

    return (
        <div className="admin-container py-10">
            <div className="container">
                <div className="flex justify-between items-center mb-6">
                    <h2>Admin Dashboard</h2>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>

                <div className="admin-card">
                    <h3>Upload New Press Release / Letter</h3>
                    {message && <div className="message-box">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title (Appears in Ticker)</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                                placeholder="E.g. New Housing Guidelines Released"
                            />
                        </div>
                        <div className="form-group">
                            <label>Content (Optional)</label>
                            <textarea 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)}
                                rows="4"
                                placeholder="Enter detailed description here..."
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Attach File (PDF, Image, etc) - Optional</label>
                            <input 
                                type="file" 
                                id="fileUpload"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                        </div>
                        <button type="submit" className="btn-primary">Publish</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;
