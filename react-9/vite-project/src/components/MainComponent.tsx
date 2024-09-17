import React from 'react';
import image from '../assets/img/prof.png';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Appointment {
  patientName: string;
  age: number;
  gender: string;
  status: string;
  appointmentTime: string;
  appointmentDate: string;
  phoneNumber: string;
  doctorName: string;
}

interface MainComponentProps {
  appointments: Appointment[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const MainComponent: React.FC<MainComponentProps> = ({ appointments, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  return (
    <section className="main-content">
      <div className="container">
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Status</th>
              <th>Appointment</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>
                  <div className="user-info">
                    <div className="user-info__img">
                      <img src={image} alt="User Img" />
                    </div>
                    <div className="user-info__basic">
                      <h5 className="mb-0">{appointment.patientName}</h5>
                      <p className="text-muted mb-0">{appointment.age} yrs, {appointment.gender}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`btn btn-${appointment.status === 'Consult' ? 'success' : 'primary'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <h6 className="mb-0">{appointment.appointmentTime}</h6>
                  <small>{appointment.appointmentDate}</small>
                </td>
                <td>
                  <h6 className="mb-0">{appointment.phoneNumber}</h6>
                  <a href="#!"><small>Contact</small></a>
                </td>
                <td>
                  <h6 className="mb-0">{appointment.doctorName}</h6>
                </td>
                <td>
                  <IconButton
                    aria-label="more"
                    aria-controls={`long-menu-${index}`}
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`long-menu-${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl) && selectedIndex === index}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { onEdit(index); handleClose(); }}>
                      <i className="fa fa-pencil mr-1"></i> Edit
                    </MenuItem>
                    <MenuItem onClick={() => { onDelete(index); handleClose(); }} className="text-danger">
                      <i className="fa fa-trash mr-1"></i> Delete
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MainComponent;