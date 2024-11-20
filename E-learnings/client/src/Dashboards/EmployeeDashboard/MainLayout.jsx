import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../CSS/Dashboard.css'; 
import SubjectCards from "./Cards/SubjectCards";
import ChapterCards from "./Cards/ChapterCards";
import VideoPlayer from "./Cards/VideoPlayer";
import TopicCards from "./Cards/TopicCards";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const MainLayout = ({ userId }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const school = localStorage.getItem('userschool');
    const userClass = localStorage.getItem('userclassid');

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [showChapterCards, setShowChapterCards] = useState(false);
    const [showTopicCards, setShowTopicCards] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
        setShowChapterCards(true);
        setShowTopicCards(false);
        setShowVideoPlayer(false);
    };

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
        setShowChapterCards(false);
        setShowTopicCards(true); // Show topic cards when a chapter is selected
        setShowVideoPlayer(false); // Hide video player
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        setShowTopicCards(false); // Hide topic cards when a topic is selected
        setShowVideoPlayer(true); // Show video player for the selected topic
    };

    const handleBackToSubjects = () => {
        // Reset all selections and show subject cards again
        setSelectedSubject(null);
        setSelectedChapter(null);
        setSelectedTopic(null);
        setShowChapterCards(false);
        setShowVideoPlayer(false);
        setShowTopicCards(false); // Reset all states
    };

    const handleBackToChapters = () => {
        // Go back to show chapter cards
        setShowVideoPlayer(false); // Hide video player
        setShowTopicCards(false); // Show topic cards again
        setShowChapterCards(true); // Show chapter cards again

    };

    const handleBackToTopics = () => {
        // Go back to show topic cards
        setShowVideoPlayer(false); // Hide video player
        setShowTopicCards(true); // Show topic cards again
    }

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>Employee Dashboard</h1>
                {/* Subject Selection */}
                {!showChapterCards && !showVideoPlayer && !showTopicCards && (
                    <SubjectCards className={userClass} onSubjectClick={handleSubjectClick} />
                )}
                {/* Chapter Selection */}
                {showChapterCards && (
                    <>
                        <button className="action" onClick={handleBackToSubjects}>
                            <MdOutlineKeyboardDoubleArrowLeft /> Back to Subjects
                        </button>
                        <ChapterCards className={userClass} subject={selectedSubject} onChapterClick={handleChapterClick} />
                    </>
                )}
                {/* Topic Selection */}
                {showTopicCards && (
                    <>
                        <button className="action" onClick={handleBackToChapters}>
                            <MdOutlineKeyboardDoubleArrowLeft /> Back to Chapters
                        </button>
                        <TopicCards className={userClass} subject={selectedSubject} chapter={selectedChapter} onTopicClick={handleTopicClick} />
                    </>
                )}
                {/* Video Player */}
                {showVideoPlayer && (
                    <>
                        
                        <button className="action" onClick={handleBackToTopics}>
                            <MdOutlineKeyboardDoubleArrowLeft /> Back to Topics
                        </button>
                        <VideoPlayer className={userClass} subject={selectedSubject} chapter={selectedChapter} topic={selectedTopic} />
                    </>
                )}
            </main>
        </div>
    );
};

export default MainLayout;