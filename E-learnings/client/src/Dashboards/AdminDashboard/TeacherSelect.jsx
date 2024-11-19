import React, { useState } from 'react';

const TeacherSelect = ({ teachers, selectedTeacher, setSelectedTeacher }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered teachers based on the search term
    const filteredTeachers = teachers.filter(teacher =>
        `${teacher.firstname} ${teacher.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setIsOpen(false);
        setSearchTerm(''); // Reset search term when a teacher is selected
    };

    return (
        <div className="form-group">
            <label htmlFor="teacherSelect">Select a Teacher:</label>
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedTeacher || 'Select a teacher'}
                </div>
                {isOpen && (
                    <div className="dropdown-list">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <div
                                    key={teacher._id}
                                    className="dropdown-item"
                                    onClick={() => handleSelectTeacher(`${teacher.firstname} ${teacher.lastname}`)}
                                >
                                    {teacher.firstname} {teacher.lastname}
                                </div>
                            ))
                        ) : (
                            <div className="dropdown-item">No teachers found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherSelect;