import React, { useEffect, useState } from 'react';
import AlertMessage from '../content/AlertMessage';
import Dashboard from '../content/Dashboard';
import ScheduleMeeting from '../content/MeetingForm';
import MeetingsList from '../content/MeetingsList';
import { getAllMeetingsData } from '../../service/MeetingAPI';
import { FaCalendarAlt } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';

const Content = () => {
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
                    <div className="card mb-1">
                        <div className="card-body">
                            <h5 className="card-title bg-primary ps-1 py-1 rounded text-white"><FaCalendarAlt /> Schedule a New Meeting</h5>
                            <ScheduleMeeting 
                                reload={reload} setReload={setReload} 
                                meetingFormData={meetingFormData} setMeetingFormData={setMeetingFormData} 
                                editId={editId} setEditId={setEditId}
                                setShowAlert={setShowAlert}
                                setAlertName={setAlertName}
                                setAlertColor={setAlertColor}
                                clearFields={clearFields} />
                        </div>
                    </div>
                    <div className="card mb-1">
                        <div className="card-body">
                            <h5 className="card-title">List of Created Meetings</h5>
                            <MeetingsList 
                                reload={reload} setReload={setReload} 
                                allMeetingsData={allMeetingsData} 
                                meetingFormData={meetingFormData} setMeetingFormData={setMeetingFormData} 
                                editId={editId} setEditId={setEditId}
                                setShowAlert={setShowAlert}
                                setAlertName={setAlertName}
                                setAlertColor={setAlertColor}
                                clearFields={clearFields} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Content;