import { createTheme, type MantineColorsTuple } from "@mantine/core";

const primary: MantineColorsTuple = [
  "#e1f8ff",
  "#cbedff",
  "#9ad7ff",
  "#64c1ff",
  "#3aaefe",
  "#20a2fe",
  "#099cff",
  "#0088e4",
  "#0079cd",
  "#0068b6",
];

export const theme = createTheme({
  colors: {
    primary,
  },
  primaryColor: "primary",
});
