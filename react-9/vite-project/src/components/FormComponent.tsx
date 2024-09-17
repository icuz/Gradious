import React, { useState, useEffect } from 'react';

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

interface FormComponentProps {
  onSubmit: (formState: FormState) => void;
  initialFormState: FormState;
  isEditing: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit, initialFormState, isEditing }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  useEffect(() => {
    setFormState(initialFormState);
  }, [initialFormState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formState);
    setFormState({
      patientName: '',
      age: 0,
      gender: '',
      status: '',
      appointmentTime: '',
      appointmentDate: '',
      phoneNumber: '',
      doctorName: '',
    });
  };

  return (
    <section className="form-content">
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <p>Welcome to Gradious Doctor Appointment Booking</p>
          </div>
          <div className="form-content">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Patient Name *"
                    name="patientName"
                    value={formState.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="gender"
                    value={formState.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Male/Female *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age *"
                    name="age"
                    value={formState.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number *"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Date *"
                    name="appointmentDate"
                    value={formState.appointmentDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Time *"
                    name="appointmentTime"
                    value={formState.appointmentTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Doctor Name *"
                    name="doctorName"
                    value={formState.doctorName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="status"
                    value={formState.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Consult/Revisit *</option>
                    <option value="Consult">Consult</option>
                    <option value="Revisit">Revisit</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="button" className="btnSubmit" onClick={handleSubmit}>
              {isEditing ? 'Update Appointment' : 'Book Appointment'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormComponent;