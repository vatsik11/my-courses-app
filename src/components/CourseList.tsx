import React from "react";
import type { Course } from "@features/courses/types";
import CourseCard from "./CourseCard";
import VideoModal from "./VideoModal";
import { Grid } from "@mui/material";
import { useAppDispatch } from "@app/store/hooks";
import { openVideo } from "@features/video/videoSlice";

type CourseListProps = {
  courses: Course[];
};

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const dispatch = useAppDispatch();

  const handleSelect = (course: Course) => {
    dispatch(
      openVideo({ courseId: course.id, url: course.videoUrl })
    );
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 12, justifyContent: "center" }}>
        {courses.map((course) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={course.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CourseCard course={course} onSelect={handleSelect} />
          </Grid>
        ))}
      </Grid>

      <VideoModal />
    </>
  );
};

export default CourseList;
