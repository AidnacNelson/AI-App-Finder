import React, { useEffect, useState } from 'react';

// Define the boolean filters you want to offer
const BOOLEAN_FILTERS = [
  { label: 'GDPR Compliant', field: 'GDPR Compliant' },
  { label: 'Offline Functionality', field: 'Offline Functionality' },
  { label: 'Mobile Optimization', field: 'Mobile Optimization' },
  // Add more as needed
];

// Example categories for dropdown
const CATEGORIES = [
  'Productivity',
  'Education',
  'Health',
  // Add your actual categories here
];

export default function AppList() {
  const [filters, setFilters] = useState({});
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle checkbox and dropdown changes
  function handleFilterChange(e) {
    const { name, type, checked, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (filters['GDPR Compliant']) params.append('gdpr', 'true');
    if (filters['Offline Functionality']) params.append('offline', 'true');
    if (filters['Mobile Optimization']) params.append('mobile', 'true');
    if (filters.category) params.append('category', filters.category);

    fetch(`/api/apps?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setApps(data.records || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Filter Apps</h2>
      <form style={{ marginBottom: 20 }}>
        {BOOLEAN_FILTERS.map(({ label, field }) => (
          <label key={field} style={{ display: 'block', marginBottom: 8 }}>
            <input
              type="checkbox"
              name={field}
              checked={!!filters[field]}
              onChange={handleFilterChange}
            />
            {label}
          </label>
        ))}
        <label style={{ display: 'block', marginTop: 10 }}>
          Category:
          <select
            name="category"
            value={filters.category || ''}
            onChange={handleFilterChange}
            style={{ marginLeft: 8 }}
          >
            <option value="">All</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </form>
      <h3>Results</h3>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {apps.length === 0 && <li>No results found.</li>}
          {apps.map((record) => (
            <li key={record.id} style={{ marginBottom: 16, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
              <strong>{record.fields['App Name'] || 'Unnamed App'}</strong>
              {record.fields['Description'] && (
                <div style={{ color: '#555', fontSize: 14 }}>{record.fields['Description']}</div>
              )}
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}