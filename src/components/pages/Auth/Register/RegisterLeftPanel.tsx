import { Box, Typography } from '@mui/material';

import FeatureItem from './FeatureItem';

const RegisterLeftPanel = () => {
  return (
    <Box
      sx={{
        flex: { xs: '1', lg: '1 1 45%' },
        maxWidth: { lg: '600px' },
        width: '100%',
      }}
    >
      {/* Main Heading */}
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: { xs: '36px', sm: '48px', md: '56px', lg: '60px' },
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#003544',
          mb: { xs: 2, md: 3 },
        }}
      >
        Build your legacy.
      </Typography>

      {/* Subheading */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: { xs: '16px', md: '18px' },
          fontWeight: 400,
          lineHeight: 1.6,
          color: '#4C616C',
          mb: { xs: 4, md: 5 },
          maxWidth: '540px',
        }}
      >
        We treat your career history not as data points, but as a curated
        story. Step into an editorial experience designed for modern
        professionals.
      </Typography>

      {/* Features */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2.5, md: 3 },
        }}
      >
        <FeatureItem
          icon="A"
          title="Architectural Precision"
          description="Clean, asymmetrical layouts that command attention."
        />
        <FeatureItem
          icon="✨"
          title="Live Editorial View"
          description="See your profile transform in real-time as you draft."
        />
      </Box>
    </Box>
  );
};

export default RegisterLeftPanel;
