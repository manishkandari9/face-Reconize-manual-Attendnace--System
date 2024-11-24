// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { Lock, Unlock, User, Mail, Key } from 'lucide-react';

// export default function Component() {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const icons = [Lock, Unlock, User, Mail, Key];

//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.position.z = 5;

//     const particles = [];

//     for (let i = 0; i < 100; i++) {
//       const geometry = new THREE.PlaneGeometry(0.2, 0.2);
//       const material = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         transparent: true,
//         opacity: Math.random() * 0.5 + 0.1,
//         side: THREE.DoubleSide,
//       });
//       const particle = new THREE.Mesh(geometry, material);

//       particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
//       particle.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);

//       scene.add(particle);
//       particles.push(particle);
//     }

//     let animationId;
//     const animate = () => {
//       animationId = requestAnimationFrame(animate);

//       particles.forEach((particle) => {
//         particle.rotation.x += 0.01;
//         particle.rotation.y += 0.01;
//         particle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x) * 0.01;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       if (!containerRef.current) return;
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationId); // Stop the animation loop
//       scene.clear();
//       renderer.dispose();
//     };
//   }, []); // Empty dependency array as refs don't need to be in the dependency list

//   return (
//     <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

//       <div className="absolute inset-0">
//         {/* Blob elements */}
//         {[...Array(5)].map((_, index) => (
//           <div
//             key={index}
//             className="absolute rounded-full mix-blend-screen filter animate-blob"
//             style={{
//               width: `${Math.random() * 400 + 200}px`,
//               height: `${Math.random() * 400 + 200}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               backgroundColor: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`,
//               filter: 'url(#goo)',
//               animationDuration: `${Math.random() * 20 + 10}s`,
//               animationDelay: `${Math.random() * 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="text-center space-y-4 z-10">
//           <h1 className="text-6xl font-bold text-white animate-text-glow">Welcome</h1>
//           <p className="text-2xl text-white animate-pulse">Sign In or Sign Up</p>
//         </div>
//       </div>

