import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, User, Star, Globe, Shield, Zap, Users, Settings, BarChart3 } from 'lucide-react';

const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const appsTable = 'Apps';
const personasTable = 'Personas';

const criteriaIcons = {
  easeOfUse: <Zap className="w-4 h-4" />,
  affordability: <BarChart3 className="w-4 h-4" />,
  privacySecurity: <Shield className="w-4 h-4" />,
  ethicalPractices: <Star className="w-4 h-4" />,
  communityFeatures: <Users className="w-4 h-4" />,
  integrationCapabilities: <Settings className="w-4 h-4" />,
  performanceReliability: <Zap className="w-4 h-4" />,
  aestheticDesign: <Star className="w-4 h-4" />,
  scalability: <BarChart3 className="w-4 h-4" />,
  mobileOptimization: <Globe className="w-4 h-4" />,
  accessibility: <Users className="w-4 h-4" />,
  customerSupport: <Users className="w-4 h-4" />,
  customization: <Settings className="w-4 h-4" />,
  automationFeatures: <Zap className="w-4 h-4" />,
  collaborationTools: <Users className="w-4 h-4" />,
  environmentalImpact: <Globe className="w-4 h-4" />,
  innovationFactor: <Star className="w-4 h-4" />
};

const AppFinder = () => {
  const [apps, setApps] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [customWeights, setCustomWeights] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAirtable = async (table, setter) => {
      const url = `https://api.airtable.com/v0/${airtableBaseId}/${table}`;
      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${airtableApiKey}` }
      });
      const { records } = await resp.json();
      const data = records.map(({ id, fields }) => ({ id, ...fields }));
      setter(data);
    };

    fetchAirtable(appsTable, setApps);
    fetchAirtable(personasTable, setPersonas);
  }, []);

  const calculateScore = (app, weights) => {
    let totalScore = 0;
    let totalWeight = 0;
    Object.entries(weights).forEach(([criterion, weight]) => {
      if (app.scores?.[criterion] != null) {
        totalScore += app.scores[criterion] * weight;
        totalWeight += weight;
      }
    });
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  };

  const effectiveWeights = useMemo(() => {
    if (selectedPersona) return selectedPersona.weights;
    if (Object.keys(customWeights).length) return customWeights;
    if (apps[0]?.scores) {
      return Object.fromEntries(
        Object.keys(apps[0].scores).map(key => [key, 0.5])
      );
    }
    return {};
  }, [selectedPersona, customWeights, apps]);

  const filteredAndSortedApps = useMemo(() => {
    let filtered = [...apps];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term)
      );
    }
    return filtered
      .map(app => ({
        ...app,
        weightedScore: calculateScore(app, effectiveWeights)
      }))
      .sort((a, b) => b.weightedScore - a.weightedScore);
  }, [apps, searchTerm, effectiveWeights]);

  const updateCustomWeight = (criterion, value) => {
    setCustomWeights(prev => ({ ...prev, [criterion]: parseFloat(value) }));
    setSelectedPersona(null);
  };

  const ScoreBar = ({ score, label }) => (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            style={{ width: `${score * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium w-8">{(score * 100).toFixed(0)}%</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI App Finder</h1>
          <p className="text-gray-600">Discover the perfect AI tools based on your needs and preferences</p>
        </div>
      </div>
      {/* rest of component layout unchanged, but replace mockApps with apps and mockPersonas with personas */}
    </div>
  );
};

export default AppFinder;
