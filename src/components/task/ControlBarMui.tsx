import { useState } from 'react';
// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

// MUI Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList'; // Or TuneIcon

// Custom styled components (optional, for fine-tuning if needed)
// const DarkButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#2c3e50', // Exact dark blue-grey from CSS example
//   color: theme.palette.common.white,
//   '&:hover': {
//     backgroundColor: '#34495e', // Slightly lighter on hover
//   },
// }));

function ControlBarMui() {
  // State to manage the radio button selection (example)
  const [selectedValue, setSelectedValue] = useState('all');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    // Add logic here if needed when radio changes
  };

  // Placeholder function for date selection click
  const handleDateSelectClick = () => {
    console.log('Date selector clicked');
    // Implement date picker logic here
  };

  // Placeholder functions for button clicks
  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  const handleFilterClick = () => {
    console.log('Filter button clicked');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: 1, sm: 2 }, // Responsive padding
        borderBottom: '1px solid',
        borderColor: 'divider', // Use theme's divider color
        bgcolor: 'background.paper', // Use theme's paper background
      }}
    >
      {/* Left Side: Date Selector */}
      <Button
        onClick={handleDateSelectClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          textTransform: 'none', // Prevent uppercase text
          color: 'text.primary', // Use theme's primary text color
          fontWeight: 'normal',
          fontSize: '1rem',
          p: 0, // Remove default button padding if needed
          '&:hover': { // Minimal hover effect for date text
             bgcolor: 'transparent'
          }
        }}
      >
        Tháng 4/2025
      </Button>

      {/* Right Side: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Add Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{
            // Using sx for specific color override to match image
            bgcolor: '#2c3e50',
            color: '#fff',
            '&:hover': {
              bgcolor: '#34495e',
            },
            // You could also use MUI's theme palette if customized
            // color: 'primary', // Or 'secondary' etc.
          }}
        >
          Thêm
        </Button>

        {/* Filter Button */}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterClick}
          sx={{
            // Use theme's default outlined button colors or customize
             color: 'text.secondary',
             borderColor: 'grey.400',
             '&:hover': {
                 borderColor: 'grey.600',
                 bgcolor: 'action.hover'
             }
          }}
        >
          Lọc
        </Button>

        {/* Radio Button Option */}
        <FormControlLabel
          value="all"
          control={
            <Radio
              checked={selectedValue === 'all'}
              onChange={handleRadioChange}
              size="small" // Adjust size if needed
              sx={{
                  // Customize radio color if default primary isn't right
                  color: 'grey.600', // Color when unchecked
                 '&.Mui-checked': {
                   color: '#2c3e50', // Color when checked (matching Add button)
                 },
              }}
            />
          }
          label="Tất cả"
          sx={{ ml: 1 }} // Add some margin to the left if needed
        />
      </Box>
    </Box>
  );
}

export default ControlBarMui;