import React, { useState } from "react";
import { Pet, Appointment } from "../types";

interface AppointmentFormProps {
  selectedPet: Pet | null;
  onSubmit: (appointment: Omit<Appointment, "id">) => void;
  onCancel: () => void;
}

interface FormData {
  fullName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  
  homeOwnership: "own" | "rent" | "";
  leaseAllowsPets: "yes" | "no" | "na" | "";
  
  householdMembers: string;
  allergies: "yes" | "no" | "";
  
  hasPets: "yes" | "no" | "";
  currentPets: string;
  petsSpayedNeutered: "yes" | "no" | "na" | "";
  
  hadCatsBefore: "yes" | "no" | "";
  previousCats: string;
  
  adoptionReason: string;
  specificCat: string;
  primaryCaretaker: string;
  
  indoorOutdoor: "indoor" | "outdoor" | "both" | "";
  hoursAlone: string;
  whenAway: string;
  
  longTermCommitment: "yes" | "no" | "";
  veterinaryCare: "yes" | "no" | "";
  vetReference: "yes" | "no" | "";
  
  date: string;
  time: string;
}

interface FormErrors {
  [key: string]: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedPet,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    homeOwnership: "",
    leaseAllowsPets: "",
    householdMembers: "",
    allergies: "",
    hasPets: "",
    currentPets: "",
    petsSpayedNeutered: "",
    hadCatsBefore: "",
    previousCats: "",
    adoptionReason: "",
    specificCat: selectedPet?.name || "",
    primaryCaretaker: "",
    indoorOutdoor: "",
    hoursAlone: "",
    whenAway: "",
    longTermCommitment: "",
    veterinaryCare: "",
    vetReference: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
          newErrors.emailAddress = "Please enter a valid email address";
        }
        break;

      case 2:
        if (!formData.homeOwnership) newErrors.homeOwnership = "Please select home ownership status";
        if (formData.homeOwnership === "rent" && !formData.leaseAllowsPets) {
          newErrors.leaseAllowsPets = "Please specify if your lease allows pets";
        }
        if (!formData.householdMembers.trim()) newErrors.householdMembers = "Please describe household members";
        if (!formData.allergies) newErrors.allergies = "Please specify if anyone has allergies";
        break;

      case 3:
        if (!formData.hasPets) newErrors.hasPets = "Please specify if you have current pets";
        if (formData.hasPets === "yes" && !formData.currentPets.trim()) {
          newErrors.currentPets = "Please describe your current pets";
        }
        if (formData.hasPets === "yes" && !formData.petsSpayedNeutered) {
          newErrors.petsSpayedNeutered = "Please specify if pets are spayed/neutered";
        }
        if (!formData.hadCatsBefore) newErrors.hadCatsBefore = "Please specify if you've had cats before";
        if (formData.hadCatsBefore === "yes" && !formData.previousCats.trim()) {
          newErrors.previousCats = "Please describe what happened to previous cats";
        }
        break;

      case 4:
        if (!formData.adoptionReason.trim()) newErrors.adoptionReason = "Please explain why you want to adopt";
        if (!formData.primaryCaretaker.trim()) newErrors.primaryCaretaker = "Please specify the primary caretaker";
        if (!formData.indoorOutdoor) newErrors.indoorOutdoor = "Please specify indoor/outdoor preference";
        if (!formData.hoursAlone.trim()) newErrors.hoursAlone = "Please specify hours cat will be alone";
        if (!formData.whenAway.trim()) newErrors.whenAway = "Please specify where cat will stay when away";
        if (!formData.longTermCommitment) newErrors.longTermCommitment = "Please confirm long-term commitment";
        if (!formData.veterinaryCare) newErrors.veterinaryCare = "Please confirm veterinary care commitment";
        if (!formData.vetReference) newErrors.vetReference = "Please specify if we can contact your vet";
        if (!formData.date) newErrors.date = "Please select a date";
        if (!formData.time) newErrors.time = "Please select a time";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPet) return;

    if (validateStep(currentStep)) {
      onSubmit({
        petId: selectedPet.id,
        petName: selectedPet.name,
        customerName: formData.fullName,
        customerEmail: formData.emailAddress,
        customerPhone: formData.phoneNumber,
        date: formData.date,
        time: formData.time,
        status: "scheduled",
        notes: `Adoption Application Details:
Address: ${formData.address}
Home Ownership: ${formData.homeOwnership}${formData.leaseAllowsPets ? `, Lease allows pets: ${formData.leaseAllowsPets}` : ''}
Household: ${formData.householdMembers}
Allergies: ${formData.allergies}
Current Pets: ${formData.hasPets === 'yes' ? formData.currentPets : 'No'}
Pets Spayed/Neutered: ${formData.petsSpayedNeutered}
Previous Cats: ${formData.hadCatsBefore === 'yes' ? formData.previousCats : 'No'}
Adoption Reason: ${formData.adoptionReason}
Primary Caretaker: ${formData.primaryCaretaker}
Indoor/Outdoor: ${formData.indoorOutdoor}
Hours Alone: ${formData.hoursAlone}
When Away: ${formData.whenAway}
Long-term Commitment: ${formData.longTermCommitment}
Veterinary Care: ${formData.veterinaryCare}
Vet Reference: ${formData.vetReference}`,
        formData: formData,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  if (!selectedPet) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h4 className="step-title">Basic Information</h4>
            
            <div className="form-group">
              <label className="form-label">1. Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">2. Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                rows={3}
                placeholder="Enter your complete address"
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">3. Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">4. Email Address *</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className={`form-control ${errors.emailAddress ? 'is-invalid' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.emailAddress && <div className="invalid-feedback">{errors.emailAddress}</div>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h4 className="step-title">Housing & Household</h4>
            
            <div className="form-group">
              <label className="form-label">5. Do you own or rent your home? *</label>
              <select
                name="homeOwnership"
                value={formData.homeOwnership}
                onChange={handleChange}
                className={`form-control ${errors.homeOwnership ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="own">Own</option>
                <option value="rent">Rent</option>
              </select>
              {errors.homeOwnership && <div className="invalid-feedback">{errors.homeOwnership}</div>}
            </div>

            {formData.homeOwnership === "rent" && (
              <div className="form-group">
                <label className="form-label">6. If renting, does your lease allow pets? *</label>
                <select
                  name="leaseAllowsPets"
                  value={formData.leaseAllowsPets}
                  onChange={handleChange}
                  className={`form-control ${errors.leaseAllowsPets ? 'is-invalid' : ''}`}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.leaseAllowsPets && <div className="invalid-feedback">{errors.leaseAllowsPets}</div>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">7. How many adults and children live in your home? (Include children's ages) *</label>
              <textarea
                name="householdMembers"
                value={formData.householdMembers}
                onChange={handleChange}
                className={`form-control ${errors.householdMembers ? 'is-invalid' : ''}`}
                rows={3}
                placeholder="e.g., 2 adults, 1 child (age 8)"
              />
              {errors.householdMembers && <div className="invalid-feedback">{errors.householdMembers}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">8. Does anyone in your home have allergies to cats? *</label>
              <select
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className={`form-control ${errors.allergies ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.allergies && <div className="invalid-feedback">{errors.allergies}</div>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h4 className="step-title">Pets & Experience</h4>
            
            <div className="form-group">
              <label className="form-label">9. Do you currently have pets? (List species, age, temperament) *</label>
              <select
                name="hasPets"
                value={formData.hasPets}
                onChange={handleChange}
                className={`form-control ${errors.hasPets ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.hasPets && <div className="invalid-feedback">{errors.hasPets}</div>}
            </div>

            {formData.hasPets === "yes" && (
              <div className="form-group">
                <label className="form-label">Current Pets Details *</label>
                <textarea
                  name="currentPets"
                  value={formData.currentPets}
                  onChange={handleChange}
                  className={`form-control ${errors.currentPets ? 'is-invalid' : ''}`}
                  rows={3}
                  placeholder="e.g., 1 dog (Golden Retriever, 3 years old, friendly)"
                />
                {errors.currentPets && <div className="invalid-feedback">{errors.currentPets}</div>}
              </div>
            )}

            {formData.hasPets === "yes" && (
              <div className="form-group">
                <label className="form-label">10. Are your current pets spayed/neutered and up-to-date on vaccinations? *</label>
                <select
                  name="petsSpayedNeutered"
                  value={formData.petsSpayedNeutered}
                  onChange={handleChange}
                  className={`form-control ${errors.petsSpayedNeutered ? 'is-invalid' : ''}`}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.petsSpayedNeutered && <div className="invalid-feedback">{errors.petsSpayedNeutered}</div>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">11. Have you had cats before? What happened to them? *</label>
              <select
                name="hadCatsBefore"
                value={formData.hadCatsBefore}
                onChange={handleChange}
                className={`form-control ${errors.hadCatsBefore ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.hadCatsBefore && <div className="invalid-feedback">{errors.hadCatsBefore}</div>}
            </div>

            {formData.hadCatsBefore === "yes" && (
              <div className="form-group">
                <label className="form-label">Previous Cats Details *</label>
                <textarea
                  name="previousCats"
                  value={formData.previousCats}
                  onChange={handleChange}
                  className={`form-control ${errors.previousCats ? 'is-invalid' : ''}`}
                  rows={3}
                  placeholder="e.g., Had 2 cats, one passed away from old age, one rehomed due to moving"
                />
                {errors.previousCats && <div className="invalid-feedback">{errors.previousCats}</div>}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <h4 className="step-title">Care & Commitment</h4>
            
            <div className="form-group">
              <label className="form-label">12. Why do you want to adopt a cat? *</label>
              <textarea
                name="adoptionReason"
                value={formData.adoptionReason}
                onChange={handleChange}
                className={`form-control ${errors.adoptionReason ? 'is-invalid' : ''}`}
                rows={3}
                placeholder="Please explain your reasons for wanting to adopt a cat"
              />
              {errors.adoptionReason && <div className="invalid-feedback">{errors.adoptionReason}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">13. Are you interested in a specific cat? (If so, which one?)</label>
              <input
                type="text"
                name="specificCat"
                value={formData.specificCat}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter cat name if interested in a specific one"
              />
            </div>

            <div className="form-group">
              <label className="form-label">14. Who will be the primary caretaker for the cat? *</label>
              <input
                type="text"
                name="primaryCaretaker"
                value={formData.primaryCaretaker}
                onChange={handleChange}
                className={`form-control ${errors.primaryCaretaker ? 'is-invalid' : ''}`}
                placeholder="Enter the primary caretaker's name"
              />
              {errors.primaryCaretaker && <div className="invalid-feedback">{errors.primaryCaretaker}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">15. Will the cat be kept indoors, outdoors, or both? *</label>
              <select
                name="indoorOutdoor"
                value={formData.indoorOutdoor}
                onChange={handleChange}
                className={`form-control ${errors.indoorOutdoor ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="indoor">Indoors only</option>
                <option value="outdoor">Outdoors only</option>
                <option value="both">Both indoors and outdoors</option>
              </select>
              {errors.indoorOutdoor && <div className="invalid-feedback">{errors.indoorOutdoor}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">16. How many hours per day will the cat be alone? *</label>
              <input
                type="text"
                name="hoursAlone"
                value={formData.hoursAlone}
                onChange={handleChange}
                className={`form-control ${errors.hoursAlone ? 'is-invalid' : ''}`}
                placeholder="e.g., 8 hours during work day"
              />
              {errors.hoursAlone && <div className="invalid-feedback">{errors.hoursAlone}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">17. Where will the cat stay when you are not home? *</label>
              <textarea
                name="whenAway"
                value={formData.whenAway}
                onChange={handleChange}
                className={`form-control ${errors.whenAway ? 'is-invalid' : ''}`}
                rows={2}
                placeholder="e.g., Free roam of the house, specific room, etc."
              />
              {errors.whenAway && <div className="invalid-feedback">{errors.whenAway}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">18. Are you prepared for a long-term (15-20 years) commitment? *</label>
              <select
                name="longTermCommitment"
                value={formData.longTermCommitment}
                onChange={handleChange}
                className={`form-control ${errors.longTermCommitment ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.longTermCommitment && <div className="invalid-feedback">{errors.longTermCommitment}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">19. Are you able and willing to provide regular and emergency veterinary care? *</label>
              <select
                name="veterinaryCare"
                value={formData.veterinaryCare}
                onChange={handleChange}
                className={`form-control ${errors.veterinaryCare ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.veterinaryCare && <div className="invalid-feedback">{errors.veterinaryCare}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">20. May we contact your veterinarian for a reference? *</label>
              <select
                name="vetReference"
                value={formData.vetReference}
                onChange={handleChange}
                className={`form-control ${errors.vetReference ? 'is-invalid' : ''}`}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.vetReference && <div className="invalid-feedback">{errors.vetReference}</div>}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Appointment Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Appointment Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                  />
                  {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="adoption-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">
              <svg className="me-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Adoption Application
            </h3>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>

          <div className="modal-body">
            <div className="selected-pet-info">
              <div className="pet-preview">
                <img
                  src={selectedPet.imageUrl}
                  alt={selectedPet.name}
                  className="pet-image"
                />
                <div className="pet-details">
                  <h4>{selectedPet.name}</h4>
                  <p>{selectedPet.breed}</p>
                </div>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">Step {currentStep} of {totalSteps}</span>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

