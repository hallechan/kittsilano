import React, { useState } from "react";
import { Pet } from "../types";

interface PetCardProps {
  pet: Pet;
  onSelect: (pet: Pet) => void;
  isSelected?: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onSelect, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatsFromId = (id: string) => {
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return {
      affection: 8 + (Math.abs(hash) % 3),
      energy: 7 + (Math.abs(hash * 2) % 4),
      playfulness: 7 + (Math.abs(hash * 3) % 4),
      independence: 6 + (Math.abs(hash * 4) % 5)
    };
  };

  const stats = getStatsFromId(pet.id);

  return (
    <div
      className={`character-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(pet)}
    >
              <div className="character-portrait">
        <div className="portrait-frame">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="character-image"
          />
          {!pet.available && (
            <div className="adopted-overlay">
              <span className="adopted-text">ADOPTED</span>
            </div>
          )}
        </div>
        

      </div>

              <div className="character-info">
        <div className="character-header">
          <h3 className="character-name">{pet.name}</h3>
          <div className="character-level">
            <span className="level-badge">Lv.{pet.age}</span>
          </div>
        </div>
        
        <div className="character-class">
          <span className="class-badge">{pet.breed}</span>
        </div>

        <div className="character-stats">
          <div className="stat-bar">
            <span className="stat-label">
              <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Affection
            </span>
            <div className="stat-progress">
              <div 
                className="stat-fill" 
                style={{ width: `${stats.affection * 10}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.affection}/10</span>
          </div>
          
          <div className="stat-bar">
            <span className="stat-label">
              <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
              </svg>
              Energy
            </span>
            <div className="stat-progress">
              <div 
                className="stat-fill" 
                style={{ width: `${stats.energy * 10}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.energy}/10</span>
          </div>
          
          <div className="stat-bar">
            <span className="stat-label">
              <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Playfulness
            </span>
            <div className="stat-progress">
              <div 
                className="stat-fill" 
                style={{ width: `${stats.playfulness * 10}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.playfulness}/10</span>
          </div>
          
          <div className="stat-bar">
            <span className="stat-label">
              <svg className="me-1" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Independence
            </span>
            <div className="stat-progress">
              <div 
                className="stat-fill" 
                style={{ width: `${stats.independence * 10}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.independence}/10</span>
          </div>
        </div>

        <div className="character-description">
          <p>{pet.description}</p>
        </div>

        <div className="character-action">
          <button 
            className={`select-button ${isSelected ? 'selected' : ''}`}
            disabled={!pet.available}
          >
            {isSelected ? 'VIEWING' : pet.available ? 'VIEW CHARACTER' : 'UNAVAILABLE'}
          </button>
        </div>
      </div>


    </div>
  );
};

