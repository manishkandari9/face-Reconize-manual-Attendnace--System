import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, Paper, InputBase, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import ScannerIcon from '@mui/icons-material/Scanner';
import Logo from './facee.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { day: 'Mon', thirdYear: 40 },
  { day: 'Tue', thirdYear: 40 },
  { day: 'Wed', thirdYear: 40 },
  { day: 'Thu', thirdYear: 40 },
  { day: 'Fri', thirdYear: 40 },
  { day: 'Sat', thirdYear: 40 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [topAttendees, setTopAttendees] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAttendanceReports = async () => {
      try {
        const fetchDate = new Date().toISOString().split('T')[0];
        const response = await axios.get('http://localhost:3000/api/attendance/fetch', {
          params: { date: fetchDate, reportType: 'daily' },
        });
        calculateTopAttendees(response.data);
      } catch (error) {
        setErrorMessage('Error fetching attendance reports. Please try again.');
      }
    };

    const calculateTopAttendees = (data) => {
      if (data.length > 0) {
        const students = data[0].students;
        let presentCount = 0;
        let absentCount = 0;
        const presenceCountMap = {};

        students.forEach(student => {
          if (student.status === 'present') {
            presentCount++;
            presenceCountMap[student.name] = (presenceCountMap[student.name] || 0) + 1;
          } else {
            absentCount++;
          }
        });

        setTotalPresent(presentCount);
        setTotalAbsent(absentCount);

        const attendeesWithCounts = Object.entries(presenceCountMap).map(([name, count]) => ({
          name,
          presenceCount: count
        }));

        const topStudents = attendeesWithCounts
          .sort((a, b) => b.presenceCount - a.presenceCount)
          .slice(0, 3);

        setTopAttendees(topStudents);
      }
    };

    fetchAttendanceReports();
    const intervalId = setInterval(fetchAttendanceReports, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogoutClick = () => navigate('/');
  const handleScanNowClick = () => navigate('/scan');
  const handleTeacherDashboardClick = () => navigate("/TeacherDashboard");
  const handleAssignmentManagerClick = () => navigate("/AssignmentManager");
  const handleStudentDashboardClick = () => navigate("/StudentDashboard");
  const handleRefreshClick = () => navigate("/dashboard");

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#14151B', color: 'white' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: 700, backgroundColor: "#14151B", padding: 2, border: "1px solid #07f7ff" }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <img src={Logo} alt="Logo" style={{ width: 40, height: 'auto', marginRight: "8px", borderRadius: "50%" }} />
              <Typography variant="h6" color="white">Face Attendance</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid orange', borderRadius: 4, padding: 0.5 }}>
              <SearchIcon sx={{ color: 'white', mr: 1 }} />
              <InputBase placeholder="Search..." sx={{ color: '#00ff00', flex: 1, ml: 1 }} />
            </Box>
          </Box>
          <List>
            <ListItem button>
              <ListItemIcon><DashboardIcon sx={{ color: '#07f7ff' }} /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleLogoutClick}>
              <ListItemIcon><LogoutIcon sx={{ color: '#07f7ff' }} /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ flexGrow: 1, padding: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h2">{currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}</Typography>
            <Box>
              <IconButton color="inherit"><DarkModeIcon /></IconButton>
              <IconButton color="inherit" onClick={handleRefreshClick}><RefreshIcon /></IconButton>
              <IconButton color="inherit"><NotificationsIcon /></IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Paper sx={{ padding: 4, background: "linear-gradient(to right, #000000, #003440)", cursor: 'pointer' }} onClick={handleScanNowClick}>
                <Typography variant="h6" color="white" align="center">
                  <ScannerIcon sx={{ fontSize: 30, mr: 1 }} />
                  Scan Face
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ padding: 4, background: "linear-gradient(to right, #000000, #003440)" }} onClick={handleTeacherDashboardClick}>
                <Typography variant="h6" color="white" align="center">Teacher Dashboard</Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ padding: 4, background: "linear-gradient(to right, #000000, #003440)" }} onClick={handleAssignmentManagerClick}>
                <Typography variant="h6" color="white" align="center">Assignment Manager</Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ padding: 4, background: "linear-gradient(to right, #000000, #003440)" }} onClick={handleStudentDashboardClick}>
                <Typography variant="h6" color="white" align="center">Student Dashboard</Typography>
              </Paper>
            </Grid>

            <Grid item xs={8}>
              <Paper sx={{ padding: 2, backgroundColor: '#1e1e1e', color: "#07f7ff", borderRadius: "20px" }}>
                <Typography variant="h6" align="center">3rd Year Attendance</Typography>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="#07f7ff" />
                    <YAxis stroke="#07f7ff" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="thirdYear" stroke="#FF8042" name="3rd Year" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper sx={{ padding: 2, backgroundColor: '#1e1e1e', color: "#07f7ff", borderRadius: "20px" }}>
                <Typography variant="h6" align="center">Top 3 Attendees</Typography>
                <List>
                  {topAttendees.map((attendee, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${attendee.name} (${attendee.presenceCount} classes)`} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
