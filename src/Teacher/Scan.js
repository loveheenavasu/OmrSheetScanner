import React, { useState, useCallback } from "react";
import Sidebar from './Sidebar'
import Header from './Header'
import './css/Scan.css'
import Questions from './Questions'
import { useDropzone } from 'react-dropzone';
export default function Scan() {
  const [template, setTemplate] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false)

  const [tmQuestion, setTmQuestion] = useState([])
  const [questiondetails, setQuestiondetails] = useState({});

  const onChangeTemplate = (e) => {
    setTemplate(Number(e.target.value));
  }


  const onDrop = useCallback(async (acceptedFiles) => {
    if (!template) {
      alert('Please Select the template')
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setFile(reader.result);
    };

    const formData = new FormData();
    formData.append("template_image", acceptedFiles[0]);
    formData.append("token", 12345);
    formData.append("template_id", template);

    try {
      const response = await fetch("https://dev.zestgeek.com/OMRScanning/public/api/image-upload", {
        method: "POST",
        body: formData
      })
      const data = response.json()

      data.then((res) => {
        setTmQuestion(res?.data?.tm_question)
        setQuestiondetails(res?.data?.tm_schoolhomework)
        setShowForm(true)
      })

      setShowForm(true);
    } catch (error) {
      console.error(error);
    }
  }, [template]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop,
  });
  return (
    <div class="container-wrapper">
      <Header />
      <div id="wrapper" style={{
        // height: '100vh'
      }} >
        <div className="left-cls">
          <Sidebar />
        </div>
        <section
          className="custom-wrapper"
          style={{
            marginTop: "122px",
            display: "flex",
            flexDirection: "column",
            height: '100%'
          }}
        >
          <div style={{ marginLeft: "40px" }}>
            <b style={{ fontSize: "27px", textAlign: "center" }}>Scanner</b>
          </div>
          <div
            style={{
              display: "flex",
              gap: "40px",
              maxHeight: "190px",
              marginLeft: "20px",
              marginTop: "25px",
              flexWrap: 'wrap'
            }}
            className="right-cls"
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{ margin: "0px" }}> Assignment:</label>
              <select
                className="select-scan"
                name="assignment"

              >
                <option value={100}>test assignment-1 </option>
                <option value={101}>test assignment-2 </option>
                <option value={102}>test assignment-3 </option>
              </select>{" "}
              <br /> <br />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "0px" }}>Student:</label>
              <select
                className="select-scan"
                name="student"

              >
                <option value={200}>Student-1 </option>
                <option value={201}>Student-2 </option>
                <option value={202}>Student-3 </option>
              </select>{" "}
              <br /> <br />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "0px" }}>Template:</label>
              <select
                className="select-scan"
                name="template"
                onChange={onChangeTemplate}
              >
                {!template && <option >Select Template </option>}
                <option value={1}>Template-1 </option>
                <option value={2}>Template-2 </option>
              </select>
              <br /> <br />
            </div>
          </div>
          <div className="upload-section" >
            {!file && <div
              className={`file-uploader ${isDragActive ? 'drag-active' : ''}`}
              {...getRootProps()}>
              <input {...getInputProps({
                capture: 'environment',
              })} />
              <p>Click to scan a file</p>
            </div>}
            {file ? (
              <div className="img-container" >
                <img src={file} alt="Selected file" />
                <div
                  onClick={() => setFile(null)}
                  className="cross-image" >&times;</div>

              </div>
            ) : null
            }
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }} >
            {showForm && <Questions questionDetails={questiondetails} tmQuestion={tmQuestion} />}

          </div>

        </section>

      </div>

    </div>

  );
}
