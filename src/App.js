import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, User, Star, Globe, Shield, Zap, Users, Settings, BarChart3 } from 'lucide-react';

// Mock data based on your CSV files
const mockApps = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    website: 'https://chatgpt.com/',
    description: 'ChatGPT is a generative artificial intelligence chatbot. It can hold conversations, answer questions, generate text, write code, summarize documents, offer advice, translate languages, and more.',
    shortDescription: 'ChatGPT is an AI chatbot that interacts in natural language and generates human-like responses',
    category: 'Artificial Intelligence',
    scores: {
      easeOfUse: 0.85,
      affordability: 0.8,
      privacySecurity: 0.6,
      ethicalPractices: 0.7,
      communityFeatures: 0.2,
      integrationCapabilities: 0.5,
      performanceReliability: 0.85,
      aestheticDesign: 0.6,
      scalability: 0.8,
      mobileOptimization: 0.8,
      accessibility: 0.6,
      customerSupport: 0.5,
      customization: 0.4,
      automationFeatures: 0.3,
      collaborationTools: 0.2,
      environmentalImpact: 0.3,
      innovationFactor: 0.9
    }
  },
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    website: 'https://claude.ai/',
    description: 'Claude is a next-generation AI assistant designed by Anthropic for natural, text-based conversation, advanced reasoning, programming help, summarization, multilingual translation, data analysis, and creative tasks.',
    shortDescription: 'Claude is an advanced AI chatbot offering natural conversations, complex task assistance, and analysis with a focus on ethics and reliability',
    category: 'Artificial Intelligence',
    scores: {
      easeOfUse: 0.8,
      affordability: 0.75,
      privacySecurity: 0.65,
      ethicalPractices: 0.7,
      communityFeatures: 0.3,
      integrationCapabilities: 0.55,
      performanceReliability: 0.8,
      aestheticDesign: 0.65,
      scalability: 0.75,
      mobileOptimization: 0.7,
      accessibility: 0.6,
      customerSupport: 0.6,
      customization: 0.45,
      automationFeatures: 0.35,
      collaborationTools: 0.4,
      environmentalImpact: 0.3,
      innovationFactor: 0.85
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google LLC',
    website: 'https://gemini.google.com/',
    description: 'Gemini is Google\'s AI conversational assistant and content generation platform. It can answer questions, analyze and summarize documents, code, generate creative text, process images, and act as a productivity assistant.',
    shortDescription: 'Gemini is Google\'s advanced AI assistant for conversation, content generation, analysis, and productivity.',
    category: 'Artificial Intelligence',
    scores: {
      easeOfUse: 0.8,
      affordability: 0.75,
      privacySecurity: 0.75,
      ethicalPractices: 0.7,
      communityFeatures: 0.3,
      integrationCapabilities: 0.7,
      performanceReliability: 0.85,
      aestheticDesign: 0.7,
      scalability: 0.8,
      mobileOptimization: 0.8,
      accessibility: 0.65,
      customerSupport: 0.6,
      customization: 0.5,
      automationFeatures: 0.4,
      collaborationTools: 0.6,
      environmentalImpact: 0.3,
      innovationFactor: 0.9
    }
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    company: 'Synthesia Ltd.',
    website: 'https://www.synthesia.io/',
    description: 'Synthesia is an AI video generation platform that enables users to create professional-quality videos from text, PowerPoints, and scripts. It leverages AI avatars, voice cloning, multilingual support, and more.',
    shortDescription: 'AI platform to turn text into professional, branded videos with avatars—no filming or editing required.',
    category: 'Video Creation',
    scores: {
      easeOfUse: 0.85,
      affordability: 0.6,
      privacySecurity: 0.7,
      ethicalPractices: 0.75,
      communityFeatures: 0.3,
      integrationCapabilities: 0.6,
      performanceReliability: 0.85,
      aestheticDesign: 0.75,
      scalability: 0.8,
      mobileOptimization: 0.7,
      accessibility: 0.6,
      customerSupport: 0.7,
      customization: 0.65,
      automationFeatures: 0.4,
      collaborationTools: 0.6,
      environmentalImpact: 0.3,
      innovationFactor: 0.85
    }
  }
];

