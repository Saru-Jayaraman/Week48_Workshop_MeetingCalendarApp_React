import React from 'react';
import { addMeetingData, updateMeetingData } from '../../service/MeetingAPI';
import { HiMiniPlus } from "react-icons/hi2";
import { AiOutlineSave } from "react-icons/ai";
import { MdClear } from "react-icons/md";

const ScheduleMeeting = (props) => {
    const handleFormValues = (name,value) => {
        props.setShowAlert(false);
        props.setMeetingFormData({...props.meetingFormData, [name]: value});
    };

    const submitMeetingForm = () => {
        if(!document.getElementById('createMeeting').disabled) {
            addMeetingData(props.meetingFormData);
            props.setAlertName("CREATED");
            props.setAlertColor("success");
        } else {
            updateMeetingData(props.editId, props.meetingFormData);
            document.getElementById("createMeeting").disabled = false;
            document.getElementById("editMeeting").disabled = true;
            props.setAlertName("EDITED");
            props.setAlertColor("warning");
        }
        props.setShowAlert(true);
        props.clearFields();
    };

    return (
    <div>
        <form action="#" onSubmit={submitMeetingForm}>
            <div>
                <label htmlFor="titleFor" className='form-label'>Meeting Title</label>
                <input type="text" className='form-control' id='titleFor' placeholder='Enter meeting title' value={props.meetingFormData.title} onChange={(event) => handleFormValues("title", event.target.value)} />
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <label htmlFor="dateFor" className='form-label'>Meeting Date</label>
                    <input type="date" className='form-control' id='dateFor' value={props.meetingFormData.date} onChange={(event) => handleFormValues("date", event.target.value)} />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="timeFor" className='form-label'>Meeting Time</label>
                    <input type="time" className='form-control' id='timeFor' value={props.meetingFormData.time} onChange={(event) => handleFormValues("time", event.target.value)} />
                </div>
            </div>
            <div>
                <label htmlFor="levelFor" className='form-label'>Meeting level</label>
                <select className="form-select" id="levelFor" value={props.meetingFormData.level} onChange={(event) => handleFormValues("level", event.target.value)} >
                    <option>Choose level</option>
                    <option value="Team">Team</option>
                    <option value="Account">Account</option>
                    <option value="Department">Department</option>
                    <option value="All">All</option>
                </select>
            </div>
            <div>
                <label htmlFor="participantsFor" className='form-label'>Participants</label>
                <input type="email" className='form-control' id='participantsFor' placeholder='Enter participant emails' value={props.meetingFormData.participants} onChange={(event) => handleFormValues("participants", event.target.value)} />
            </div>
            <div>
                <label htmlFor="descriptionFor" className='form-label'>Description</label>
                <textarea className='form-control' id='descriptionFor' rows="3" placeholder='Enter meeting description' value={props.meetingFormData.description} onChange={(event) => handleFormValues("description", event.target.value)} />
            </div>
            <div className='mt-2'>
                <button type="submit" className='btn btn-success mx-2' id="createMeeting"><HiMiniPlus /> Create Meeting</button>
                <button type="button" className='btn btn-warning mx-2' id="clearFields" onClick={() => { props.setShowAlert(false); props.clearFields(); }}><MdClear /> Clear</button>
                <button type="submit" className='btn btn-success mx-2' id="editMeeting" style={{backgroundColor: "#fd7e14"}} disabled><AiOutlineSave /> Edit</button>
            </div>
        </form>
    </div>
    );
};

export default ScheduleMeeting;