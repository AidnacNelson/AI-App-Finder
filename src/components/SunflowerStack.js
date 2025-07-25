import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Shield, DollarSign, Zap, Users, Star, ChevronDown, ChevronUp, Grid, List, BookOpen, Briefcase, AlertCircle, Loader } from 'lucide-react';

const SunflowerStack = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [aiTools, setAiTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [airtableConfig, setAirtableConfig] = useState({
    apiKey: '',
    baseId: '',
    tableName: 'Apps - Sheet1'
  });

  const personas = [
    { id: 'all', name: 'All Tools', icon: Grid, color: 'bg-gray-100 text-gray-700' },
    { id: 'parent', name: 'The Parent', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { id: 'entrepreneur', name: 'The Soulful Entrepreneur', icon: Briefcase, color: 'bg-purple-100 text-purple-700' },
    { id: 'technologist', name: 'The Ethical Technologist', icon: Shield, color: 'bg-green-100 text-green-700' },
    { id: 'hacker', name: 'The Systems Hacker', icon: Zap, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'wellness', name: 'The Wellness Professional', icon: Heart, color: 'bg-blue-100 text-blue-700' },
    { id: 'artist', name: 'The Creative Artist', icon: Star, color: 'bg-purple-100 text-purple-700' },
    { id: 'student', name: 'The Student', icon: BookOpen, color: 'bg-green-100 text-green-700' }
  ];

  // Sample data (fallback when not connected to Airtable)
  const sampleTools = [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'ChatGPT is an AI chatbot that interacts in natural language and generates human-like responses',
      category: 'Artificial Intelligence',
      website: 'https://chatgpt.com/',
      pricing: 'Free tier available',
      scores: {
        easeOfUse: 4,
        affordability: 4,
        privacy: 3,
        ethics: 4,
        integration: 3,
        performance: 4
      },
      tags: ['Free Tier', 'Proprietary', 'Mobile'],
      featured: true
    },
    {
      id: 2,
      name: 'Claude',
      description: 'Claude is an advanced AI chatbot offering natural conversations, complex task assistance, and analysis with a focus on ethics and reliability',
      category: 'Artificial Intelligence',
      website: 'https://claude.ai/',
      pricing: 'Free tier available',
      scores: {
        easeOfUse: 4,
        affordability: 4,
        privacy: 3,
        ethics: 4,
        integration: 3,
        performance: 4
      },
      tags: ['Free Tier', 'Proprietary', 'Mobile'],
      featured: true
    },
    {
      id: 3,
      name: 'Synthesia',
      description: 'AI platform to turn text into professional, branded videos with avatars—no filming or editing required.',
      category: 'Video Creation',
      website: 'https://www.synthesia.io/',
      pricing: 'Free tier available',
      scores: {
        easeOfUse: 4,
        affordability: 3,
        privacy: 4,
        ethics: 4,
        integration: 3,
        performance: 4
      },
      tags: ['Free Tier', 'Proprietary'],
      featured: false
    }
  ];

  const fetchFromAirtable = async () => {
    if (!airtableConfig.apiKey || !airtableConfig.baseId) {
      setError('Please provide both API Key and Base ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.airtable.com/v0/${airtableConfig.baseId}/${encodeURIComponent(airtableConfig.tableName)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${airtableConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform Airtable records to match our component structure
      const transformedTools = data.records.map(record => ({
        id: record.id,
        name: record.fields['App Name'] || 'Unnamed Tool',
        description: record.fields.Description || record.fields['Short Description'] || 'No description available',
        category: record.fields['Primary Category'] || 'Uncategorized',
        website: record.fields['Website URL'] || '#',
        pricing: record.fields['Free Tier Available'] ? 'Free tier available' : 'Paid only',
        scores: {
          easeOfUse: Math.round((record.fields['Ease of Use'] || 0.5) * 5),
          affordability: Math.round((record.fields.Affordability || 0.5) * 5),
          privacy: Math.round((record.fields['Privacy Security'] || 0.5) * 5),
          ethics: Math.round((record.fields['Ethical Practices'] || 0.5) * 5),
          integration: Math.round((record.fields['Integration Capabilities'] || 0.5) * 5),
          performance: Math.round((record.fields['Performance Reliability'] || 0.5) * 5)
        },
        tags: [
          record.fields['Free Tier Available'] ? 'Free Tier' : 'Paid',
          record.fields['Open Source'] ? 'Open Source' : 'Proprietary',
          record.fields['GDPR Compliant'] ? 'GDPR' : null,
          record.fields['Mobile Optimization'] ? 'Mobile' : null
        ].filter(Boolean),
        featured: (record.fields['Innovation Factor'] || 0) > 0.8
      }));

      setAiTools(transformedTools);
    } catch (err) {
      setError(`Failed to load from Airtable: ${err.message}`);
      setAiTools(sampleTools); // Fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load sample data by default
    setAiTools(sampleTools);
  }, []);

  const getOverallScore = (scores) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length * 20) / 10;
  };

  const ScoreBar = ({ score, label, color = 'bg-yellow-400' }) => (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{score}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(score / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Filter tools based on search and persona
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For now, show all tools regardless of persona (you can enhance this based on your persona scoring logic)
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sunflower Stack</h1>
                <p className="text-sm text-gray-600">Ethical AI Tools Database</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Browse Tools</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Personas</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find AI Tools That Match Your Values
          </h2>
          <p className="text-xl text-yellow-100 mb-8">
            Discover ethical, affordable, and effective AI solutions for mission-driven organizations
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for AI tools by name, category, or use case..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg focus:ring-4 focus:ring-yellow-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Tools by Persona
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {personas.map((persona) => {
              const Icon = persona.icon;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedPersona === persona.id
                      ? persona.color + ' shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{persona.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Connect to Airtable</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center text-gray-600"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
                
              <div className={`space-y-4 mb-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input
                    type="password"
                    value={airtableConfig.apiKey}
                    onChange={(e) => setAirtableConfig({...airtableConfig, apiKey: e.target.value})}
                    placeholder="pat..."
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base ID</label>
                  <input
                    type="text"
                    value={airtableConfig.baseId}
                    onChange={(e) => setAirtableConfig({...airtableConfig, baseId: e.target.value})}
                    placeholder="app..."
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Table Name</label>
                  <input
                    type="text"
                    value={airtableConfig.tableName}
                    onChange={(e) => setAirtableConfig({...airtableConfig, tableName: e.target.value})}
                    placeholder="Apps - Sheet1"
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <button
                  onClick={fetchFromAirtable}
                  disabled={loading}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load from Airtable'
                  )}
                </button>
                {error && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Filter by Values</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">Ease of Use</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">Affordability</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Privacy & Security</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Ethical Practices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredTools.length} AI Tools Found
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredTools.map((tool) => {
                const overallScore = getOverallScore(tool.scores);
                return (
                  <div key={tool.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
                    {tool.featured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium px-4 py-2">
                        ⭐ Featured Tool
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h4>
                          <p className="text-gray-600 mb-3">{tool.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{tool.category}</span>
                            <span className="font-medium text-green-600">{tool.pricing}</span>
                            {tool.website && tool.website !== '#' && (
                              <a 
                                href={tool.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Visit Site
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-yellow-600">{overallScore}</div>
                          <div className="text-sm text-gray-500">Overall Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <ScoreBar score={tool.scores.easeOfUse} label="Ease of Use" color="bg-green-400" />
                        <ScoreBar score={tool.scores.affordability} label="Affordability" color="bg-green-400" />
                        <ScoreBar score={tool.scores.privacy} label="Privacy" color="bg-blue-400" />
                        <ScoreBar score={tool.scores.ethics} label="Ethics" color="bg-purple-400" />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag) => (
                          <span key={tag} className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => tool.website && tool.website !== '#' && window.open(tool.website, '_blank')}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                      >
                        {tool.website && tool.website !== '#' ? 'Visit Website' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-3xl">🌻</span>
            <h3 className="text-2xl font-bold">Sunflower Stack</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Helping mission-driven organizations find ethical AI tools that align with their values.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-yellow-400">About</a>
            <a href="#" className="hover:text-yellow-400">Submit a Tool</a>
            <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SunflowerStack;
