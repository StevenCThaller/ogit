import { ChangeEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleUploadImage } from "../../services/api.services";

type FileUploadProps = {
  onSuccess: (imgUrl: string) => void;
};

function FileUpload({ onSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await handleUploadImage(file);
      setUploadStatus("File uploaded successfully!");
      if (response && response.imgUrl && typeof response.imgUrl === "string")
        onSuccess(response.imgUrl);
    } catch (error) {
      setUploadStatus("Error uploading image");
      console.error(error);
    }
  };
  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor="image">Select an Image</Form.Label>
      <Row className="p-0">
        <Col xs={12} md={6}>
          <Form.Control type="file" onChange={handleFileChange} />
        </Col>
        <Col
          as={Button}
          xs={12}
          md={{ span: 4, offset: 2 }}
          onClick={handleFileUpload}
        >
          Upload
        </Col>
      </Row>
      {uploadStatus && <span>{uploadStatus}</span>}
    </Form.Group>
  );
}

export default FileUpload;
