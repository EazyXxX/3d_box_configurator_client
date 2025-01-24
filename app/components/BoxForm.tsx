import { useState } from "react";
import { TextField, Paper, Stack, Typography, Button } from "@mui/material";
import { useBoxStore } from "../store";

export function BoxForm() {
  const { dimensions, setDimensions } = useBoxStore();
  const [formValues, setFormValues] = useState({
    length: dimensions.length,
    width: dimensions.width,
    height: dimensions.height,
  });

  const handleCalculate = () => {
    const { length, width, height } = formValues;
    if (length > 0 && width > 0 && height > 0) {
      setDimensions({ length, width, height });
    }
  };

  return (
    <Paper elevation={3} className="p-6 h-fit">
      <Typography variant="h6" className="pb-4">
        Box Dimensions
      </Typography>
      <Stack spacing={3}>
        <TextField
          label="Length"
          type="number"
          value={formValues.length}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              length: parseFloat(e.target.value) || 0,
            })
          }
          inputProps={{ min: 0.1, step: 0.1 }}
        />
        <TextField
          label="Width"
          type="number"
          value={formValues.width}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              width: parseFloat(e.target.value) || 0,
            })
          }
          inputProps={{ min: 0.1, step: 0.1 }}
        />
        <TextField
          label="Height"
          type="number"
          value={formValues.height}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              height: parseFloat(e.target.value) || 0,
            })
          }
          inputProps={{ min: 0.1, step: 0.1 }}
        />
        <Button onClick={handleCalculate}>Calculate</Button>
      </Stack>
    </Paper>
  );
}
