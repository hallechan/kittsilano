export interface Pet {
  id: string;
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "other";
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes: string;
  
  formData?: {
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
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