const mockPersonas = [
  {
    id: 'soulful-entrepreneur',
    name: 'The Soulful Entrepreneur',
    persona: 'Serenity Faul',
    description: 'Age: 38, Life Coach & Wellness Brand Founder. Serenity left her corporate marketing career five years ago to launch "Sacred Pathways," a holistic coaching practice that combines mindfulness with business strategy.',
    weights: {
      easeOfUse: 0.9,
      affordability: 0.8,
      privacySecurity: 0.7,
      ethicalPractices: 0.95,
      communityFeatures: 0.85,
      integrationCapabilities: 0.6,
      performanceReliability: 0.7,
      aestheticDesign: 0.9,
      scalability: 0.6,
      mobileOptimization: 0.8,
      accessibility: 0.8,
      customerSupport: 0.7,
      customization: 0.6,
      automationFeatures: 0.5,
      collaborationTools: 0.8,
      environmentalImpact: 0.85,
      innovationFactor: 0.6
    }
  },
  {
    id: 'ethical-technologist',
    name: 'The Ethical Technologist',
    persona: 'Skye Washington-Li',
    description: 'Age: 42, Indigenous Tech Advocate & Researcher. Dr. Skye Washington-Li is a Lakota computer scientist who leads the Digital Sovereignty Initiative at a progressive university.',
    weights: {
      easeOfUse: 0.6,
      affordability: 0.9,
      privacySecurity: 0.95,
      ethicalPractices: 1.0,
      communityFeatures: 0.9,
      integrationCapabilities: 0.8,
      performanceReliability: 0.8,
      aestheticDesign: 0.5,
      scalability: 0.9,
      mobileOptimization: 0.6,
      accessibility: 0.95,
      customerSupport: 0.4,
      customization: 0.9,
      automationFeatures: 0.7,
      collaborationTools: 0.9,
      environmentalImpact: 0.95,
      innovationFactor: 0.9
    }
  },
  {
    id: 'startup-engineer',
    name: 'The StartUp Engineer',
    persona: 'Nakul Kumar',
    description: 'Age: 32, SaaS Startup Founder. Nakul founded a project management tool specifically for creative agencies after experiencing frustration at his previous marketing job.',
    weights: {
      easeOfUse: 0.4,
      affordability: 0.6,
      privacySecurity: 0.9,
      ethicalPractices: 0.7,
      communityFeatures: 0.6,
      integrationCapabilities: 0.95,
      performanceReliability: 0.95,
      aestheticDesign: 0.3,
      scalability: 0.9,
      mobileOptimization: 0.4,
      accessibility: 0.6,
      customerSupport: 0.3,
      customization: 0.9,
      automationFeatures: 0.9,
      collaborationTools: 0.8,
      environmentalImpact: 0.8,
      innovationFactor: 0.5
    }
  }
];
const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const appsTable = 'Apps';
const personasTable = 'Personas';

const criteriaIcons = {
easeOfUse: <Zap className="w-4 h-4" />,
@@ -216,78 +27,80 @@ const criteriaIcons = {
};

const AppFinder = () => {
  const [apps, setApps] = useState([]);
  const [personas, setPersonas] = useState([]);
const [selectedPersona, setSelectedPersona] = useState(null);
const [customWeights, setCustomWeights] = useState({});
const [searchTerm, setSearchTerm] = useState('');
const [showFilters, setShowFilters] = useState(false);

  // Calculate weighted scores for apps
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
      if (app.scores[criterion] !== undefined) {
      if (app.scores?.[criterion] != null) {
totalScore += app.scores[criterion] * weight;
totalWeight += weight;
}
});
    
return totalWeight > 0 ? totalScore / totalWeight : 0;
};

  // Get effective weights (persona or custom)
