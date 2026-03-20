import {
  AccountCircle,
  ColorLens,
  Notifications,
  Security,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import SidebarLayout from "../../layouts/SidebarLayout";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ paddingTop: 3 }}>{children}</Box>}
    </div>
  );
};

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <SidebarLayout pageTitle="Settings">
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "15px",
                minHeight: 64,
                transition: "all 0.3s ease",
              },
              "& .Mui-selected": {
                color: "#667eea !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#667eea",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab icon={<AccountCircle />} iconPosition="start" label="Profile" />
            <Tab
              icon={<Notifications />}
              iconPosition="start"
              label="Notifications"
            />
            <Tab icon={<ColorLens />} iconPosition="start" label="Appearance" />
            <Tab icon={<Security />} iconPosition="start" label="Security" />
          </Tabs>
        </Box>

        <CardContent sx={{ padding: 4 }}>
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Profile Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                  Update your account profile information and email address.
                </Typography>
                <Stack spacing={2.5}>
                  <MuiTextField
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    fullWidth
                    variant="outlined"
                  />
                  <MuiTextField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                  <MuiTextField
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
              </Box>
              <Divider />
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Notification Preferences
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                  Manage how you receive notifications and updates.
                </Typography>
                <Stack spacing={2}>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "12px", padding: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Email Notifications
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive email updates about your projects
                        </Typography>
                      </Box>
                      <Switch defaultChecked />
                    </Stack>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "12px", padding: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Push Notifications
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Get push notifications on your device
                        </Typography>
                      </Box>
                      <Switch defaultChecked />
                    </Stack>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "12px", padding: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Weekly Reports
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive weekly summary of your activities
                        </Typography>
                      </Box>
                      <Switch />
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Appearance Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                  Customize how the application looks and feels.
                </Typography>
                <Stack spacing={2}>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "12px", padding: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Dark Mode
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Enable dark theme across the application
                        </Typography>
                      </Box>
                      <Switch />
                    </Stack>
                  </Card>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "12px", padding: 2 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Compact View
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Use a more compact layout to see more content
                        </Typography>
                      </Box>
                      <Switch />
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Security Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                  Manage your account security and password.
                </Typography>
                <Stack spacing={2.5}>
                  <MuiTextField
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    fullWidth
                    variant="outlined"
                  />
                  <MuiTextField
                    name="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    fullWidth
                    variant="outlined"
                  />
                  <MuiTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                    fullWidth
                    variant="outlined"
                  />
                </Stack>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, marginBottom: 2 }}>
                  Two-Factor Authentication
                </Typography>
                <Card
                  variant="outlined"
                  sx={{ borderRadius: "12px", padding: 2 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Add an extra layer of security to your account
                      </Typography>
                    </Box>
                    <Switch />
                  </Stack>
                </Card>
              </Box>
              <Divider />
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </Stack>
          </TabPanel>
        </CardContent>
      </Card>
    </SidebarLayout>
  );
};

export default Settings;
