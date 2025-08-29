import React from "react";
import type { Course } from "@features/courses/types";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { purchaseCourse } from "@features/courses/coursesSlice";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

type CourseCardProps = {
  course: Course;
  onSelect: (course: Course) => void;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const dispatch = useAppDispatch();
  const { purchasing, purchasedIds } = useAppSelector((state) => state.courses);

  const handlePurchase = () => {
    dispatch(purchaseCourse(course.id));
  };

  const isPurchased = purchasedIds.includes(course.id);
  const isLoading = purchasing[course.id];

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: '367px',
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
      raised={true}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          ${course.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => onSelect(course)}>
          Переглянути
        </Button>

        <Button
          variant="contained"
          color={isPurchased ? "success" : "secondary"}
          onClick={handlePurchase}
          disabled={isPurchased || isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isPurchased ? "Куплено" : "Купити"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
