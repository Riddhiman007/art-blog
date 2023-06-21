import React from "react";

// components
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Typography,
} from "../components";

/**
 * An interface of the common elemnts of a course
 */
interface ICourse {
  background: string;
  mainClass?: string;
  title: string;
  description: string;
  textColor?: string;
}
/**
 *
 * @returns A page for displaying list of courses
 */
export default function Courses() {
  const courses: Array<ICourse> = [
    {
      title: "Water Colour",
      description: "The latest watercolor course for beginners",
      background: "bg-red-500",
      textColor: "text-red-50",
    },
    {
      title: "Oil Painting",
      description:
        "The new course available for oil painting. Contains all the latest tips and techniques to start oil painting. We will give you every possible guidance.",
      background: "bg-emerald-600",
      textColor: "text-emerald-50",
    },
  ];
  return (
    <Container>
      <CssBaseline />
      <Box className="mt-10 grid grid-cols-1 justify-center gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <>
            <Card className={`${course.background} w-fit items-center`}>
              <CardActionArea className="h-full px-4 py-7">
                <CardContent className="flex flex-col gap-7">
                  <Typography
                    variant="h3"
                    className={`items-center text-center text-3xl font-bold ${course.textColor} lg:text-5xl`}
                  >
                    {course.title}
                  </Typography>
                  <Typography variant="body2" className={`${course.textColor} text-base`}>
                    {course.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </Box>
    </Container>
  );
}
