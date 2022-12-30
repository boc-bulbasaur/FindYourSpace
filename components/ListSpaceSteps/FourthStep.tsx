import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';

function Fourth({ formData, setFormData }) {
  const [uploadData, setUploadData] = useState();
  const [local, setLocal] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setLocal(onLoadEvent.target.result);
      setUploadData(undefined);
    }
    console.log(formData)
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const fileData = new FormData();

    for ( const file of fileInput.files ) {
      fileData.append('file', file);
    }

    fileData.append('upload_preset', 'space-photos');

    const data = await fetch('https://api.cloudinary.com/v1_1/dahch7vyc/image/upload', {
      method: 'POST',
      body: fileData
    })
      .then(r => r.json())
      .catch(e => console.log(e));

    setFormData({
      ...formData,
      image_url: data.secure_url
    });
    setUploadData(data);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

      }}
    >
      <Box
        className='title-container'
        sx={{
          marginBottom: '5px'
        }}
      >
        <Typography
          className='text main-title'
          sx={{
            display: 'flex',
            flexGrow: '1',
            maxHeight: '30px',
            alignItems: 'center',
            fontSize: '16px'
          }}
        >
          Add some photos of your space
        </Typography>
        <Typography
          className='text secondary-title'
          sx={{
            display: 'flex',
            flexGrow: '1',
            maxHeight: '30px',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'gray'
          }}
        >
          You'll need at least one to continue. You can add more or modify them later.
        </Typography>
      </Box>
    <Box
      className='image-upload-container'
      sx={{
        margin: '10px 20px',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
        borderRadius: 2,
        minHeight: 150,
        maxWidth: 400
      }}
    >
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>

          {local && !uploadData && (
          <Image
            src={local}
            alt={"Space image"}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
          )}

          {!formData.image_id && local && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <p>Upload successful!</p>
          )}

          {formData.image_id && (
          <Image
            src={formData.image_url}
            alt={"Space image"}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
          )}
        </form>
    </Box>
  </Box>
  );
}
export default Fourth;