//       <div className="absolute inset-0 pointer-events-none">
//         {icons.map((Icon, index) => (
//           <Icon
//             key={index}
//             className="absolute text-white/30 animate-float"
//             size={48}
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${Math.random() * 10 + 5}s`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

//       <style jsx global>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           25% { transform: translate(20px, -20px) scale(1.1); }
//           50% { transform: translate(-20px, 20px) scale(0.9); }
//           75% { transform: translate(20px, 20px) scale(1.05); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
//         @keyframes text-glow {
//           0%, 100% { text-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3); }
//           50% { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5); }
//         }
//         .animate-blob {
//           animation: blob 25s infinite;
//         }
//         .animate-float {
//           animation: float 15s infinite ease-in-out;
//         }
//         .animate-text-glow {
//           animation: text-glow 3s ease-in-out infinite alternate;
//         }
//       `}</style>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceComponent = () => {
//   const [topAttendees, setTopAttendees] = useState([]); // Store top 3 attendees
//   const [errorMessage, setErrorMessage] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]); // Store all attendance data (past and current)
//   const [datesFetched, setDatesFetched] = useState(new Set()); // Track fetched dates to avoid re-fetching

//   // Function to fetch attendance data for a specific date
//   const fetchAttendanceReportsForDate = async (date) => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/attendance/fetch', {
//         params: { date, reportType: 'daily' },
//       });

//       console.log(`Fetched data for ${date}:`, response.data); // Log the fetched data

//       // Check if the fetched data contains students and it's not empty
//       if (response.data && response.data.students && response.data.students.length > 0) {
//         setAttendanceData(prevData => [...prevData, response.data]); // Store new data
//         setDatesFetched(prevDates => new Set([...prevDates, date])); // Mark the date as fetched
//       } else {
//         console.log(`No attendance data available for ${date}, skipping.`);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for ${date}:`, error);
//       setErrorMessage('Failed to fetch attendance reports. Please try again.');
//     }
//   };

//   // Function to calculate top 3 students based on cumulative attendance
//   const calculateTopAttendees = () => {
//     const presenceCountMap = {}; // Map to store presence counts for each student

//     // Loop through all fetched attendance data
//     attendanceData.forEach((report, index) => {
//       console.log(`Processing data for report ${index + 1}:`, report); // Log each report being processed

//       if (report && report.students) {
//         report.students.forEach(student => {
//           // Log each student's status and name to debug
//           console.log(`Student Name: ${student.name}, Status: ${student.status}`);

//           // Check if the student has a name and the status is 'present'
//           if (student.name && student.status === 'present') {
//             // Increment presence count for each student
//             presenceCountMap[student.name] = (presenceCountMap[student.name] || 0) + 1;
//           } else {
//             console.log(`Skipping student ${student.name} (Status: ${student.status})`);
//           }
//         });
//       } else {
//         console.log("No students data found in this report.");
//       }
//     });

//     console.log("Presence count map:", presenceCountMap); // Log the presence count map

//     // Sort the students by presence count in descending order and get the top 3
//     const topStudents = Object.entries(presenceCountMap)
//       .map(([name, count]) => ({ name, presenceCount: count }))
//       .sort((a, b) => b.presenceCount - a.presenceCount) // Sort by highest presence count
//       .slice(0, 3); // Get the top 3 students

//     console.log("Top 3 students:", topStudents); // Log the top 3 students

//     // Update the state with the top 3 students
//     setTopAttendees(topStudents);
//   };

//   // Fetch all attendance data from the start date to today
//   const fetchAllAttendanceData = async () => {
//     const startDate = new Date('2024-11-01'); // Start date for attendance fetching
//     const today = new Date();

//     console.log("Fetching attendance data from:", startDate.toISOString().split('T')[0], "to", today.toISOString().split('T')[0]);

//     // Loop through each date and fetch attendance
//     for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
//       const dateStr = date.toISOString().split('T')[0];
//       console.log("Fetching attendance for date:", dateStr); // Log each date being fetched

//       // Skip dates that have already been fetched
//       if (!datesFetched.has(dateStr)) {
//         await fetchAttendanceReportsForDate(dateStr); // Fetch attendance for this date
//       }
//     }

//     // After fetching all data, calculate the top attendees
//     calculateTopAttendees();
//   };

//   useEffect(() => {
//     // Fetch all attendance data when the component mounts
//     fetchAllAttendanceData();

//     // Optional: Refresh data daily (could be disabled or adjusted as needed)
//     const intervalId = setInterval(fetchAllAttendanceData, 24 * 60 * 60 * 1000); // Refresh daily

//     return () => clearInterval(intervalId); // Clean up interval on component unmount
//   }, [datesFetched]);

//   return (
//     <div>
//       <h1>Top 3 Attendees (Cumulative Attendance)</h1>
//       {topAttendees.length > 0 ? (
//         <ul>
//           {topAttendees.map((attendee, index) => (
//             <li key={index}>
//               {attendee.name} - {attendee.presenceCount} days present
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No attendance data available.</p>
//       )}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default AttendanceComponent;



// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Button, Typography } from '@mui/material';
// import axios from 'axios';
// import './SignInSignUp.css';
// import * as THREE from 'three';
// import { Lock, Unlock, User, Mail, Key } from 'lucide-react'; // Imported icons

// function SignInSignUp() {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);

//   const handleToggle = () => {
//     setIsSignIn(!isSignIn);
//     setError('');
//     setIdentifier('');
//     setPassword('');
//   };

//   const validateIdentifier = () => {
//     if (!identifier) {
//       setError('Please enter your email or roll number');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     if (!validateIdentifier()) {
//       return; // Stop if validation fails
//     }

//     const endpoint = isSignIn ? 'signin' : 'signup';
//     const data = { identifier, password };

//     try {
//       const response = await axios.post(`http://localhost:3000/api/auth/${endpoint}`, data);

//       if (response.status === 200 || response.status === 201) {
//         const token = response.data.token;

//         // Store the token in localStorage
//         localStorage.setItem('token', token);

//         // Navigate to dashboard
//         navigate('/dashboard');
//       } else {
//         setError('Failed to authenticate. Please check your credentials.');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.position.z = 5;

//     const particles = [];

//     for (let i = 0; i < 100; i++) {
//       const geometry = new THREE.PlaneGeometry(0.2, 0.2);
//       const material = new THREE.MeshBasicMaterial({
//         color: 0xffffff,
//         transparent: true,
//         opacity: Math.random() * 0.5 + 0.1,
//         side: THREE.DoubleSide,
//       });
//       const particle = new THREE.Mesh(geometry, material);

//       particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
//       particle.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);

//       scene.add(particle);
//       particles.push(particle);
//     }

//     let animationId;
//     const animate = () => {
//       animationId = requestAnimationFrame(animate);

//       particles.forEach((particle) => {
//         particle.rotation.x += 0.01;
//         particle.rotation.y += 0.01;
//         particle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x) * 0.01;
//       });

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       if (!containerRef.current) return;
//       const width = containerRef.current.clientWidth;
//       const height = containerRef.current.clientHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationId); // Stop the animation loop
//       scene.clear();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
//       {/* Animated Icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[Lock, Unlock, User, Mail, Key].map((Icon, index) => (
//           <Icon
//             key={index}
//             className="absolute text-white/30 animate-float"
//             size={48}
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${Math.random() * 10 + 5}s`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Three.js Canvas */}
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

//       {/* Gradient Overlay for Bottom */}
//       <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

//       {/* Form Container */}
//       <Container
//         maxWidth="xs"
//         className="form-container"
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           zIndex: 10,
//           backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly darker background for contrast
//           padding: '2rem',
//           borderRadius: '15px',
//           boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)', // Strong shadow for depth
//         }}
//       >
//         <Typography variant="h4" gutterBottom color="white" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>
//           {isSignIn ? 'Sign in' : 'Sign up'}
//         </Typography>
//         {error && (
//           <Typography color="error" align="center" style={{ marginBottom: '20px' }}>
//             {error}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group" style={{ marginTop: '10px' }}>
//             <label htmlFor="identifier" className="input-label" style={{ color: 'white' }}>
//               {isSignIn ? 'Email or Roll Number' : 'Enter Email or Roll Number'}
//             </label>
//             <input
//               type="text"
//               id="identifier"
//               name="identifier"
//               className="custom-input"
//               placeholder={isSignIn ? 'Email or Roll Number' : 'Enter Email or Roll Number'}
//               required
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//             />
//           </div>
//           <div className="form-group" style={{ marginTop: '10px' }}>
//             <label htmlFor="password" className="input-label" style={{ color: 'white' }}>
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="custom-input"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button
//             variant="contained"
//             fullWidth
//             type="submit"
//             className="submit-btn"
//             style={{
//               marginTop: '10px',
//               backgroundColor: '#ff9800', // Bright orange button color
//               color: 'white',
//               fontWeight: 'bold',
//               borderRadius: '25px',
//               padding: '12px 0', // Button padding
//               boxShadow: '0 6px 18px rgba(255, 152, 0, 0.6)',
//             }}
//           >
//             {isSignIn ? 'Sign in' : 'Sign up'}
//           </Button>
//         </form>

//         <Typography variant="body1" align="center" style={{ marginTop: '15px', color: 'white' }}>
//           {isSignIn ? "Don't have an account?" : 'Already have an account?'}
//           <span
//             onClick={handleToggle}
//             style={{
//               cursor: 'pointer',
//               marginLeft: '20px',
//               color: '#ff9900',
//               fontWeight: 'bold',
//               textDecoration: 'underline',
//             }}
//           >
//             {isSignIn ? 'Sign up' : 'Sign in'}
//           </span>
//         </Typography>
//       </Container>
//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(20deg); }
//         }

//         @keyframes text-glow {
//           0%, 100% { text-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.3); }
//           50% { text-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.5); }
//         }

//         .animate-float {
//           animation: float 15s infinite ease-in-out;
//         }

//         .animate-text-glow {
//           animation: text-glow 3s ease-in-out infinite alternate;
//         }

//         .animate-pulse {
//           animation: pulse 1.5s infinite;
//         }

//         @keyframes pulse {
//           0% { opacity: 0.7; }
//           50% { opacity: 1; }
//           100% { opacity: 0.7; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default SignInSignUp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceComponent = () => {
//   const [topAttendees, setTopAttendees] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [totalPresent, setTotalPresent] = useState(0); // To store the total present students
//   const [totalAbsent, setTotalAbsent] = useState(0);   // To store the total absent students
//   const fetchDate = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     const fetchAttendanceReports = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/attendance/fetch', {
//           params: { date: fetchDate, reportType: 'daily' },
//         });

//         console.log("API Response:", JSON.stringify(response.data, null, 2)); 
//         calculateTopAttendees(response.data); // Calculate top attendees and presence counts
//       } catch (error) {
//         console.error('Error fetching attendance reports:', error);
//         if (error.response) {
//           setErrorMessage(`Error: ${error.response.data.message || error.message}`);
//         } else {
//           setErrorMessage('Failed to fetch attendance reports. Please try again.');
//         }
//       }
//     };

//     const calculateTopAttendees = (data) => {
//       if (data.length > 0) {
//         const students = data[0].students; // Access the students array from the first report

//         // Create variables to count total present and absent students
//         let presentCount = 0;
//         let absentCount = 0;

//         // Create a map to count presence for top students
//         const presenceCountMap = {};
//         students.forEach(student => {
//           if (student.status === 'present') {
//             presentCount++;
//             presenceCountMap[student.name] = (presenceCountMap[student.name] || 0) + 1; // Increment count
//           } else {
//             absentCount++;
//           }
//         });

//         // Update total present and absent counts in state
//         setTotalPresent(presentCount);
//         setTotalAbsent(absentCount);

//         // Convert the map to an array and sort by count
//         const attendeesWithCounts = Object.entries(presenceCountMap).map(([name, count]) => ({
//           name,
//           presenceCount: count
//         }));

//         console.log("Attendees with Counts:", attendeesWithCounts); 

//         const topStudents = attendeesWithCounts
//           .sort((a, b) => b.presenceCount - a.presenceCount) // Sort by presence count
//           .slice(0, 3); // Get top 3 students

//         console.log("Top Students:", topStudents);

//         setTopAttendees(topStudents); // Update top attendees state
//       } else {
//         console.log("No attendance data available.");
//       }
//     };

//     fetchAttendanceReports();

//     const intervalId = setInterval(fetchAttendanceReports, 20000); // Fetch every 20 seconds

//     return () => clearInterval(intervalId); // Clear interval on unmount
//   }, [fetchDate]);

//   return (
//     <div>
//       {errorMessage && <div className="error">{errorMessage}</div>}
      
//       <div>
//         <h3>Total Present Students: {totalPresent}</h3>
//         <h3>Total Absent Students: {totalAbsent}</h3>
//       </div>

//       <div>
//         <h3>Top 3 Attendees:</h3>
//         <ul>
//           {topAttendees.map((attendee, index) => (
//             <li key={index}>
//               {attendee.name} - {attendee.presenceCount} times present
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AttendanceComponent;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceApp = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch students from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/students');
//         const studentData = response.data;
//         setStudents(studentData);

//         // Initialize attendance with all students marked as "Absent"
//         const initialAttendance = studentData.reduce((acc, student, index) => {
//           // Use student index or roll number to uniquely identify attendance
//           acc[student.rollNumber] = "Absent"; // Default to "Absent"
//           return acc;
//         }, {});

//         setAttendance(initialAttendance);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setErrorMessage("Failed to fetch students. Please try again.");
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Toggle attendance status for a specific student
//   const toggleAttendance = (rollNumber) => {
//     setAttendance((prevAttendance) => ({
//       ...prevAttendance,
//       [rollNumber]: prevAttendance[rollNumber] === "Present" ? "Absent" : "Present"
//     }));
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Student Attendance</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <div className="attendance-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Roll Number</th>
//               <th>Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.rollNumber}>
//                 <td>{student.name}</td>
//                 <td>{student.rollNumber}</td>
//                 <td>
//                   <button
//                     onClick={() => toggleAttendance(student.rollNumber)}
//                     className={`attendance-btn ${attendance[student.rollNumber] === "Present" ? 'present' : 'absent'}`}
//                   >
//                     {attendance[student.rollNumber]}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .attendance-container {
//           font-family: Arial, sans-serif;
//           padding: 20px;
//           background-color: #f4f4f9;
//           border-radius: 10px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }
        
//         h1 {
//           color: #333;
//           font-size: 24px;
//           margin-bottom: 20px;
//           text-align: center;
//         }

//         .error-message {
//           color: red;
//           text-align: center;
//         }

//         .attendance-table {
//           width: 100%;
//           margin-top: 20px;
//           border-collapse: collapse;
//         }

//         table {
//           width: 100%;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//         }

//         th, td {
//           padding: 12px 15px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background-color: #f0f0f0;
//         }

//         .attendance-btn {
//           padding: 8px 16px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//           font-size: 16px;
//           transition: background-color 0.3s;
//         }

//         .attendance-btn.present {
//           background-color: green;
//           color: white;
//         }

//         .attendance-btn.absent {
//           background-color: red;
//           color: white;
//         }

//         .attendance-btn:hover {
//           opacity: 0.8;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AttendanceApp;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceApp = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch students from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/students');
//         const studentData = response.data;
//         setStudents(studentData);

//         // Initialize attendance with null (no option selected) for all students
//         const initialAttendance = studentData.reduce((acc, student) => {
//           acc[student.rollNumber] = null; // Default to null (no selection)
//           return acc;
//         }, {});

//         setAttendance(initialAttendance);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setErrorMessage("Failed to fetch students. Please try again.");
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Update attendance status for a specific student
//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendance((prevAttendance) => ({
//       ...prevAttendance,
//       [rollNumber]: status
//     }));
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Student Attendance</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <div className="attendance-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Roll Number</th>
//               <th>Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.rollNumber}>
//                 <td>{student.name}</td>
//                 <td>{student.rollNumber}</td>
//                 <td>
//                   <div className="attendance-radio-buttons">
//                     <label>
//                       <input
//                         type="radio"
//                         name={`attendance-${student.rollNumber}`}
//                         value="Present"
//                         onChange={() => handleAttendanceChange(student.rollNumber, "Present")}
//                         checked={attendance[student.rollNumber] === "Present"}
//                       />
//                       Present
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name={`attendance-${student.rollNumber}`}
//                         value="Absent"
//                         checked={attendance[student.rollNumber] === "Absent"}
//                         onChange={() => handleAttendanceChange(student.rollNumber, "Absent")}
//                       />
//                       Absent
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .attendance-container {
//           font-family: Arial, sans-serif;
//           padding: 20px;
//           background-color: #f4f4f9;
//           border-radius: 10px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }
        
//         h1 {
//           color: #333;
//           font-size: 24px;
//           margin-bottom: 20px;
//           text-align: center;
//         }

//         .error-message {
//           color: red;
//           text-align: center;
//         }

//         .attendance-table {
//           width: 100%;
//           margin-top: 20px;
//           border-collapse: collapse;
//         }

//         table {
//           width: 100%;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//         }

//         th, td {
//           padding: 12px 15px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background-color: #f0f0f0;
//         }

//         .attendance-radio-buttons {
//           display: flex;
//           gap: 20px;
//         }

//         .attendance-radio-buttons label {
//           font-size: 16px;
//         }

//         input[type="radio"] {
//           margin-right: 5px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AttendanceApp;






// 'use client'

// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Users, Calendar, BookOpen, Menu, UserCheck } from 'lucide-react'

// // Mock API functions (replace these with your actual API calls)
// const fetchRegisteredUsers = async () => {
//   const response = await fetch('/api/users')
//   if (!response.ok) throw new Error('Failed to fetch registered users')
//   return response.json()
// }

// const fetchStudents = async () => {
//   const response = await fetch('/api/students')
//   if (!response.ok) throw new Error('Failed to fetch students')
//   return response.json()
// }

// const fetchAttendance = async () => {
//   const response = await fetch('/api/attendance')
//   if (!response.ok) throw new Error('Failed to fetch attendance')
//   return response.json()
// }

// const fetchAssignments = async () => {
//   const response = await fetch('/api/assignments')
//   if (!response.ok) throw new Error('Failed to fetch assignments')
//   return response.json()
// }

// export default function StudentDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [registeredUsers, setRegisteredUsers] = useState([])
//   const [students, setStudents] = useState([])
//   const [attendance, setAttendance] = useState([])
//   const [assignments, setAssignments] = useState([])
//   const [loading, setLoading] = useState({
//     users: true,
//     students: true,
//     attendance: true,
//     assignments: true,
//   })
//   const [error, setError] = useState({
//     users: null,
//     students: null,
//     attendance: null,
//     assignments: null,
//   })

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(prev => ({ ...prev, users: true }))
//         const usersData = await fetchRegisteredUsers()
//         setRegisteredUsers(usersData)
//       } catch (err) {
//         setError(prev => ({ ...prev, users: err.message }))
//       } finally {
//         setLoading(prev => ({ ...prev, users: false }))
//       }

//       try {
//         setLoading(prev => ({ ...prev, students: true }))
//         const studentsData = await fetchStudents()
//         setStudents(studentsData)
//       } catch (err) {
//         setError(prev => ({ ...prev, students: err.message }))
//       } finally {
//         setLoading(prev => ({ ...prev, students: false }))
//       }

//       try {
//         setLoading(prev => ({ ...prev, attendance: true }))
//         const attendanceData = await fetchAttendance()
//         setAttendance(attendanceData)
//       } catch (err) {
//         setError(prev => ({ ...prev, attendance: err.message }))
//       } finally {
//         setLoading(prev => ({ ...prev, attendance: false }))
//       }

//       try {
//         setLoading(prev => ({ ...prev, assignments: true }))
//         const assignmentsData = await fetchAssignments()
//         setAssignments(assignmentsData)
//       } catch (err) {
//         setError(prev => ({ ...prev, assignments: err.message }))
//       } finally {
//         setLoading(prev => ({ ...prev, assignments: false }))
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
//         <div className="flex items-center justify-between p-4">
//           <h1 className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
//           <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             <Menu className="h-6 w-6" />
//           </Button>
//         </div>
//         <nav className="mt-8">
//           <Button variant="ghost" className="w-full justify-start gap-4 mb-2">
//             <UserCheck className="h-5 w-5" />
//             {isSidebarOpen && <span>Registered Users</span>}
//           </Button>
//           <Button variant="ghost" className="w-full justify-start gap-4 mb-2">
//             <Users className="h-5 w-5" />
//             {isSidebarOpen && <span>Students</span>}
//           </Button>
//           <Button variant="ghost" className="w-full justify-start gap-4 mb-2">
//             <Calendar className="h-5 w-5" />
//             {isSidebarOpen && <span>Attendance</span>}
//           </Button>
//           <Button variant="ghost" className="w-full justify-start gap-4 mb-2">
//             <BookOpen className="h-5 w-5" />
//             {isSidebarOpen && <span>Assignments</span>}
//           </Button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto p-8">
//         <Tabs defaultValue="registered" className="w-full">
//           <TabsList className="mb-8">
//             <TabsTrigger value="registered">Registered Users</TabsTrigger>
//             <TabsTrigger value="students">Student List</TabsTrigger>
//             <TabsTrigger value="attendance">Attendance</TabsTrigger>
//             <TabsTrigger value="assignments">Assignments</TabsTrigger>
//           </TabsList>

//           {/* Registered Users Section */}
//           <TabsContent value="registered">
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
//               {loading.users ? (
//                 <p className="text-gray-500">Loading registered users...</p>
//               ) : error.users ? (
//                 <p className="text-red-500">Error: {error.users}</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="w-[200px]">Name</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead className="text-right">Last Login</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {registeredUsers.map((user) => (
//                       <TableRow key={user.id}>
//                         <TableCell className="font-medium">{user.name}</TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell className="text-right">{user.lastLogin}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </TabsContent>

//           {/* Student List Section */}
//           <TabsContent value="students">
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-6">Student List</h2>
//               {loading.students ? (
//                 <p className="text-gray-500">Loading students...</p>
//               ) : error.students ? (
//                 <p className="text-red-500">Error: {error.students}</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="w-[200px]">Name</TableHead>
//                       <TableHead>ID</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead className="text-right">Course</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {students.map((student) => (
//                       <TableRow key={student.id}>
//                         <TableCell className="font-medium">{student.name}</TableCell>
//                         <TableCell>{student.id}</TableCell>
//                         <TableCell>{student.email}</TableCell>
//                         <TableCell className="text-right">{student.course}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </TabsContent>

//           {/* Attendance Section */}
//           <TabsContent value="attendance">
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-6">Attendance</h2>
//               {loading.attendance ? (
//                 <p className="text-gray-500">Loading attendance data...</p>
//               ) : error.attendance ? (
//                 <p className="text-red-500">Error: {error.attendance}</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="w-[200px]">Date</TableHead>
//                       <TableHead>Student Name</TableHead>
//                       <TableHead className="text-right">Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {attendance.map((record) => (
//                       <TableRow key={record.id}>
//                         <TableCell className="font-medium">{record.date}</TableCell>
//                         <TableCell>{record.studentName}</TableCell>
//                         <TableCell className="text-right">
//                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                             record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                           }`}>
//                             {record.status}
//                           </span>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </TabsContent>

