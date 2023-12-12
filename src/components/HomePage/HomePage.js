import * as React from "react";
import './HomePage.css'
import AppBarComponent from "../AppBarComponent/AppBarComponent";
import Hero from "../Hero/Hero";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




export default function HomePage() {


  const redirectToLink = (value) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to a link for authenticated users
      window.location.href = value.link.authenticated;
    } else {
      // Redirect to a link for unauthenticated users
      window.location.href = value.link.unauthenticated;
    }
  };

  const sections = [
    {
      title: 'Functionality 1',
      description: 'Budgets can be added, edited, and deleted by users.',
      function: 'View Budgets',
      link: {
        authenticated: '/mybudgets',
        unauthenticated: '/signup',
      },
    },
    {
      title: 'Functionality 2',
      description: 'The  budgets can be added, edited, or deleted by users.',
      function: 'Monthly Budgets',
      link: {
        authenticated: '/monthlybudgets',
        unauthenticated: '/login',
      },
    },
    {
      title: 'Functionality 3',
      description: 'Three visualisations created using their budget data are displayed to users.',
      function: 'Show Visualizations',
      link: {
        authenticated: '/dashboard',
        unauthenticated: '/signup',
      },
    },
  ];

  return (
    <div>
      <AppBarComponent />
      <Hero />

      <Box
      sx={{
        component:"form",
        width: '95%',
        margin: 'auto',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: 3,
        backgroundColor: 'green',
        textAlign: 'center',
        mt: 3,
        p: 3,
      }}
    >
      <h2>
      Users can use this Personal Budget application to plan their budgets, The user of this application can establish monthly budgets for specific items. Additionally, users can also see their budgets.

</h2>
      <Typography variant="h5" align='center' gutterBottom>
          Components
        </Typography>
        <hr></hr>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {sections.map((value) => (
            <ListItem
              key={value.description}
              disableGutters
              secondaryAction={
                <Button onClick={() => redirectToLink(value)}
                width = '200%'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                  {value.function}
                </Button>
              }
            >
              <ListItemText primary={value.description} />
            </ListItem>
          ))}
        </List>
    </Box>
    </div>
  );
}