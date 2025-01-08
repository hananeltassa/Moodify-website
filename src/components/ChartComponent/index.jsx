import React from "react";
import { PieChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

const ChartComponent = ({ data = [], title }) => {
  if (!Array.isArray(data)) {
    console.error("Invalid data provided to ChartComponent. Expected an array.");
    data = [];
  }

  return (
    <Card
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          {title}
        </Typography>

        {/* Centered Pie Chart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300, // Ensure enough height to center
          }}
        >
          {data.length > 0 ? (
            <PieChart series={[{ data }]} width={300} height={300} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          )}
        </Box>

        {/* Custom Legend */}
        {data.length > 0 && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={3}
          >
            {data.map((item) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    mr: 1,
                  }}
                ></Box>
                <Typography variant="body2">{item.id}</Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