//           {/* Assignments Section */}
//           <TabsContent value="assignments">
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-6">Assignments</h2>
//               {loading.assignments ? (
//                 <p className="text-gray-500">Loading assignments...</p>
//               ) : error.assignments ? (
//                 <p className="text-red-500">Error: {error.assignments}</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="w-[200px]">Title</TableHead>
//                       <TableHead>Due Date</TableHead>
//                       <TableHead>Course</TableHead>
//                       <TableHead className="text-right">Submitted</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {assignments.map((assignment) => (
//                       <TableRow key={assignment.id}>
//                         <TableCell className="font-medium">{assignment.title}</TableCell>
//                         <TableCell>{assignment.dueDate}</TableCell>
//                         <TableCell>{assignment.course}</TableCell>
//                         <TableCell className="text-right">
//                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                             assignment.submitted === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                           }`}>
//                             {assignment.submitted}
//                           </span>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceComponent = () => {
//   const [topAttendees, setTopAttendees] = useState([]); // शीर्ष 3 छात्रों की सूची
//   const [errorMessage, setErrorMessage] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]); // सभी उपस्थिति डेटा
//   const [datesFetched, setDatesFetched] = useState(new Set()); //Fetched डेट्स ट्रैक करने के लिए सेट

//   // किसी खास दिन का उपस्थिति डेटा प्राप्त करने का कार्य
//   const fetchAttendanceReportsForDate = async (date) => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/attendance/fetch', {
//         params: { date, reportType: 'daily' },
//       });

