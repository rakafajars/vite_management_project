import { Box, Container, Typography } from '@mui/material';

import RegisterLeftPanel from './RegisterLeftPanel';
import RegisterRightPanel from './RegisterRightPanel';

const Register = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8F9FA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Logo at top left */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 24, md: 40 },
          left: { xs: 24, md: 40 },
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: { xs: '18px', md: '22px' },
            fontWeight: 800,
            color: '#003544',
          }}
        >
          Architect CV
        </Typography>
      </Box>

      {/* Encrypted Draft Mode Badge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(248, 249, 250, 0.9)',
          border: '1px solid rgba(192, 200, 204, 0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          px: { xs: 2, md: 3 },
          py: { xs: 1, md: 1.5 },
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: '#003544',
            borderRadius: '50%',
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '10px', md: '12px' },
            fontWeight: 500,
            color: '#003544',
            letterSpacing: '1.2px',
          }}
        >
          ENCRYPTED DRAFT MODE
        </Typography>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 10, md: 8 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            width: '100%',
            gap: { xs: 4, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left Panel */}
          <RegisterLeftPanel />

          {/* Right Panel */}
          <RegisterRightPanel />
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
