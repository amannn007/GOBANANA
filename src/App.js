import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Grid, Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    body2: {
      color: '#757575',
    },
  },
});

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching the dog data', error);
      }
    };
    fetchDogs();
  }, []);

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (dog) => {
    setSelectedDog(dog);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDog(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Dog Breeds
        </Typography>
        <TextField
          label="Search for a breed"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          {filteredDogs.map(dog => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
              <Card 
                onClick={() => handleCardClick(dog)} 
                style={{ 
                  cursor: 'pointer', 
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                  transition: '0.3s' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={dog.image?.url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-I-EBOHRny8FbLb8yJOCPtdnIEucFRoenKfCZxn9GTGeMu9pU0-gkU_d2iXyT3a6z&usqp=CAU'}
                  alt={dog.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dog.bred_for || 'No description available'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedDog?.name}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              <img
                src={selectedDog?.image?.url || 'https://via.placeholder.com/300'}
                alt={selectedDog?.name}
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              />
              <Typography variant="h6" gutterBottom>
                Bred for:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedDog?.bred_for || 'No description available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Breed group:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedDog?.breed_group || 'No breed group available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Life span:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedDog?.life_span || 'No life span available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Temperament:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedDog?.temperament || 'No temperament available'}
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