//       // उपस्थिति डेटा लॉग करें
//       if (response.data && response.data.students && response.data.students.length > 0) {
//         setAttendanceData(prevData => [...prevData, response.data]);
//         setDatesFetched(prevDates => new Set([...prevDates, date]));
//       }
//     } catch (error) {
//       console.error(`Error fetching data for ${date}:`, error);
//       setErrorMessage('उपस्थिति रिपोर्ट लाने में असफल रहा। कृपया पुनः प्रयास करें।');
//     }
//   };

//   // टॉप 3 छात्रों की गणना करें जिनकी उपस्थिति सबसे ज्यादा है
//   const calculateTopAttendees = () => {
//     const presenceCountMap = {}; // प्रत्येक छात्र के नाम के साथ उपस्थिति की गिनती

//     // सभी उपस्थिति डेटा में से छात्रों की उपस्थिति गिनती को जोड़ें
//     attendanceData.forEach(report => {
//       if (report && report.students) {
//         report.students.forEach(student => {
//           if (student.name && student.status === 'present') {
//             presenceCountMap[student.name] = (presenceCountMap[student.name] || 0) + 1;
//           }
//         });
//       }
//     });

//     // उपस्थिति गिनती के अनुसार शीर्ष 3 छात्र चुनें
//     const topStudents = Object.entries(presenceCountMap)
//       .map(([name, count]) => ({ name, presenceCount: count }))
//       .sort((a, b) => b.presenceCount - a.presenceCount) // सबसे ज्यादा उपस्थिति वाले पहले
//       .slice(0, 3); // शीर्ष 3 छात्रों को चुनें

