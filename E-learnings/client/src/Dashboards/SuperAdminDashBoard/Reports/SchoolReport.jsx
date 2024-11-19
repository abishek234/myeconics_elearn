import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Select from 'react-select'; // Import react-select
import "../../CSS/Dashboard.css"; // Import your CSS file for styling

const SchoolData = ({ userId }) => {
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null); // Initialize as null
    const [schoolData, setSchoolData] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [chartType, setChartType] = useState('bar');
    const chartRef = React.createRef();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Fetch all schools when the component mounts
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/superAdmins/superAdmins/schools');
                console.log('Fetched schools:', response.data); // Log the response
                if (Array.isArray(response.data)) {
                    setSchools(response.data.map(school => ({
                        label: school.schoolname,
                        value: school.schoolname
                    }))); // Map schools to include label and value for react-select
                    setFilteredSchools(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setSchools([]);
                    setFilteredSchools([]);
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    // Fetch school data for the selected school
    const handleSchoolChange = async (selectedOption) => {
        if (!selectedOption) return; // If no option is selected

        setSelectedSchool(selectedOption); // Set selected school

        try {
            const response = await axios.get(`http://localhost:9000/api/superAdmins/superAdmins/school/${selectedOption.value}`);
            setSchoolData(response.data);
        } catch (error) {
            console.error('Error fetching school data:', error);
            setSchoolData(null); // Reset school data on error
        }
    };

    // Function to download the chart as an image
    const downloadChart = () => {
        if (chartRef.current) {
            const canvas = chartRef.current.canvas;
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>School Data</h1>
                <div className="form-group">
                    <label>Select a school:</label>
                    <Select
                        options={schools}
                        value={selectedSchool}
                        onChange={handleSchoolChange}
                        placeholder="Select a school"
                    />
                </div>

                <div className="form-group">
                    <label>Select chart type:</label>
                    <select value={chartType} onChange={handleChartTypeChange}>
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                        <option value="line">Line</option>
                    </select>

                    <br />
                    <br />
                    <br />
                </div>

                {/* Render charts only if schoolData is available */}
                {schoolData && (
                    <>
                        {chartType === 'bar' && (
                            <Bar
                                ref={chartRef}
                                data={{
                                    labels: ['Total Students', 'Boys', 'Girls', 'Total Teachers', 'Male Teachers', 'Female Teachers'],
                                    datasets: [
                                        {
                                            label: 'School Data',
                                            data: [
                                                schoolData.totalStudents,
                                                schoolData.boysCount,
                                                schoolData.girlsCount,
                                                schoolData.totalTeachers,
                                                schoolData.maleTeachersCount,
                                                schoolData.femaleTeachersCount,
                                            ],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)',
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        )}

                        {chartType === 'pie' && (
                            <Pie
                                ref={chartRef}
                                data={{
                                    labels: ['Total Students', 'Boys', 'Girls', 'Total Teachers', 'Male Teachers', 'Female Teachers'],
                                    datasets: [
                                        {
                                            label: 'School Data',
                                            data: [
                                                schoolData.totalStudents,
                                                schoolData.boysCount,
                                                schoolData.girlsCount,
                                                schoolData.totalTeachers,
                                                schoolData.maleTeachersCount,
                                                schoolData.femaleTeachersCount,
                                            ],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64 ,1)'
                                            ],
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                }}
                            />
                        )}

                        {chartType === 'line' && (
                            <Line
                                ref={chartRef}
                                data={{
                                    labels: ['Total Students', 'Boys', 'Girls', 'Total Teachers', 'Male Teachers', 'Female Teachers'],
                                    datasets: [
                                        {
                                            label: 'School Data',
                                            data: [
                                                schoolData.totalStudents,
                                                schoolData.boysCount,
                                                schoolData.girlsCount,
                                                schoolData.totalTeachers,
                                                schoolData.maleTeachersCount,
                                                schoolData.femaleTeachersCount,
                                            ],
                                            backgroundColor: [
                                                // You can customize these colors
                                                'rgba(255 ,99 ,132 ,0.2)',
                                                // Add more colors as needed
                                                // ...
                                            ],
                                            borderColor: [
                                                // You can customize these colors
                                                '#ff6384',
                                                // Add more colors as needed
                                                // ...
                                            ],
                                            borderWidth: 3,
                                        },
                                    ],
                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }}
                            />
                        )}
                    </>
                )}
                <button className="btn-download" onClick={downloadChart} >Download Chart</button>
            
            </main>
       </div> 
    );
};

export default SchoolData;