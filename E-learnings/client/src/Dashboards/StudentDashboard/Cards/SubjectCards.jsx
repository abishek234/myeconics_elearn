
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const SubjectCards = ({ className,onSubjectClick }) => {
    const [subjects, setSubjects] = useState([]);
    console.log('Class Name:', className);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/videos/videos/subjects/${className}`);
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                toast.error('Failed to fetch subjects.');
            }
        };

        fetchSubjects();
    }, [className]);

    return (
        <div className="subject-cards">
            {subjects.map((subject) => (
                <div key={subject} className="subject-card">
                    <h3>{subject}</h3>
                    <button onClick={() => onSubjectClick(subject)}><MdOutlineKeyboardDoubleArrowRight style={{fontSize:'15px'}} />&nbsp;Read Now</button>
                </div>
            ))}
        </div>
    );
};

export default SubjectCards;