import React from 'react';
import { useFormContext } from 'react-hook-form';
import validator from 'validator';
import { HiMiniPlus } from "react-icons/hi2";
import { AiOutlineSave } from "react-icons/ai";
import { MdClear } from "react-icons/md";

const ScheduleMeeting = ({setShowAlert, showEdit, meetingFormData, setMeetingFormData, createMeetingAPI, updateMeetingAPI, clearFields, handleCreateButton}) => {
    const {register, handleSubmit, setValue, getFieldState, clearErrors, 
        formState: {errors}} = useFormContext();

    const validateDate = (enteredDate) => {
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`;
        if(enteredDate.length === 10) {
            if(validator.isDate(enteredDate, {
                format: "YYYY-MM-DD"
            })) {
                if(validator.isBefore(enteredDate, formattedCurrentDate)) {
                    return("Enter Future date! Use format YYYY-MM-DD!");
                }
            } else {
                return("Enter Valid Date! Use format YYYY-MM-DD!");
            }
        } else {
            return("Enter Valid Date! Length of date needs to be 10!");
        }
    }

    const validateTime = (enteredTime) => {
        const currentDate = new Date();
        const formattedCurrentDateTime = `${String(currentDate.getFullYear()).padStart(2, '0')}-${String(currentDate.getMonth()+1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`;
        const enteredDateTime = document.getElementById("dateFor").value+"T"+enteredTime;
        if(enteredTime.length === 5) {
            if(!validator.isTime(enteredTime, {
                format: "HH:mm"
            })) {
                return("Enter Valid Time! Use format HH:mm!");
            } if(validator.isBefore(enteredDateTime, formattedCurrentDateTime)) {
                    return("Enter Future time! Use format HH:mm!");
            }
        } else {
            return("Enter Valid Time! Length of date needs to be 5!");
        }
    };

    const validateEmails = (enteredEmails) => {
        const emailArray = enteredEmails.split(",").map(email => email.trim());
        if(emailArray.length > 5)
            return "Maximum of 5 emails can be entered";
        for(let eachEmail of emailArray) {
            if(eachEmail && !/\S+@\S+\.\S+/.test(eachEmail))
                return `${eachEmail} is not a valid email.`;
        }
        return true;
    };

    const handleClearEvent = () => {
        handleCreateButton();
        setShowAlert(false);
        clearFields();
        clearErrors();
    };

    const handleFormValues = (name,value) => {
        setShowAlert(false);
        setValue(name, value, {shouldValidate: true});
        setMeetingFormData({...meetingFormData, [name]: value});
    };

    return (
    <div>
        <form action="#">
            <div>
                <label htmlFor="titleFor" className='form-label'>Meeting Title</label>
                <input type="text" className='form-control' id='titleFor' placeholder='Enter meeting title'
                    {...register("title", {
                        required: {value: true, message: "Title is required"},
                        onChange: (event) => handleFormValues("title", event.target.value)
                    })} 
                    value= {meetingFormData.title}
                    />
                    {errors.title && <span className='invalid-feedback d-block'>{errors.title.message}</span>}
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <label htmlFor="dateFor" className='form-label'>Meeting Date</label>
                    <input type="text" className='form-control' id='dateFor' placeholder="YYYY-MM-DD"
                        {...register("date", {
                            required: {value: true, message: "Date is required"},
                            validate: validateDate,
                            onChange: (event) => handleFormValues("date", event.target.value)
                        })} 
                        value= {meetingFormData.date}
                        />
                        {errors.date && <span className='invalid-feedback d-block'>{errors.date.message}</span>}
                </div>
                <div className='col-md-6'>
                    <label htmlFor="timeFor" className='form-label'>Meeting Time<span className='fw-light fst-italic'> 24 Hrs Time Format</span></label>
                    <input type="text" className='form-control' id='timeFor' placeholder='HH:mm'
                        {...register("time", {
                            required: {value: true, message: "Time is required"},
                            validate: validateTime,
                            onChange: (event) => handleFormValues("time", event.target.value)
                        })}
                        value= {meetingFormData.time}
                        disabled={getFieldState("date") && (!getFieldState("date").isDirty || errors.date)} />
                        {errors.time && <span className='invalid-feedback d-block'>{errors.time.message}</span>}
                </div>
            </div>
            <div>
                <label htmlFor="levelFor" className='form-label'>Meeting level</label>
                <select className="form-select" id="levelFor"
                    {...register("level", {
                        required: {value: true, message: "Level is required"},
                        onChange: (event) => handleFormValues("level", event.target.value)
                    })} 
                    value= {meetingFormData.level}
                    >
                    <option value="">Choose level</option>
                    <option value="Team">Team</option>
                    <option value="Account">Account</option>
                    <option value="Department">Department</option>
                    <option value="All">All</option>
                </select>
                {errors.level && <span className='invalid-feedback d-block'>{errors.level.message}</span>}
            </div> 
            <div>
                <label htmlFor="participantsFor" className='form-label'>Participants<span className='fw-light fst-italic'> Min: 1 and Max: 5 emails can be entered</span></label>
                <input type="text" className='form-control' id='participantsFor' placeholder='Enter participant emails separated by commas'
                    {...register("participants", 
                        {
                            required: {value: true, message: "Participant Emails are required"},
                            validate: validateEmails,
                            onChange: (event) => handleFormValues("participants", event.target.value)
                        }
                    )} 
                    value= {meetingFormData.participants}
                    />
                    {errors.participants && <span className='invalid-feedback d-block'>{errors.participants.message}</span>}
            </div> 
            <div>
                <label htmlFor="descriptionFor" className='form-label'>Description</label>
                <textarea className='form-control' id='descriptionFor' rows="3" placeholder='Enter meeting description'
                    {...register("description", {
                        required: {value: true, message: "Description is required"},
                        onChange: (event) => handleFormValues("description", event.target.value)
                    })} 
                    value= {meetingFormData.description}
                    />
                    {errors.description && <span className='invalid-feedback d-block'>{errors.description.message}</span>}
            </div>
            <div className='mt-2'>
                {!showEdit ? 
                    (<button type="button" className='btn btn-success mx-2' id="createMeeting" onClick={handleSubmit(createMeetingAPI)}><HiMiniPlus /> Create Meeting</button>)
                    :
                    (<button type="button" className='btn btn-success mx-2' id="editMeeting" style={{backgroundColor: "#fd7e14"}} onClick={handleSubmit(updateMeetingAPI)}><AiOutlineSave /> Edit</button>)
                }
                <button type="button" className='btn btn-warning mx-2' id="clearMeeting" onClick={handleClearEvent}><MdClear /> Clear</button>
            </div>
        </form>
    </div>
    );
};

export default ScheduleMeeting;