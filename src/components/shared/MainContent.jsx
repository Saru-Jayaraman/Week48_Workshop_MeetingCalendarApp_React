import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertMessage from '../content/AlertMessage';
import Dashboard from '../content/Dashboard';
import ScheduleMeeting from '../content/MeetingForm';
import MeetingsList from '../content/MeetingsList';
import { getAllMeetingsData, addMeetingData, updateMeetingData, deleteMeetingData } from '../../service/MeetingAPI';
import { FaCalendarAlt } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';

const Content = () => {
    const methods = useForm();
    const [meetingFormData, setMeetingFormData] = useState({
        title: "",
        date: "",
        time: "",
        level: "",
        participants: "",
        description: ""
    });
    const [allMeetingsData, setAllMeetingsData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertName, setAlertName] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [editId, setEditId] = useState();
    const [reload, setReload] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleCreateButton = () => {
        setShowEdit(false);
    };
    const handleEditButton = () => {
        setShowEdit(true);
    };

    const createMeetingAPI = () => {
        addMeetingData(meetingFormData);
        setAlertName("CREATED");
        setAlertColor("success");
        setShowAlert(true);
        clearFields();
    };

    const updateMeetingAPI = () => {
        updateMeetingData(editId, meetingFormData);
        handleCreateButton();
        setAlertName("EDITED");
        setAlertColor("warning");
        setShowAlert(true);
        clearFields();
    };

    const deleteMeetingAPI = (id) => {
        deleteMeetingData(id);
        handleCreateButton();
        setAlertName("DELETED");
        setAlertColor("danger");
        setShowAlert(true);
        clearFields();
        methods.clearErrors();
    };

    const handleEditEvent = (id) => {
        const foundMeeting = allMeetingsData.filter(meeting => meeting.id === id);
        const setMeeting = {
            title: foundMeeting[0].title,
            date: foundMeeting[0].date,
            time: foundMeeting[0].time,
            level: foundMeeting[0].level,
            participants: foundMeeting[0].participants,
            description: foundMeeting[0].description
        };
        setMeetingFormData(setMeeting);
        handleEditButton();
        setEditId(id);
        setShowAlert(false);
        methods.clearErrors();
    };

    const clearFields = () => {
        setMeetingFormData({
            title: "",
            date: "",
            time: "",
            level: "",
            participants: "",
            description: ""
        });
        setReload(!reload);
    };

    useEffect(() => {
        setAllMeetingsData(getAllMeetingsData());
    }, [reload]);

    return (
    <div className='container-fluid bg-light'>
        <div className='row'>
            <div className='col'>
                {showAlert && <AlertMessage icon={<FaCheckCircle />} message={<>Meeting is <b>{alertName}</b> successfully...</>} color={alertColor} />}
            </div>
        </div>

        <div className='row'>
            <div className='col-md-3'>
                <div className='my-2 ms-4'>
                    <Dashboard />
                </div>
            </div>
            <div className='col-md-9'>
                <div className='my-2 me-4 px-2 py-2 bg-white'>
                    <FormProvider {...methods}>
                        <div className="card mb-1">
                            <div className="card-body">
                                <h5 className="card-title bg-primary ps-1 py-1 rounded text-white"><FaCalendarAlt /> Schedule a New Meeting</h5>
                                <ScheduleMeeting
                                    meetingFormData={meetingFormData} setMeetingFormData={setMeetingFormData} 
                                    setShowAlert={setShowAlert}
                                    createMeetingAPI={createMeetingAPI}
                                    updateMeetingAPI={updateMeetingAPI}
                                    clearFields={clearFields}
                                    showEdit={showEdit}
                                    handleCreateButton={handleCreateButton} />
                            </div>
                        </div>
                        <div className="card mb-1">
                            <div className="card-body">
                                <h5 className="card-title">List of Created Meetings</h5>
                                <MeetingsList 
                                    allMeetingsData={allMeetingsData} 
                                    deleteMeetingAPI={deleteMeetingAPI}
                                    handleEditEvent={handleEditEvent} />
                            </div>
                        </div>
                    </FormProvider>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Content;