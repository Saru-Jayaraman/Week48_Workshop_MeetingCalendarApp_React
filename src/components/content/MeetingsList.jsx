import React from 'react';
import { deleteMeetingData } from '../../service/MeetingAPI';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const MeetingsList = (props) => {
    const displayMeetingList = (() => {
        const allRowElements = props.allMeetingsData.map((meeting) => {
            const trElement = 
                <tr key={meeting.id}>
                    <td>{meeting.id}</td>
                    <td>{meeting.title}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.level}</td>
                    <td>
                        <span className='p-1 mx-1 border rounded-2' style={{backgroundColor: "#fd7e14"}} onClick={() => editMeeting(meeting.id)}><FaEdit /></span>
                        <span className="bg-danger p-1 mx-1 border rounded-2"><RiDeleteBin5Line onClick={() => deleteMeeting(meeting.id)} /></span>
                    </td>
                </tr>
                return trElement;
        });
        return allRowElements;
    });

    const editMeeting = (editId) => {
        console.log("Id to edit: ", editId);
        const foundMeeting = props.allMeetingsData.filter(meeting => meeting.id === editId);
        const setMeeting = {
            title: foundMeeting[0].title,
            date: foundMeeting[0].date,
            time: foundMeeting[0].time,
            level: foundMeeting[0].level,
            participants: foundMeeting[0].participants,
            description: foundMeeting[0].description
        };
        props.setMeetingFormData(setMeeting);
        document.getElementById("createMeeting").disabled = true;
        document.getElementById("editMeeting").disabled = false;
        props.setEditId(editId);
    };

    const deleteMeeting = (deleteId) => {
        console.log("Id to delete: ", deleteId);
        deleteMeetingData(deleteId);
        props.setAlertName("DELETED");
        props.setAlertColor("danger");
        props.setShowAlert(true);
        props.clearFields();
    };
    return (
    <div>
        <table className='table table-striped table-sm'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {displayMeetingList()}
            </tbody>
        </table>
    </div>
    );
};

export default MeetingsList;