import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { loadCourses, resetPurchaseError } from "@features/courses/coursesSlice";
import CourseList from "@components/CourseList";
import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Alert,
  Container,
  Snackbar,
} from "@mui/material";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, purchaseError, purchasedIds } = useAppSelector(
    (state) => state.courses
  );
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);

  useEffect(() => {
    if (purchasedIds.length > 0) {
      const lastPurchasedId = purchasedIds[purchasedIds.length - 1];
      const purchasedCourse = items.find(course => course.id === lastPurchasedId);
      if (purchasedCourse) {
        setSuccessMsg(`Курс "${purchasedCourse.title}" куплено успішно!`);
      }
    }
  }, [purchasedIds, items]);

  const handleCloseSnackbar = () => {
    setSuccessMsg(null);
    dispatch(resetPurchaseError());
  };

  const paginatedCourses = items.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(items.length / pageSize);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Список курсів
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && <CourseList courses={paginatedCourses} />}

      {!loading && !error && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      <Snackbar
        open={Boolean(successMsg)}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>

      {purchaseError && (
        <Snackbar
          open={Boolean(purchaseError)}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            {purchaseError}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default HomePage;