//     setTopAttendees(topStudents);
//   };

//   // शुरुआत की तारीख से लेकर आज तक का उपस्थिति डेटा प्राप्त करें
//   const fetchAllAttendanceData = async () => {
//     const startDate = new Date('2024-11-01');
//     const today = new Date();

//     for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
//       const dateStr = date.toISOString().split('T')[0];
//       if (!datesFetched.has(dateStr)) {
//         await fetchAttendanceReportsForDate(dateStr);
//       }
//     }

//     // सभी डेटा के बाद शीर्ष उपस्थिति वाले छात्रों की गणना करें
//     calculateTopAttendees();
//   };

//   useEffect(() => {
//     // माउंट होते ही उपस्थिति डेटा प्राप्त करें
//     fetchAllAttendanceData();

//     const intervalId = setInterval(fetchAllAttendanceData, 24 * 60 * 60 * 1000);

//     return () => clearInterval(intervalId);
//   }, [datesFetched]);

//   return (
//     <div>
//       <h1>उपस्थिति के आधार पर शीर्ष 3 छात्र</h1>
//       {topAttendees.length > 0 ? (
//         <ul>
//           {topAttendees.map((attendee, index) => (
//             <li key={index}>
//               {attendee.name} - {attendee.presenceCount} दिनों में उपस्थित
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>उपस्थिति डेटा उपलब्ध नहीं है।</p>
//       )}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default AttendanceComponent;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AttendanceApp = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   // Fetch students from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/students');
//         const studentData = response.data;
//         setStudents(studentData);

