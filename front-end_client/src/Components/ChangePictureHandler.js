import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function ChangePictureHandler(props) {
  const [file, setFile] = useState(null);
  const [zoom, setZoom] = useState(1.2);
  const [editor, setEditor] = useState(null);
  const imageRef = useRef();

  const handleChange = (event) => {
    const f = URL.createObjectURL(event.target.files[0]);
    console.log("file", f.name);
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const dataURItoBlob = (dataURI) => {
    const binary = atob(dataURI.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  };

  const handleUpload = (ev) => {
    // Split the filename to get the name and type

    if (editor) {
      const canvas = editor.getImage();
      const dataURL = canvas.toDataURL("image/jpeg");
      const blobData = dataURItoBlob(dataURL);
      const fileName = file.name;

      let fileType = file.type;
      console.log("Preparing the upload", fileName, fileType);

      fetch(
        `http://localhost:3001/getSignedUrlS3?filename=${fileName}&filetype=${fileType}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) return response.json();
          throw new Error("failed to get presigned url");
        })
        .then((data) => {
          console.log("data", data);
          if (data && data.success && data.data) {
            const postUrl = data.data.postUrl;
            const getUrl = data.data.getUrl;
            console.log("Recieved a signed request " + postUrl);

            // Put the fileType in the headers for the upload
            var options = {
              headers: {
                "Content-Type": fileType,
              },
            };
            axios
              .put(postUrl, blobData, options)
              .then((result) => {
                console.log("Response from s3", result);
                window.open(getUrl, "_blank");
              })
              .catch((error) => {
                alert("ERROR " + JSON.stringify(error));
              });
          } else {
          }
        })
        .catch((error) => {
          console.log("error getting restaurants", error);
        });
    }
  };

  const setEditorRef = (ed) => setEditor(ed);

  return (
    <div className='ChangePictureHandler'>
      <Container>
        <Row className='justify-content-md-center'>
          <Col sm={6}>
            <Form>
              <Form.Group>
                <Form.Label>Subir archivo de imagen</Form.Label>
                <Form.File onChange={handleChange} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {file && (
          <>
            <Row className='justify-content-md-center'>
              <Col sm={12} md={6}>
                <Row className='justify-content-md-center'>
                  <Col sm={12} md={8}>
                    <AvatarEditor
                      ref={setEditorRef}
                      image={file}
                      width={250}
                      height={250}
                      border={50}
                      color={[255, 255, 255, 0.6]} // RGBA
                      scale={zoom}
                      rotate={0}
                    />
                  </Col>
                </Row>
                <Row className='justify-content-md-center'>
                  <Col sm={12} md={8}>
                    <Form>
                      <Form.Group controlId='formBasicRange'>
                        <Form.Label>Range</Form.Label>
                        <Form.Control
                          type='range'
                          value={zoom}
                          min={1}
                          max={3}
                          step={0.1}
                          onChange={(evt) => setZoom(evt.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='justify-content-md-center'>
              <Col>
                <Button onClick={handleUpload}></Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
