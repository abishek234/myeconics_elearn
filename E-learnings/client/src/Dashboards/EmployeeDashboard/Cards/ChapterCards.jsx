
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../CSS/Dashboard.css";
import { toast } from 'react-toastify';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ChapterCards = ({ className, subject,onChapterClick }) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/videos/videos/chapters/${className}/${subject}`);
                setChapters(response.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
                toast.error('Failed to fetch chapters.');
            }
        };

        fetchChapters();
    }, [className, subject]);

    return (
        <>
        <br />
        <br />
        <div className="chapter-cards">
            {chapters.map((chapter) => (
                <div key={chapter} className="chapter-card">
                    <h3>{chapter}</h3>
                    <button className="action" onClick={() => onChapterClick(chapter)} ><MdOutlineKeyboardDoubleArrowRight style={{fontSize:'15px'}} />&nbsp;Read Now</button>
                </div>
            ))}
        </div>
        </>
    );
};

export default ChapterCards;