import React from 'react';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const MeetingsList = ({allMeetingsData, deleteMeetingAPI, handleEditEvent}) => {
    const displayMeetingList = (() => {
        const allRowElements = allMeetingsData.map((meeting) => {
            const trElement = 
                <tr key={meeting.id}>
                    <td>{meeting.id}</td>
                    <td>{meeting.title}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.level}</td>
                    <td>
                        <span className='p-1 mx-1 border rounded-2' style={{backgroundColor: "#fd7e14"}} 
                            onClick={() => handleEditEvent(meeting.id)}><FaEdit /></span>
                        <span className="bg-danger p-1 mx-1 border rounded-2"><RiDeleteBin5Line 
                            onClick={() => deleteMeetingAPI(meeting.id)} /></span>
                    </td>
                </tr>
                return trElement;
        });
        return allRowElements;
    });

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