const effectiveWeights = useMemo(() => {
    if (selectedPersona) {
      return selectedPersona.weights;
    }
    if (Object.keys(customWeights).length > 0) {
      return customWeights;
    if (selectedPersona) return selectedPersona.weights;
    if (Object.keys(customWeights).length) return customWeights;
    if (apps[0]?.scores) {
      return Object.fromEntries(
        Object.keys(apps[0].scores).map(key => [key, 0.5])
      );
}
    // Default equal weights
    const defaultWeights = {};
    Object.keys(mockApps[0].scores).forEach(key => {
      defaultWeights[key] = 0.5;
    });
    return defaultWeights;
  }, [selectedPersona, customWeights]);
    return {};
  }, [selectedPersona, customWeights, apps]);

  // Filter and sort apps
const filteredAndSortedApps = useMemo(() => {
    let filtered = mockApps;
    
    // Apply search filter
    let filtered = [...apps];
if (searchTerm) {
      const term = searchTerm.toLowerCase();
filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase())
        app.name.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term)
);
}
    
    // Calculate scores and sort
return filtered
.map(app => ({
...app,
weightedScore: calculateScore(app, effectiveWeights)
}))
.sort((a, b) => b.weightedScore - a.weightedScore);
  }, [searchTerm, effectiveWeights]);
  }, [apps, searchTerm, effectiveWeights]);

const updateCustomWeight = (criterion, value) => {
    setCustomWeights(prev => ({
      ...prev,
      [criterion]: parseFloat(value)
    }));
    setSelectedPersona(null); // Clear persona when customizing
    setCustomWeights(prev => ({ ...prev, [criterion]: parseFloat(value) }));
    setSelectedPersona(null);
};

const ScoreBar = ({ score, label }) => (
<div className="flex items-center justify-between text-sm">
<span className="text-gray-600">{label}:</span>
<div className="flex items-center gap-2">
<div className="w-24 h-2 bg-gray-200 rounded-full">
          <div 
          <div
className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
style={{ width: `${score * 100}%` }}
/>
@@ -306,203 +119,7 @@ const AppFinder = () => {
<p className="text-gray-600">Discover the perfect AI tools based on your needs and preferences</p>
</div>
</div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Apps</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, company..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Persona Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Choose a Persona</label>
                <div className="space-y-2">
                  {mockPersonas.map(persona => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        setSelectedPersona(persona);
                        setCustomWeights({});
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedPersona?.id === persona.id
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium text-sm">{persona.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{persona.persona}</p>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedPersona(null);
                      setShowFilters(!showFilters);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      !selectedPersona && Object.keys(customWeights).length > 0
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span className="font-medium text-sm">Custom Criteria</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Set your own priorities</p>
                  </button>
                </div>
              </div>

              {/* Custom Filters */}
              {showFilters && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Customize Criteria Importance</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {Object.keys(mockApps[0].scores).map(criterion => (
                      <div key={criterion}>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          {criterion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={customWeights[criterion] || 0.5}
                          onChange={(e) => updateCustomWeight(criterion, e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Persona Info */}
              {selectedPersona && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">{selectedPersona.name}</h3>
                  <p className="text-sm text-blue-700">{selectedPersona.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommended Apps ({filteredAndSortedApps.length})
                </h2>
                {selectedPersona && (
                  <div className="text-sm text-gray-600">
                    Optimized for: <span className="font-medium text-blue-600">{selectedPersona.name}</span>
                  </div>
                )}
              </div>

              {/* App Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedApps.map((app, index) => (
                  <div key={app.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                          {index < 3 && (
                            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full">
                              Top Match
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{app.company}</p>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                          {app.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {(app.weightedScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4">{app.shortDescription}</p>

                    {/* Key Scores */}
                    <div className="space-y-2 mb-4">
                      {Object.entries(effectiveWeights)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 4)
                        .map(([criterion, weight]) => (
                          <ScoreBar
                            key={criterion}
                            score={app.scores[criterion]}
                            label={criterion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <a
                        href={app.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredAndSortedApps.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No apps found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or criteria weights.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* rest of component layout unchanged, but replace mockApps with apps and mockPersonas with personas */}
</div>
);
};
