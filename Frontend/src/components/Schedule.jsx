import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState('2025-10-24');
  const [selectedDoctor, setSelectedDoctor] = useState('dr-smith');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  // Sample doctors data
  const doctors = [
    { id: 'dr-smith', name: 'Dr. Sarah Smith', specialty: 'General Physician' },
    { id: 'dr-johnson', name: 'Dr. Michael Johnson', specialty: 'Cardiologist' },
    { id: 'dr-williams', name: 'Dr. Emily Williams', specialty: 'Dermatologist' },
  ];

  // Sample booked appointments
  const bookedAppointments = {
    '2025-10-24': {
      'dr-smith': ['09:00', '10:00', '14:00'],
      'dr-johnson': ['09:00', '11:00', '15:00'],
      'dr-williams': ['10:00', '13:00', '16:00'],
    },
    '2025-10-25': {
      'dr-smith': ['09:00', '13:00'],
      'dr-johnson': ['10:00', '14:00'],
      'dr-williams': ['11:00', '15:00'],
    },
  };

  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const isSlotBooked = (time) => {
    return bookedAppointments[selectedDate]?.[selectedDoctor]?.includes(time) || false;
  };

  const handleBookAppointment = () => {
    if (selectedTime && patientName && patientEmail && patientPhone) {
      setShowConfirmation(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedTime(null);
        setPatientName('');
        setPatientEmail('');
        setPatientPhone('');
      }, 3000);
    }
  };

  const selectedDoctorInfo = doctors.find(d => d.id === selectedDoctor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Vitanory Health</h1>
          <p className="text-gray-600">Book Your Appointment Online</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Selection */}
            <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
              <h2 className="text-2xl font-bold mb-6">Select Your Appointment</h2>

              {/* Doctor Selection */}
              <div className="mb-6">
                <label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                  <User size={18} />
                  Select Doctor
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    setSelectedTime(null);
                  }}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none"
                >
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="flex items-center gap-2 mb-3 text-sm font-semibold">
                  <Calendar size={18} />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2025-10-23"
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(null);
                  }}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Selected Doctor Info */}
              <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4 mt-6">
                <h3 className="font-semibold mb-2">Appointment With:</h3>
                <p className="text-lg">{selectedDoctorInfo.name}</p>
                <p className="text-sm text-indigo-200">{selectedDoctorInfo.specialty}</p>
                <p className="text-sm text-indigo-200 mt-2">
                  Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Right Side - Time Slots & Booking */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={24} />
                Available Time Slots
              </h2>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6 max-h-64 overflow-y-auto">
                {timeSlots.map(time => {
                  const booked = isSlotBooked(time);
                  const selected = selectedTime === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => !booked && setSelectedTime(time)}
                      disabled={booked}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        booked
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                          : selected
                          ? 'bg-indigo-600 text-white shadow-lg scale-105'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:scale-105'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle size={16} className="text-gray-400" />
                  <span>Booked</span>
                </div>
              </div>

              {/* Patient Details Form */}
              {selectedTime && (
                <div className="border-t pt-6">
                  <h3 className="font-bold text-lg mb-4">Patient Details</h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />
                    
                    <button
                      onClick={handleBookAppointment}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation Message */}
              {showConfirmation && (
                <div className="mt-6 bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                  <CheckCircle size={40} className="text-green-500 mx-auto mb-2" />
                  <h3 className="font-bold text-green-800 text-lg">Appointment Confirmed!</h3>
                  <p className="text-green-700 text-sm">
                    Your appointment has been booked for {selectedTime} on {selectedDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Bookings Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Schedule Summary</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {doctors.map(doctor => {
              const bookedCount = bookedAppointments[selectedDate]?.[doctor.id]?.length || 0;
              const availableCount = timeSlots.length - bookedCount;
              
              return (
                <div key={doctor.id} className="border-2 border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-semibold">Available: {availableCount}</span>
                    <span className="text-red-600 font-semibold">Booked: {bookedCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}