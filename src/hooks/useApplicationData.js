import { useState, useEffect } from 'react';

import axios from 'axios';

export default INITIAL_DATA => {
  const [interviewData, setInterviewData] = useState(INITIAL_DATA);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then(([daysData, appointmentsData, interviewersData]) => {
        setInterviewData(prevState => ({
          ...prevState,
          days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewersData.data,
        }));
      })
      .catch(err => console.log(err));
  }, []);

  const bookInterview = (id, interview) => {
    // set updated appointment
    const updatedAppointment = {
      ...interviewData.appointments[id],
      interview,
    };
    // update appointmentsn of interviewData with updatedAppointment
    const updatedAppointments = {
      ...interviewData,
      appointments: {
        ...interviewData.appointments,
        [id]: updatedAppointment,
      },
    };

    // update database with updated appointment
    return axios
      .put(`/api/appointments/${id}`, updatedAppointment)
      .then(() => setInterviewData(updatedAppointments))
  };

  const cancelInterview = id => {
    // set updated appointment
    const updatedAppointment = {
      ...interviewData.appointments[id],
      interview: null,
    };
    // update appointmentsn of interviewData with updatedAppointment
    const updatedAppointments = {
      ...interviewData,
      appointments: {
        ...interviewData.appointments,
        [id]: updatedAppointment,
      },
    };

    // update database with updated appointment
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setInterviewData(updatedAppointments));
  };

  return { interviewData, setInterviewData, bookInterview, cancelInterview };
};
