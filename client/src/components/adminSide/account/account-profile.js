import axios from "axios";
import React, {useState} from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Uploady from "@rpldy/uploady";
import { useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

const DivUploadButton = asUploadButton((props) => {
  useItemFinishListener((item) => {
    props.handleCallback(item.uploadResponse.data.fileName);  
  });

  return <Button
  color="primary"
  fullWidth
  variant="text"
  {...props}
>
  Télécharger une image
</Button>
});

export const AccountProfile = (props) => {
  
  return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={"/uploads/files/"+props.user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {props.user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {props.user.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {props.user.pays}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Uploady
        destination={{ url: "/upload" }}>
        <DivUploadButton/>
      </Uploady>
    </CardActions>
  </Card>
  );
};
