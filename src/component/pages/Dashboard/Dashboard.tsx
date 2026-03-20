import {
  Assignment,
  CheckCircle,
  FolderOpen,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import SidebarLayout from "../../layouts/SidebarLayout";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 1 }}>
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: `${color}20`,
                borderRadius: "12px",
                padding: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          </Stack>
          <Chip
            label={change}
            size="small"
            sx={{
              backgroundColor: change.includes("+")
                ? "rgba(76, 175, 80, 0.1)"
                : "rgba(244, 67, 54, 0.1)",
              color: change.includes("+") ? "#4caf50" : "#f44336",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12% from last month",
      icon: <FolderOpen sx={{ color: "#667eea", fontSize: 28 }} />,
      color: "#667eea",
    },
    {
      title: "Active Tasks",
      value: "156",
      change: "+8% from last month",
      icon: <Assignment sx={{ color: "#f093fb", fontSize: 28 }} />,
      color: "#f093fb",
    },
    {
      title: "Completed",
      value: "89",
      change: "+23% from last month",
      icon: <CheckCircle sx={{ color: "#4facfe", fontSize: 28 }} />,
      color: "#4facfe",
    },
    {
      title: "Productivity",
      value: "94%",
      change: "+5% from last month",
      icon: <TrendingUp sx={{ color: "#43e97b", fontSize: 28 }} />,
      color: "#43e97b",
    },
  ];

  const recentProjects = [
    {
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      color: "#667eea",
    },
    { name: "Mobile App", status: "Review", progress: 90, color: "#f093fb" },
    {
      name: "API Development",
      status: "In Progress",
      progress: 45,
      color: "#4facfe",
    },
    {
      name: "Database Migration",
      status: "Planning",
      progress: 20,
      color: "#43e97b",
    },
  ];

  return (
    <SidebarLayout pageTitle="Dashboard">
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
            marginTop: 3,
          }}
        >
          <Box>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginBottom: 3 }}
                >
                  Recent Projects
                </Typography>
                <Stack spacing={2}>
                  {recentProjects.map((project, index) => (
                    <Box key={index}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ marginBottom: 1 }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {project.name}
                        </Typography>
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            backgroundColor: `${project.color}20`,
                            color: project.color,
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: `${project.color}20`,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: project.color,
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ marginTop: 0.5, display: "block" }}
                      >
                        {project.progress}% Complete
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <CardContent sx={{ padding: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, marginBottom: 2 }}
                >
                  Team Activity
                </Typography>
                <List sx={{ padding: 0 }}>
                  {[
                    {
                      name: "Raka Fajar",
                      action: "completed task",
                      time: "2 mins ago",
                    },
                    {
                      name: "John Doe",
                      action: "added comment",
                      time: "15 mins ago",
                    },
                    {
                      name: "Jane Smith",
                      action: "updated project",
                      time: "1 hour ago",
                    },
                  ].map((activity, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        padding: "12px 0",
                        borderBottom:
                          index < 2 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            backgroundColor: `hsl(${index * 120}, 70%, 60%)`,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {activity.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="span"
                            >
                              {activity.action}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="span"
                              sx={{ display: "block" }}
                            >
                              {activity.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default Dashboard;
