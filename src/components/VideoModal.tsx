import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { closeVideo } from "@features/video/videoSlice";

const VideoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const videoUrl = useAppSelector(state => state.video.currentUrl);

  const handleClose = () => {
    dispatch(closeVideo());
  };

  if (!videoUrl) return null;

  return (
    <Dialog
      open={Boolean(videoUrl)}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "#1c1c1c",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, color: "white" }}>
        <Typography variant="h6">Відео курс</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, backgroundColor: "black" }}>
        <Box
          component="video"
          src={videoUrl}
          controls
          autoPlay
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "400px", md: "500px", lg: "600px" },
            display: "block",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
