import React, { useState, useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Pet } from "./types";
import { useAppointments } from "./hooks/useAppointments";
import { PetCard } from "./components/PetCard";
import { AppointmentForm } from "./components/AppointmentForm";
import { AppointmentList } from "./components/AppointmentList";
import { ContactPage } from "./components/ContactPage";

function App() {
  const { appointments, pets, addAppointment, updateAppointment, deleteAppointment, updatePetAvailability } = useAppointments();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"pets" | "appointments" | "contact">("pets");
  const [hoveredPet, setHoveredPet] = useState<Pet | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }, []);

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
  };

  const handleAdoptClick = () => {
    setShowForm(true);
  };

  const handlePetHover = (pet: Pet | null) => {
    setHoveredPet(pet);
  };

  const handleAppointmentSubmit = (appointmentData: any) => {
    addAppointment(appointmentData);
    setShowForm(false);
    setSelectedPet(null);
  };

  const handleAppointmentStatusUpdate = (id: string, status: any) => {
    updateAppointment(id, { status });
  };

  const handleAppointmentDelete = (id: string) => {
    deleteAppointment(id);
  };

  const availablePets = pets.filter(pet => pet.available);

  return (
    <div className="container-fluid">
      <header className="bg-body-tertiary border-bottom">
        <div className="container">
          <div className="row align-items-center py-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div>
                  <img 
                    src="/kittsilano.png" 
                    alt="Kittsilano" 
                    className="logo-image"
                    style={{ height: '60px', objectFit: 'contain' }}
                  />
                  <p className="text-muted mb-0 mt-1">VOKRA - Kitsilano</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <div className="text-muted">
                  <span className="fw-bold">{appointments.length}</span> appointments
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <ul className="nav nav-tabs" style={{ borderBottomColor: 'var(--accent-color)' }}>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("pets")}
              className={`nav-link ${activeTab === "pets" ? "active" : ""}`}
              style={{
                color: activeTab === "pets" ? 'var(--accent-color)' : 'inherit',
                borderColor: activeTab === "pets" ? 'var(--accent-color)' : 'transparent'
              }}
            >
              Featured Felines
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`nav-link ${activeTab === "appointments" ? "active" : ""}`}
              style={{
                color: activeTab === "appointments" ? 'var(--accent-color)' : 'inherit',
                borderColor: activeTab === "appointments" ? 'var(--accent-color)' : 'transparent'
              }}
            >
              Appointments
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab("contact")}
              className={`nav-link ${activeTab === "contact" ? "active" : ""}`}
              style={{
                color: activeTab === "contact" ? 'var(--accent-color)' : 'inherit',
                borderColor: activeTab === "contact" ? 'var(--accent-color)' : 'transparent'
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>

      <main className="container py-5">
        {activeTab === "pets" ? (
          <div>
            <div className="mb-4 text-center">
              <img 
                src="/choose ur catracter.png" 
                alt="Choose Your Catracter" 
                className="game-title-image mb-3"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            
            {selectedPet && (
              <div className="spotlight-screen mb-5">
                <div className="spotlight-container">
                  <div className="spotlight-character">
                    <div className="spotlight-portrait">
                      <img
                        src={selectedPet.imageUrl}
                        alt={selectedPet.name}
                        className="spotlight-image"
                      />
                      <div className="spotlight-glow"></div>
                    </div>
                    <div className="spotlight-info">
                      <h2 className="spotlight-name">{selectedPet.name}</h2>
                      <div className="spotlight-details">
                        <span className="spotlight-breed">{selectedPet.breed}</span>
                        <span className="spotlight-age">Age: {selectedPet.age}</span>
                      </div>
                      <p className="spotlight-description">{selectedPet.description}</p>
                      <div className="spotlight-actions">
                        <button 
                          className="btn btn-primary spotlight-btn"
                          onClick={handleAdoptClick}
                        >
                          <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Adopt This Cat
                        </button>
                        <button 
                          className="btn btn-outline-secondary spotlight-btn"
                          onClick={() => setSelectedPet(null)}
                        >
                          <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                          Clear Selection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {availablePets.length === 0 ? (
              <div className="text-center py-5">
                <svg className="mx-auto text-muted mb-3" style={{width: '48px', height: '48px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="mt-2 h5">No pets available</h3>
                <p className="text-muted">All our pets have found their forever homes!</p>
              </div>
            ) : (
              <div className="character-selection-grid">
                {availablePets.map((pet) => (
                  <div key={pet.id} className="character-slot">
                    <PetCard
                      pet={pet}
                      onSelect={handlePetSelect}
                      isSelected={selectedPet?.id === pet.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === "appointments" ? (
          <div>
            <div className="mb-4">
              <h2 className="h3 mb-2 text-bold text-center">APPOINTMENTS</h2>
            </div>
            
            <AppointmentList
              appointments={appointments}
              onUpdateStatus={handleAppointmentStatusUpdate}
              onDelete={handleAppointmentDelete}
            />
          </div>
        ) : (
          <ContactPage />
        )}
      </main>

      {showForm && (
        <AppointmentForm
          selectedPet={selectedPet}
          onSubmit={handleAppointmentSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;