//         // Initialize attendance with null (no option selected) for all students
//         const initialAttendance = studentData.reduce((acc, student) => {
//           acc[student.rollNumber] = null; // Default to null (no selection)
//           return acc;
//         }, {});

//         setAttendance(initialAttendance);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setErrorMessage("Failed to fetch students. Please try again.");
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Update attendance status for a specific student
//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendance((prevAttendance) => ({
//       ...prevAttendance,
//       [rollNumber]: status
//     }));
//   };

//   // Function to get the color and style based on attendance status
//   const getAttendanceStyle = (status) => {
//     if (status === "Present") {
//       return { backgroundColor: "#4CAF50", color: "white" }; // Green for Present
//     }
//     if (status === "Absent") {
//       return { backgroundColor: "#F44336", color: "white" }; // Red for Absent
//     }
//     return { backgroundColor: "#E0E0E0", color: "black" }; // Gray for unselected
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Student Attendance</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <div className="attendance-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Roll Number</th>
//               <th>Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.rollNumber}>
//                 <td>{student.name}</td>
//                 <td>{student.rollNumber}</td>
//                 <td>
//                   <div className="attendance-boxes">
//                     <div
//                       className="attendance-box"
//                       style={getAttendanceStyle(attendance[student.rollNumber] === "Present" ? "Present" : null)}
//                       onClick={() => handleAttendanceChange(student.rollNumber, "Present")}
//                     >
//                       Present
//                     </div>
//                     <div
//                       className="attendance-box"
//                       style={getAttendanceStyle(attendance[student.rollNumber] === "Absent" ? "Absent" : null)}
//                       onClick={() => handleAttendanceChange(student.rollNumber, "Absent")}
//                     >
//                       Absent
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .attendance-container {
//           font-family: 'Arial', sans-serif;
//           padding: 20px;
//           background-color: #f9f9f9;
//           border-radius: 15px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           max-width: 800px;
//           margin: 0 auto;
//         }
        
//         h1 {
//           color: #333;
//           font-size: 28px;
//           margin-bottom: 30px;
//           text-align: center;
//         }

//         .error-message {
//           color: #F44336;
//           text-align: center;
//           font-size: 16px;
//         }

//         .attendance-table {
//           width: 100%;
//           margin-top: 20px;
//           border-collapse: collapse;
//         }

//         table {
//           width: 100%;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//         }

//         th, td {
//           padding: 15px 20px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background-color: #f0f0f0;
//           font-weight: bold;
//         }

//         td {
//           background-color: #fff;
//         }

//         .attendance-boxes {
//           display: flex;
//           gap: 15px;
//         }

//         .attendance-box {
//           padding: 12px 20px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 16px;
//           text-align: center;
//           transition: all 0.3s ease;
//           width: 100px;
//           font-weight: bold;
//         }

//         .attendance-box:hover {
//           opacity: 0.9;
//           transform: translateY(-2px);
//         }

//         .attendance-box:active {
//           transform: translateY(1px);
//         }

//         @media (max-width: 768px) {
//           .attendance-container {
//             padding: 15px;
//           }

//           h1 {
//             font-size: 24px;
//           }

//           .attendance-boxes {
//             flex-direction: column;
//             gap: 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AttendanceApp;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import api from './services/api';
// import { CheckCircleIcon, AcademicCapIcon } from '@heroicons/react/outline';

// // AttendanceApp component
// const AttendanceApp = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');

//   // Fetch students from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/students');
//         const studentData = response.data;
//         setStudents(studentData);

//         // Initialize attendance with null (no option selected) for all students
//         const initialAttendance = studentData.reduce((acc, student) => {
//           acc[student.rollNumber] = null; // Default to null (no selection)
//           return acc;
//         }, {});

//         setAttendance(initialAttendance);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setErrorMessage('Failed to fetch students. Please try again.');
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Update attendance status for a specific student
//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendance((prevAttendance) => ({
//       ...prevAttendance,
//       [rollNumber]: status
//     }));
//   };

//   // Function to get the color and style based on attendance status
//   const getAttendanceStyle = (status) => {
//     if (status === 'Present') {
//       return { backgroundColor: '#4CAF50', color: 'white' }; // Green for Present
//     }
//     if (status === 'Absent') {
//       return { backgroundColor: '#F44336', color: 'white' }; // Red for Absent
//     }
//     return { backgroundColor: '#E0E0E0', color: 'black' }; // Gray for unselected
//   };

//   return (
//     <div className="attendance-container">
//       <h1>Student Attendance</h1>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <div className="attendance-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Roll Number</th>
//               <th>Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.rollNumber}>
//                 <td>{student.name}</td>
//                 <td>{student.rollNumber}</td>
//                 <td>
//                   <div className="attendance-boxes">
//                     <div
//                       className="attendance-box"
//                       style={getAttendanceStyle(attendance[student.rollNumber] === 'Present' ? 'Present' : null)}
//                       onClick={() => handleAttendanceChange(student.rollNumber, 'Present')}
//                     >
//                       Present
//                     </div>
//                     <div
//                       className="attendance-box"
//                       style={getAttendanceStyle(attendance[student.rollNumber] === 'Absent' ? 'Absent' : null)}
//                       onClick={() => handleAttendanceChange(student.rollNumber, 'Absent')}
//                     >
//                       Absent
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .attendance-container {
//           font-family: 'Arial', sans-serif;
//           padding: 20px;
//           background-color: #f9f9f9;
//           border-radius: 15px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         h1 {
//           color: #333;
//           font-size: 28px;
//           margin-bottom: 30px;
//           text-align: center;
//         }

//         .error-message {
//           color: #F44336;
//           text-align: center;
//           font-size: 16px;
//         }

//         .attendance-table {
//           width: 100%;
//           margin-top: 20px;
//           border-collapse: collapse;
//         }

//         table {
//           width: 100%;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//         }

//         th,
//         td {
//           padding: 15px 20px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background-color: #f0f0f0;
//           font-weight: bold;
//         }

//         td {
//           background-color: #fff;
//         }

//         .attendance-boxes {
//           display: flex;
//           gap: 15px;
//         }

//         .attendance-box {
//           padding: 12px 20px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 16px;
//           text-align: center;
//           transition: all 0.3s ease;
//           width: 100px;
//           font-weight: bold;
//         }

//         .attendance-box:hover {
//           opacity: 0.9;
//           transform: translateY(-2px);
//         }

//         .attendance-box:active {
//           transform: translateY(1px);
//         }

//         @media (max-width: 768px) {
//           .attendance-container {
//             padding: 15px;
//           }

//           h1 {
//             font-size: 24px;
//           }

//           .attendance-boxes {
//             flex-direction: column;
//             gap: 10px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Teacher Dashboard Component
// const TeacherDashboard = () => {
//   const [date, setDate] = useState(new Date());
//   const [teacherName, setTeacherName] = useState('');
//   const [subjectName, setSubjectName] = useState('');
//   const [students, setStudents] = useState([]);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [totalPresent, setTotalPresent] = useState(0);
//   const [totalAbsent, setTotalAbsent] = useState(0);

//   // Fetch attendance data from the backend
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/attendance', {
//           params: { date: date.toISOString().split('T')[0] },
//         });
//         setStudents(response.data.students);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//       }
//     };

//     fetchAttendance();
//   }, [date]);

//   const handleSubmitAttendance = async () => {
//     const attendanceData = {
//       date: date.toISOString().split('T')[0],
//       teacherName,
//       subjectName,
//       students,
//     };

//     try {
//       const response = await axios.post('http://localhost:3000/api/attendance', attendanceData);
//       setSuccessMessage('Attendance submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting attendance:', error);
//     }
//   };

//   return (
//     <div className="teacher-dashboard-container">
//       <h1 className="text-3xl font-bold mb-8 text-center text-neon-blue">Teacher Dashboard</h1>

//       <div className="attendance-container">
//         <AttendanceApp />

//         <button
//           className="mt-4 bg-neon-blue text-white rounded-lg py-2 px-4 w-full hover:bg-blue-700"
//           onClick={handleSubmitAttendance}
//         >
//           Submit Attendance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendancePage = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch attendance records from the backend
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/attendance/records");
        setAttendanceRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance records", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {attendanceRecords.map((record, index) => (
            <li key={index}>
              {record.name} ({record.studentId}) - {new Date(record.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendancePage;
