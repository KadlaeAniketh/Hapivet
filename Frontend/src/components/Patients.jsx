import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Calendar, FileText, Activity, Phone, Mail, MapPin, Dog, Cat, Bird, X, User } from 'lucide-react';

export default function HapiVetPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Sample patients data
  const [patients, setPatients] = useState([
    {
      id: 1,
      petName: 'Max',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      ownerName: 'Rajesh Kumar',
      ownerPhone: '+91 98765 43210',
      ownerEmail: 'rajesh.k@email.com',
      ownerAddress: 'MG Road, Kollam, Kerala',
      registrationDate: '2023-05-15',
      lastVisit: '2025-10-15',
      nextAppointment: '2025-11-05',
      weight: '28 kg',
      microchipId: 'MC123456789',
      status: 'Active',
      medicalHistory: [
        { date: '2025-10-15', diagnosis: 'Annual Checkup', treatment: 'Vaccination - Rabies', doctor: 'Dr. Sarah' },
        { date: '2025-08-20', diagnosis: 'Skin Allergy', treatment: 'Prescribed antihistamines', doctor: 'Dr. Michael' },
        { date: '2025-06-10', diagnosis: 'Dental Cleaning', treatment: 'Teeth cleaning and polish', doctor: 'Dr. Sarah' }
      ],
      vaccinations: [
        { vaccine: 'Rabies', date: '2025-10-15', nextDue: '2026-10-15' },
        { vaccine: 'Parvo', date: '2025-05-15', nextDue: '2026-05-15' },
        { vaccine: 'Distemper', date: '2025-05-15', nextDue: '2026-05-15' }
      ],
      prescriptions: [
        { medicine: 'Amoxicillin', dosage: '500mg twice daily', duration: '7 days', date: '2025-08-20' }
      ]
    },
    {
      id: 2,
      petName: 'Bella',
      species: 'Cat',
      breed: 'Persian',
      age: 2,
      gender: 'Female',
      ownerName: 'Priya Menon',
      ownerPhone: '+91 98765 43211',
      ownerEmail: 'priya.m@email.com',
      ownerAddress: 'Asramam, Kollam, Kerala',
      registrationDate: '2024-02-20',
      lastVisit: '2025-10-10',
      nextAppointment: '2025-10-30',
      weight: '4 kg',
      microchipId: 'MC987654321',
      status: 'Active',
      medicalHistory: [
        { date: '2025-10-10', diagnosis: 'Hairball Issues', treatment: 'Hairball remedy prescribed', doctor: 'Dr. Emily' },
        { date: '2025-07-15', diagnosis: 'Vaccination', treatment: 'Annual vaccines', doctor: 'Dr. Sarah' }
      ],
      vaccinations: [
        { vaccine: 'Rabies', date: '2025-07-15', nextDue: '2026-07-15' },
        { vaccine: 'FVRCP', date: '2025-07-15', nextDue: '2026-07-15' }
      ],
      prescriptions: [
        { medicine: 'Hairball Remedy', dosage: 'Once daily', duration: 'Ongoing', date: '2025-10-10' }
      ]
    },
    {
      id: 3,
      petName: 'Charlie',
      species: 'Dog',
      breed: 'Labrador',
      age: 5,
      gender: 'Male',
      ownerName: 'Anil Nair',
      ownerPhone: '+91 98765 43212',
      ownerEmail: 'anil.n@email.com',
      ownerAddress: 'Chinnakada, Kollam, Kerala',
      registrationDate: '2022-11-10',
      lastVisit: '2025-09-25',
      nextAppointment: null,
      weight: '32 kg',
      microchipId: 'MC456789123',
      status: 'Active',
      medicalHistory: [
        { date: '2025-09-25', diagnosis: 'Hip Dysplasia Checkup', treatment: 'Pain management prescribed', doctor: 'Dr. Michael' },
        { date: '2025-06-05', diagnosis: 'Ear Infection', treatment: 'Antibiotic ear drops', doctor: 'Dr. Sarah' }
      ],
      vaccinations: [
        { vaccine: 'Rabies', date: '2025-05-10', nextDue: '2026-05-10' },
        { vaccine: 'Parvo', date: '2025-05-10', nextDue: '2026-05-10' }
      ],
      prescriptions: [
        { medicine: 'Joint Supplement', dosage: 'Once daily', duration: 'Ongoing', date: '2025-09-25' }
      ]
    },
    {
      id: 4,
      petName: 'Milo',
      species: 'Cat',
      breed: 'Siamese',
      age: 4,
      gender: 'Male',
      ownerName: 'Deepa Sharma',
      ownerPhone: '+91 98765 43213',
      ownerEmail: 'deepa.s@email.com',
      ownerAddress: 'Kilikollur, Kollam, Kerala',
      registrationDate: '2023-08-12',
      lastVisit: '2025-10-20',
      nextAppointment: '2025-11-20',
      weight: '5 kg',
      microchipId: 'MC789123456',
      status: 'Active',
      medicalHistory: [
        { date: '2025-10-20', diagnosis: 'Urinary Tract Issue', treatment: 'Special diet and medication', doctor: 'Dr. Emily' },
        { date: '2025-08-10', diagnosis: 'Dental Checkup', treatment: 'Teeth cleaning', doctor: 'Dr. Sarah' }
      ],
      vaccinations: [
        { vaccine: 'Rabies', date: '2025-08-12', nextDue: '2026-08-12' }
      ],
      prescriptions: [
        { medicine: 'Urinary Care Food', dosage: 'As directed', duration: 'Ongoing', date: '2025-10-20' }
      ]
    },
    {
      id: 5,
      petName: 'Tweety',
      species: 'Bird',
      breed: 'Parakeet',
      age: 1,
      gender: 'Unknown',
      ownerName: 'Suman Das',
      ownerPhone: '+91 98765 43214',
      ownerEmail: 'suman.d@email.com',
      ownerAddress: 'Kadappakada, Kollam, Kerala',
      registrationDate: '2024-12-01',
      lastVisit: '2025-10-05',
      nextAppointment: '2025-12-05',
      weight: '0.05 kg',
      microchipId: null,
      status: 'Active',
      medicalHistory: [
        { date: '2025-10-05', diagnosis: 'General Checkup', treatment: 'Beak trim and nail trim', doctor: 'Dr. Emily' }
      ],
      vaccinations: [],
      prescriptions: []
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    petName: '',
    species: 'Dog',
    breed: '',
    age: '',
    gender: 'Male',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    weight: '',
    microchipId: ''
  });

  // Statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'Active').length;
  const upcomingAppointments = patients.filter(p => p.nextAppointment).length;
  const dogCount = patients.filter(p => p.species === 'Dog').length;
  const catCount = patients.filter(p => p.species === 'Cat').length;

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === 'all' || patient.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  const handleAddPatient = () => {
    if (newPatient.petName && newPatient.ownerName && newPatient.ownerPhone) {
      const patient = {
        id: patients.length + 1,
        ...newPatient,
        age: parseInt(newPatient.age) || 0,
        registrationDate: new Date().toISOString().split('T')[0],
        lastVisit: new Date().toISOString().split('T')[0],
        nextAppointment: null,
        status: 'Active',
        medicalHistory: [],
        vaccinations: [],
        prescriptions: []
      };
      setPatients([...patients, patient]);
      setNewPatient({
        petName: '',
        species: 'Dog',
        breed: '',
        age: '',
        gender: 'Male',
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        ownerAddress: '',
        weight: '',
        microchipId: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetails(true);
  };

  const getSpeciesIcon = (species) => {
    switch(species) {
      case 'Dog': return <Dog className="text-brown-600" size={20} />;
      case 'Cat': return <Cat className="text-orange-600" size={20} />;
      case 'Bird': return <Bird className="text-blue-600" size={20} />;
      default: return <Activity className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">🐾 Patient Records</h1>
              <p className="text-gray-600">Manage and track all pet patients</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Register New Patient
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{totalPatients}</p>
              </div>
              <Activity className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Patients</p>
                <p className="text-3xl font-bold text-gray-800">{activePatients}</p>
              </div>
              <Activity className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{upcomingAppointments}</p>
              </div>
              <Calendar className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Dogs</p>
                <p className="text-3xl font-bold text-gray-800">{dogCount}</p>
              </div>
              <Dog className="text-amber-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Cats</p>
                <p className="text-3xl font-bold text-gray-800">{catCount}</p>
              </div>
              <Cat className="text-orange-500" size={40} />
            </div>
          </div>
        </div>

        {/* Add Patient Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register New Patient</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Pet Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Pet Name *"
                  value={newPatient.petName}
                  onChange={(e) => setNewPatient({...newPatient, petName: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <select
                  value={newPatient.species}
                  onChange={(e) => setNewPatient({...newPatient, species: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Breed"
                  value={newPatient.breed}
                  onChange={(e) => setNewPatient({...newPatient, breed: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Age (years)"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
                <input
                  type="text"
                  placeholder="Weight (e.g., 25 kg)"
                  value={newPatient.weight}
                  onChange={(e) => setNewPatient({...newPatient, weight: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Microchip ID (optional)"
                  value={newPatient.microchipId}
                  onChange={(e) => setNewPatient({...newPatient, microchipId: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none col-span-3"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Owner Name *"
                  value={newPatient.ownerName}
                  onChange={(e) => setNewPatient({...newPatient, ownerName: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={newPatient.ownerPhone}
                  onChange={(e) => setNewPatient({...newPatient, ownerPhone: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newPatient.ownerEmail}
                  onChange={(e) => setNewPatient({...newPatient, ownerEmail: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newPatient.ownerAddress}
                  onChange={(e) => setNewPatient({...newPatient, ownerAddress: e.target.value})}
                  className="p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddPatient}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Register Patient
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

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by pet name, owner, or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="all">All Species</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Bird">Birds</option>
              <option value="Rabbit">Rabbits</option>
              <option value="Other">Others</option>
            </select>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSpeciesIcon(patient.species)}
                    <h3 className="text-xl font-bold">{patient.petName}</h3>
                  </div>
                  <span className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm opacity-90">{patient.breed} • {patient.age} years • {patient.gender}</p>
              </div>

              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span className="font-semibold">{patient.ownerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{patient.ownerPhone}</span>
                  </div>
                  {patient.ownerEmail && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} className="text-gray-400" />
                      <span className="truncate">{patient.ownerEmail}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="truncate">{patient.ownerAddress}</span>
                  </div>
                </div>

                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Last Visit:</span>
                    <span className="font-semibold">{patient.lastVisit}</span>
                  </div>
                  {patient.nextAppointment && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next Appointment:</span>
                      <span className="font-semibold text-green-600">{patient.nextAppointment}</span>
                    </div>
                  )}
                  {!patient.nextAppointment && (
                    <div className="text-sm text-gray-500 italic">No upcoming appointment</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(patient)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Details Modal */}
        {showDetails && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedPatient.petName}'s Medical Record</h2>
                  <p className="opacity-90">{selectedPatient.breed} • {selectedPatient.age} years old</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Basic Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText size={20} />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Species</p>
                      <p className="font-semibold">{selectedPatient.species}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-semibold">{selectedPatient.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-semibold">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Microchip ID</p>
                      <p className="font-semibold">{selectedPatient.microchipId || 'Not registered'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Registration Date</p>
                      <p className="font-semibold">{selectedPatient.registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Visit</p>
                      <p className="font-semibold">{selectedPatient.lastVisit}</p>
                    </div>
                  </div>
                </div>

                {/* Medical History */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity size={20} />
                    Medical History
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.medicalHistory.map((record, index) => (
                      <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                        <div className="flex justify-between mb-2">
                          <p className="font-semibold text-gray-800">{record.diagnosis}</p>
                          <span className="text-sm text-gray-600">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{record.treatment}</p>
                        <p className="text-xs text-gray-500">Attended by: {record.doctor}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vaccinations */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Activity size={20} />
                    Vaccination Records
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vaccine</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Administered</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Next Due Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedPatient.vaccinations.map((vaccination, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{vaccination.vaccine}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{vaccination.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{vaccination.nextDue}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Up to date
                              </span>
                            </td>
                          </tr>
                        ))}
                        {selectedPatient.vaccinations.length === 0 && (
                          <tr>
                            <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">
                              No vaccination records available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Prescriptions */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText size={20} />
                    Current Prescriptions
                  </h3>
                  <div className="space-y-3">
                    {selectedPatient.prescriptions.map((prescription, index) => (
                      <div key={index} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                        <div className="flex justify-between mb-2">
                          <p className="font-semibold text-gray-800">{prescription.medicine}</p>
                          <span className="text-sm text-gray-600">{prescription.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">Dosage: {prescription.dosage}</p>
                        <p className="text-sm text-gray-700">Duration: {prescription.duration}</p>
                      </div>
                    ))}
                    {selectedPatient.prescriptions.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        No current prescriptions
                      </div>
                    )}
                  </div>
                </div>

                {/* Owner Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <User size={20} />
                    Owner Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Owner Name</p>
                        <p className="font-semibold">{selectedPatient.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold">{selectedPatient.ownerPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold">{selectedPatient.ownerEmail || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold">{selectedPatient.ownerAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}