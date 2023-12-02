import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function ImageUploadButton(props) {
  const onChooseImage = (event) => {
    const file = event.target.files[0];

    if (file && file.type.match('image.*')) {
        const reader = new FileReader();

        reader.onload = (readEvent) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSideLength = 300;

                if (image.width > image.height) {
                    canvas.width = maxSideLength;
                    canvas.height = (image.height / image.width) * maxSideLength;
                } else {
                    canvas.height = maxSideLength;
                    canvas.width = (image.width / image.height) * maxSideLength;
                }

                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                const dataURI = canvas.toDataURL('image/jpeg');

                // Update your formData here
                props.onChooseImage(dataURI);
            };

            image.src = readEvent.target.result;
        };

        reader.readAsDataURL(file);
    }
};


  return (
    <React.Fragment>
      {props.image && (
        <Alert severity="success">
          <AlertTitle>File attached successfully!</AlertTitle>
          <img
            src={props.image}  // Replace with your state variable holding the data URI
            alt="Preview"
            style={{ height: '24px', marginRight: '10px' }}
          />
        </Alert>
      )}
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload image
        <input
          type="file"
          onChange={onChooseImage}
          accept="image/jpeg, image/png"
          style={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: 1,
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: 1,
          }}
        />
      </Button>
    </React.Fragment>

  );
}
