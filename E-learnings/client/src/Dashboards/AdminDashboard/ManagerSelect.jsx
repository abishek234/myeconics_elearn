import React, { useState } from 'react';

const ManagerSelect = ({ teachers, selectedManager, setSelectedManager }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered teachers based on the search term
    const filteredManagers = teachers.filter(manager =>
        `${manager.firstname} ${manager.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectManager = (manager) => {
        setSelectedManager(manager);
        setIsOpen(false);
        setSearchTerm(''); // Reset search term when a manager is selected
    };

    return (
        <div className="form-group">
            <label htmlFor="teacherSelect">Select a manager:</label>
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedManager || 'Select a manager'}
                </div>
                {isOpen && (
                    <div className="dropdown-list">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredManagers.length > 0 ? (
                            filteredManagers.map((manager) => (
                                <div
                                    key={manager._id}
                                    className="dropdown-item"
                                    onClick={() => handleSelectManager(`${manager.firstname} ${manager.lastname}`)}
                                >
                                    {manager.firstname} {manager.lastname}
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

export default ManagerSelect;