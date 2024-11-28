let meetingData = [];

export const getAllMeetingsData = () => {
    return meetingData;
};

export const addMeetingData = (meeting) => {
    const newMeeting = {
        id: meetingData.length+1,
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