import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FileUpload } from "../components";
import { toast } from "react-toastify";
import { handleCreateNewPin } from "../services/api.services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const initialFormData = {
  caption: "",
  imgUrl: "",
  lat: 0,
  lng: 0,
};

function PinCreationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const {
    auth: { user },
  } = useAuth();

  const navigate = useNavigate();

  const handleSetImgUrl = (imgUrl: string) =>
    setFormData({ ...formData, imgUrl });

  const handleSelectNewPhoto = () => setFormData({ ...formData, imgUrl: "" });

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onSuccess(position: any) {
      const { latitude: lat, longitude: lng } = position.coords;
      setFormData({ ...formData, lat, lng });
    }

    function onError() {
      toast.error("Please turn on location services.");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
      await handleCreateNewPin(
        formData.imgUrl,
        formData.lng,
        formData.lat,
        formData.caption
      );
      navigate(`/${user._id}/explore`);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  return (
    <Container as="main">
      <h1 className="text-center">Create a new pin!</h1>
      <Row>
        <Col
          as={Form}
          xs={12}
          md={{ span: 8, offset: 2 }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-2 d-flex flex-column">
            {formData.imgUrl ? (
              <>
                <Form.Label>Selected Photo</Form.Label>
                <Row className="align-items-center">
                  <Col
                    as="img"
                    xs={12}
                    md={8}
                    className="col-6 col-sm-12"
                    src={formData.imgUrl}
                    alt="candidate photo"
                  />
                  <Col
                    as={Button}
                    xs={{ span: 8, offset: 2 }}
                    md={{ span: 3, offset: 1 }}
                    onClick={handleSelectNewPhoto}
                  >
                    Select different photo
                  </Col>
                </Row>
              </>
            ) : (
              <FileUpload onSuccess={handleSetImgUrl} />
            )}
          </Form.Group>
          {formData.imgUrl && (
            <>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="caption">Caption</Form.Label>
                <Form.Control
                  as="textarea"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Button type="submit">Submit</Button>
              </Form.Group>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PinCreationPage;
