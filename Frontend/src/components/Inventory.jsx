import React, { useState } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Plus, Edit2, Trash2, Search, Filter, Calendar, BarChart3 } from 'lucide-react';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'analytics'

  // Sample inventory data with usage statistics
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Rabipur Vaccine',
      category: 'Vaccine',
      quantity: 25,
      minStock: 20,
      expiryDate: '2026-03-01',
      usageCount: 145,
      usageFrequency: 'high',
      lastUsed: '2025-10-20',
      price: 350
    },
    {
      id: 2,
      name: 'Amoxicillin 500mg',
      category: 'Medicine',
      quantity: 40,
      minStock: 30,
      expiryDate: '2025-06-10',
      usageCount: 128,
      usageFrequency: 'high',
      lastUsed: '2025-10-22',
      price: 45
    },
    {
      id: 3,
      name: 'Parvo Vaccine',
      category: 'Vaccine',
      quantity: 35,
      minStock: 25,
      expiryDate: '2026-01-15',
      usageCount: 112,
      usageFrequency: 'high',
      lastUsed: '2025-10-21',
      price: 280
    },
    {
      id: 4,
      name: 'Ivermectin',
      category: 'Medicine',
      quantity: 18,
      minStock: 20,
      expiryDate: '2025-12-20',
      usageCount: 89,
      usageFrequency: 'medium',
      lastUsed: '2025-10-19',
      price: 65
    },
    {
      id: 5,
      name: 'Metronidazole',
      category: 'Medicine',
      quantity: 55,
      minStock: 25,
      expiryDate: '2026-04-18',
      usageCount: 76,
      usageFrequency: 'medium',
      lastUsed: '2025-10-18',
      price: 38
    },
    {
      id: 6,
      name: 'Distemper Vaccine',
      category: 'Vaccine',
      quantity: 12,
      minStock: 15,
      expiryDate: '2025-11-30',
      usageCount: 68,
      usageFrequency: 'medium',
      lastUsed: '2025-10-15',
      price: 320
    },
    {
      id: 7,
      name: 'Dexamethasone',
      category: 'Medicine',
      quantity: 8,
      minStock: 15,
      expiryDate: '2025-09-25',
      usageCount: 34,
      usageFrequency: 'low',
      lastUsed: '2025-10-10',
      price: 72
    },
    {
      id: 8,
      name: 'Vitamin B Complex',
      category: 'Supplement',
      quantity: 45,
      minStock: 20,
      expiryDate: '2026-08-12',
      usageCount: 28,
      usageFrequency: 'low',
      lastUsed: '2025-10-08',
      price: 25
    },
    {
      id: 9,
      name: 'Calcium Supplement',
      category: 'Supplement',
      quantity: 60,
      minStock: 30,
      expiryDate: '2026-07-05',
      usageCount: 15,
      usageFrequency: 'low',
      lastUsed: '2025-10-05',
      price: 30
    },
    {
      id: 10,
      name: 'Surgical Gloves (Box)',
      category: 'Equipment',
      quantity: 22,
      minStock: 10,
      expiryDate: '2027-12-31',
      usageCount: 95,
      usageFrequency: 'high',
      lastUsed: '2025-10-23',
      price: 120
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Medicine',
    quantity: '',
    minStock: '',
    expiryDate: '',
    price: ''
  });

  // Calculate statistics
  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock).length;
  const highUsageItems = inventory.filter(item => item.usageFrequency === 'high');
  const mediumUsageItems = inventory.filter(item => item.usageFrequency === 'medium');
  const lowUsageItems = inventory.filter(item => item.usageFrequency === 'low');

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.expiryDate) {
      const item = {
        id: inventory.length + 1,
        ...newItem,
        quantity: parseInt(newItem.quantity),
        minStock: parseInt(newItem.minStock) || 10,
        price: parseFloat(newItem.price) || 0,
        usageCount: 0,
        usageFrequency: 'low',
        lastUsed: new Date().toISOString().split('T')[0]
      };
      setInventory([...inventory, item]);
      setNewItem({
        name: '',
        category: 'Medicine',
        quantity: '',
        minStock: '',
        expiryDate: '',
        price: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const getStockStatus = (item) => {
    if (item.quantity === 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-100' };
    if (item.quantity <= item.minStock) return { label: 'Low Stock', color: 'text-orange-600 bg-orange-100' };
    return { label: 'In Stock', color: 'text-green-600 bg-green-100' };
  };

  const getUsageColor = (frequency) => {
    if (frequency === 'high') return 'bg-red-500';
    if (frequency === 'medium') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🐾 HapiVet Inventory</h1>
              <p className="text-gray-600">Manage veterinary supplies and track usage</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package className="inline mr-2" size={18} />
              Inventory Table
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'analytics' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="inline mr-2" size={18} />
              Usage Analytics
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Items</p>
                <p className="text-3xl font-bold text-gray-800">{totalItems}</p>
              </div>
              <Package className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Value</p>
                <p className="text-3xl font-bold text-gray-800">₹{totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Low Stock Alerts</p>
                <p className="text-3xl font-bold text-gray-800">{lowStockItems}</p>
              </div>
              <AlertTriangle className="text-orange-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">High Usage Items</p>
                <p className="text-3xl font-bold text-gray-800">{highUsageItems.length}</p>
              </div>
              <TrendingUp className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="Medicine">Medicine</option>
                <option value="Vaccine">Vaccine</option>
                <option value="Supplement">Supplement</option>
                <option value="Equipment">Equipment</option>
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Minimum Stock Level"
                value={newItem.minStock}
                onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price per Unit (₹)"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddItem}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {viewMode === 'analytics' && (
          <div className="space-y-6">
            {/* High Usage Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-red-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">High Usage Medicines ({highUsageItems.length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highUsageItems.map(item => (
                  <div key={item.id} className="border-2 border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">HIGH</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Usage Count:</span>
                      <span className="font-bold text-red-600">{item.usageCount} times</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">In Stock:</span>
                      <span className="font-bold">{item.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-semibold">{item.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Usage Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Medium Usage Medicines ({mediumUsageItems.length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediumUsageItems.map(item => (
                  <div key={item.id} className="border-2 border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full font-semibold">MEDIUM</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Usage Count:</span>
                      <span className="font-bold text-yellow-600">{item.usageCount} times</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">In Stock:</span>
                      <span className="font-bold">{item.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-semibold">{item.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Usage Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Low Usage Medicines ({lowUsageItems.length})</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowUsageItems.map(item => (
                  <div key={item.id} className="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">LOW</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Usage Count:</span>
                      <span className="font-bold text-blue-600">{item.usageCount} times</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">In Stock:</span>
                      <span className="font-bold">{item.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-semibold">{item.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Vaccine">Vaccine</option>
                  <option value="Supplement">Supplement</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Item Name</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Usage</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Expiry Date</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item, index) => {
                    const status = getStockStatus(item);
                    return (
                      <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}>
                        <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
                        <td className="px-4 py-3 text-gray-600">{item.category}</td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-gray-800">{item.quantity}</span>
                          <span className="text-xs text-gray-500 ml-1">(min: {item.minStock})</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getUsageColor(item.usageFrequency)}`}></div>
                            <span className="text-sm font-semibold">{item.usageCount}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{item.expiryDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}