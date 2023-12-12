// Import necessary components and styles
import * as React from "react";
import './HomePage.css'
import AppBarComponent from "../AppBarComponent/AppBarComponent";
import Hero from "../Hero/Hero";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function HomePage() {
  const redirectToLink = (value) => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = value.link.authenticated;
    } else {
      window.location.href = value.link.unauthenticated;
    }
  };

  const sections = [
    // ... (unchanged sections array)
  ];

  return (
    <div>
      <AppBarComponent />
      <Hero />
    
      <hr />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {sections.map((value) => (
          <ListItem
            key={value.description}
            disableGutters
            secondaryAction={
              <div
                onClick={() => redirectToLink(value)}
                style={{ width: '100%', marginBottom: '2rem' }}
              >
                {value.function}
              </div>
            }
          >
            <ListItemText primary={value.description} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
