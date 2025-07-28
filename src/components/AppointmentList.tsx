import React, { useState } from "react";
import { Appointment } from "../types";
import { format } from "date-fns";

interface AppointmentListProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: Appointment["status"]) => void;
  onDelete: (id: string) => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onUpdateStatus,
  onDelete,
}) => {
  const [expandedAppointments, setExpandedAppointments] = useState<Set<string>>(new Set());

  const toggleExpanded = (appointmentId: string) => {
    const newExpanded = new Set(expandedAppointments);
    if (newExpanded.has(appointmentId)) {
      newExpanded.delete(appointmentId);
    } else {
      newExpanded.add(appointmentId);
    }
    setExpandedAppointments(newExpanded);
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return "#BC4141";
      case "completed":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      case "no-show":
        return "#ffc107";
      default:
        return "#BC4141";
    }
  };

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "scheduled":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case "completed":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        );
      case "cancelled":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        );
      case "no-show":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  const formatDateTime = (date: string, time: string) => {
    try {
      const dateTime = new Date(`${date}T${time}`);
      return format(dateTime, "MMM dd, yyyy at h:mm a");
    } catch {
      return `${date} at ${time}`;
    }
  };

  const renderFormSection = (title: string, data: Record<string, any>) => {
    return (
      <div className="form-section">
        <h5 className="section-title">{title}</h5>
        <div className="section-content">
          {Object.entries(data).map(([key, value]) => {
            if (!value || value === "") return null;
            
            const label = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/([A-Z])/g, ' $1')
              .trim();
            
            return (
              <div key={key} className="form-field">
                <span className="field-label">{label}:</span>
                <span className="field-value">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDetailedForm = (appointment: Appointment) => {
    if (!appointment.formData) {
      return (
        <div className="form-details">
          <div className="no-form-data">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            <span>No detailed form data available</span>
          </div>
        </div>
      );
    }

    const { formData } = appointment;

    return (
      <div className="form-details">
        {renderFormSection("Basic Information", {
          fullName: formData.fullName,
          address: formData.address,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
        })}
        
        {renderFormSection("Housing", {
          homeOwnership: formData.homeOwnership,
          leaseAllowsPets: formData.leaseAllowsPets,
        })}
        
        {renderFormSection("Household", {
          householdMembers: formData.householdMembers,
          allergies: formData.allergies,
        })}
        
        {renderFormSection("Current Pets", {
          hasPets: formData.hasPets,
          currentPets: formData.currentPets,
          petsSpayedNeutered: formData.petsSpayedNeutered,
        })}
        
        {renderFormSection("Experience", {
          hadCatsBefore: formData.hadCatsBefore,
          previousCats: formData.previousCats,
        })}
        
        {renderFormSection("Adoption Details", {
          adoptionReason: formData.adoptionReason,
          specificCat: formData.specificCat,
          primaryCaretaker: formData.primaryCaretaker,
        })}
        
        {renderFormSection("Care Plans", {
          indoorOutdoor: formData.indoorOutdoor,
          hoursAlone: formData.hoursAlone,
          whenAway: formData.whenAway,
        })}
        
        {renderFormSection("Commitment", {
          longTermCommitment: formData.longTermCommitment,
          veterinaryCare: formData.veterinaryCare,
          vetReference: formData.vetReference,
        })}
      </div>
    );
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2 className="appointments-title">
          <svg className="me-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
          Appointment Management
        </h2>
        <div className="appointments-stats">
          <div className="stat-item">
            <span className="stat-number">{appointments.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{appointments.filter(a => a.status === 'scheduled').length}</span>
            <span className="stat-label">Scheduled</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{appointments.filter(a => a.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3 className="empty-title">No Appointments Scheduled</h3>
          <p className="empty-description">All clear! No pending appointments at the moment.</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div className="appointment-info">
                  <h4 className="customer-name">{appointment.customerName}</h4>
                  <div className="pet-info">
                    <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Meeting {appointment.petName}
                  </div>
                </div>
                <div className="status-badge" style={{ backgroundColor: getStatusColor(appointment.status) }}>
                  {getStatusIcon(appointment.status)}
                  <span className="status-text">{appointment.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="appointment-details">
                <div className="detail-item">
                  <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  {formatDateTime(appointment.date, appointment.time)}
                </div>
                <div className="detail-item">
                  <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  {appointment.customerEmail}
                </div>
                <div className="detail-item">
                  <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  {appointment.customerPhone}
                </div>
              </div>

              {appointment.notes && (
                <div className="appointment-notes">
                  <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  "{appointment.notes}"
                </div>
              )}

              <div className="appointment-actions">
                <button
                  onClick={() => toggleExpanded(appointment.id)}
                  className="expand-btn"
                  title={expandedAppointments.has(appointment.id) ? "Hide Details" : "Show Details"}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ 
                      transform: expandedAppointments.has(appointment.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                  {expandedAppointments.has(appointment.id) ? "Hide Details" : "View Application"}
                </button>
                
                <select
                  value={appointment.status}
                  onChange={(e) => onUpdateStatus(appointment.id, e.target.value as Appointment["status"])}
                  className="status-select"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </select>
                <button
                  onClick={() => onDelete(appointment.id)}
                  className="delete-btn"
                  title="Delete Appointment"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>

              {expandedAppointments.has(appointment.id) && (
                <div className="expanded-details">
                  {renderDetailedForm(appointment)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

