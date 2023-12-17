// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Card, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

import { FileText, X, DownloadCloud } from 'react-feather'
import { showNotifications } from "@components/Notifications";

const FileUploaderMultiple = (props) => {
  const uuid = props.uuid;
  const files = props.files;
  const setFiles = props.setFiles;
  const filesName = props.filesName;
  const setFilesName = props.setFilesName;
  const maxSize = 10 * 1024 * 1024; //10MB
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx','csv'];
  const maxFileCount = 5;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async acceptedFiles => {
      let validFiles = [];
      let invalidFiles = [];

      if (acceptedFiles.length + files.length > maxFileCount) {
        console.error('File count exceeds the limit:', acceptedFiles);
        showNotifications({
          type: "error",
          title: 'File count exceeds the limit',
          message: 'File count exceeds the limit: ', acceptedFiles,
        });
        return;
      }

      for (const file of acceptedFiles) {
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (file.size <= maxSize && allowedExtensions.includes(fileExtension)) {
          validFiles.push(Object.assign(file));
        } else {
          invalidFiles.push(file);
        }
      }

      if (invalidFiles.length > 0) {
        console.error('Invalid files:', invalidFiles);
        showNotifications({
          type: "error",
          title: 'Invalid files',
          message: 'Invalid files:', invalidFiles,
        });
      }
      else {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
        validFiles.forEach((file) => {
          setFilesName(prevFiles => [...prevFiles, file.name]);
        });
                
        validFiles.forEach((file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('http://127.0.1.1:8080/api/v1/article/upload-attachements/'+uuid, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Upload success:', data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            showNotifications({
              type: "error",
              title: "Oops! Something went wrong!",
              message: `File Upload ERROR`,
            });
          });
        });
      }
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Drop Files here or click to upload</h5>
            <p className='text-secondary'>
              Drop files here or click{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                browse
              </a>{' '}
              thorough your machine
            </p>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Remove All
              </Button>
              <Button color='primary'>Upload Files</Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  )
}

export default FileUploaderMultiple
