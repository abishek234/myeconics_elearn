import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../CSS/Dashboard.css";
import { toast } from 'react-toastify';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const TopicCards = ({ className, subject, chapter, onTopicClick }) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:9000/api/videos/videos/${userId}/${className}/${subject}/${chapter}`);
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
                toast.error('Failed to fetch chapters.');
            }
        };

        fetchTopics();
    }, [className, subject, chapter]);

    return (
        <>
            <br />
            <br />
            <div className="chapter-cards">
                {topics.map((topicData, index) => {
                    const { topic, isCompleted } = topicData;

                    // Determine if the "Read Now" button should be shown
                    const showReadNowButton = index === 0 || (topics[index - 1]?.isCompleted);

                    return (
                        <div key={topic} className="chapter-card">
                            <h3>{topic}</h3>
                            <div>
                                {showReadNowButton ? (
                                    <button 
                                        className={isCompleted ? "completed" : "incomplete"} 
                                        onClick={() => onTopicClick(topic)}
                                    >
                                        Read Now
                                    </button>
                                ) : (
                                    <button className="incomplete" disabled>
                                        Not Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TopicCards;