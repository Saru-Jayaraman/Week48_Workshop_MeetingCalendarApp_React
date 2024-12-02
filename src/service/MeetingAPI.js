let meetingData = [];

export const getAllMeetingsData = () => {
    return meetingData;
};

export const addMeetingData = (meeting) => {
    const newMeetingId = meetingData.length !==0 ? meetingData[meetingData.length-1].id+1 : meetingData.length+1;
    const newMeeting = {
        id: newMeetingId,
        title: meeting.title,
        date: meeting.date,
        time: meeting.time,
        level: meeting.level,
        participants: meeting.participants,
        description: meeting.description
    };
    meetingData.push(newMeeting);
    console.log(meetingData);
};

export const updateMeetingData = (id, meeting) => {
    for(let i=0; i<meetingData.length; i++) {
        if(meetingData[i].id === id) {
            meeting.id = id;
            meetingData[i] = meeting;
            break;
        }
    }
    console.log(meetingData);
};

export const deleteMeetingData = (deleteId) => {
    const foundMeeting = meetingData.filter(meeting => meeting.id !== deleteId);
    meetingData = foundMeeting;
    console.log(meetingData);
};