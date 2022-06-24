import React from 'react'
import { Controller } from "react-hook-form"; 
import { Avatar } from '@mui/material';
import { FileCopy, PictureAsPdf } from '@material-ui/icons';

export const FileAvatar = ({ name, control,  file }) => {
 
    const avatar = () => {
        switch(file.filetype){
            case "image/png":
                 return  <Avatar alt="Travis Howard" src={"http://127.0.0.1:8080/" + file.path + file.filename } />
             case "application/pdf":
                 return <Avatar><PictureAsPdf /></Avatar> 
             default:
                 return <Avatar><FileCopy /></Avatar> 
         }
      }
      return (
        <avatar/>
      )
};