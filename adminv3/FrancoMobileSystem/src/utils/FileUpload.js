import { useDropzone } from 'react-dropzone';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';

function FileUpload({ onDrop }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div {...getRootProps({ className: 'dropzone-area py-6' })}>
        <input
          name="ServiceFile"
          id="ServiceFile"
          {...getInputProps({ multiple: false })}
        />
        <Flex justifyContent="center">
          <img src={cloudUpload} alt="" width={25} className="me-2" />
          <p className="fs-0 mb-0 text-700">Drop your file here</p>
        </Flex>
      </div>
      <div className="mt-3">
        {acceptedFiles.length > 0 && (
          <>
            <h6>File</h6>
            <ul>{files}</ul>
          </>
        )}
      </div>
    </>
  );
}

export default FileUpload;
