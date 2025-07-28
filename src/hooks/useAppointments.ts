import { useState, useEffect } from "react";
import { Appointment, Pet } from "../types";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
    
    localStorage.removeItem("pets");
    
    const samplePets: Pet[] = [
      {
        id: "1",
        name: "Mittens",
        type: "cat",
        breed: "Domestic Shorthair",
        age: 2,
        description: "Sweet and playful cat who loves to cuddle and chase toys.",
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
        available: true,
      },
      {
        id: "2",
        name: "Shadow",
        type: "cat",
        breed: "White Domestic Shorthair",
        age: 3,
        description: "Mysterious and elegant black cat with a gentle personality.",
        imageUrl: "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=400",
        available: true,
      },
      {
        id: "3",
        name: "Luna",
        type: "cat",
        breed: "Siamese",
        age: 1,
        description: "Beautiful Siamese cat with striking blue eyes and a talkative nature.",
        imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400",
        available: true,
      },
      {
        id: "4",
        name: "Ginger",
        type: "cat",
        breed: "Orange Tabby",
        age: 4,
        description: "Loving orange tabby with a big personality and lots of energy.",
        imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
        available: true,
      },
      {
        id: "5",
        name: "Snowball",
        type: "cat",
        breed: "White Persian",
        age: 2,
        description: "Fluffy white Persian cat who loves to be pampered and groomed.",
        imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400",
        available: true,
      },
      {
        id: "6",
        name: "Tiger",
        type: "cat",
        breed: "Bengal",
        age: 1,
        description: "Energetic Bengal cat with beautiful spotted coat and wild spirit.",
        imageUrl: "https://images.unsplash.com/photo-1640249029702-7ad678dc51cd?q=80&w=985",
        available: true,
      },
    ];
    setPets(samplePets);
    localStorage.setItem("pets", JSON.stringify(samplePets));
  }, []);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, ...updates } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const updatePetAvailability = (petId: string, available: boolean) => {
    const updatedPets = pets.map(pet =>
      pet.id === petId ? { ...pet, available } : pet
    );
    setPets(updatedPets);
    localStorage.setItem("pets", JSON.stringify(updatedPets));
  };

  return {
    appointments,
    pets,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    updatePetAvailability,
  };
};

