import { useState } from 'react';
import FormComponent from './components/FormComponent';
import MainComponent from './components/MainComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface FormState {
  patientName: string;
  age: number;
  gender: string;
  status: string;
  appointmentTime: string;
  appointmentDate: string;
  phoneNumber: string;
  doctorName: string;
}

function App() {
  const [appointments, setAppointments] = useState<FormState[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [initialFormState, setInitialFormState] = useState<FormState>({
    patientName: '',
    age: 0,
    gender: '',
    status: '',
    appointmentTime: '',
    appointmentDate: '',
    phoneNumber: '',
    doctorName: '',
  });

  const handleFormSubmit = (formState: FormState) => {
    if (isEditing && editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = formState;
      setAppointments(updatedAppointments);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setAppointments([...appointments, formState]);
    }
  };

  const handleEdit = (index: number) => {
    setInitialFormState(appointments[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="app-container">
      <section className="form-content">
        <FormComponent
          onSubmit={handleFormSubmit}
          initialFormState={initialFormState}
          isEditing={isEditing}
        />
      </section>
      <section className="main-content">
        <MainComponent
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}

export default App;