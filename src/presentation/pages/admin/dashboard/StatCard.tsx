import React from "react";
import { Paper, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        borderLeft: `4px solid ${color}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: color,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;
