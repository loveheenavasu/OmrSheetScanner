import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./css/Scan.css";
import Questions from "./Questions";
import { useDropzone } from "react-dropzone";
import "./Pintura/pintura.css";
import { openDefaultEditor } from "./Pintura/pintura";
// import { Puff } from 'react-loader-spinner';
import Spinner from "../Spinner";
import "../Spinner.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Scan() {
  const [template, setTemplate] = useState(null);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [tmQuestion, setTmQuestion] = useState([]);
  const [questiondetails, setQuestiondetails] = useState({});
  const [loading, setLoading] = useState(false);
  const onChangeTemplate = (e) => {
    setTemplate(Number(e.target.value));
  };
  const editImage = (image, done) => {
    const imageFile = image.pintura ? image.pintura.file : image;
    const imageState = image.pintura ? image.pintura.data : {};
    const editor = openDefaultEditor({
      src: imageFile,
      imageState,
    });
    editor.on("close", (data) => {});
    editor.on("process", ({ dest, imageState }) => {
      Object.assign(dest, {
        pintura: { file: imageFile, data: imageState },
      });
      done(dest);
    });
  };
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!template) {
        alert("Please Select the template");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        setFile(reader.result);
      };
      const formData = new FormData();
      formData.append("template_image", acceptedFiles[0]);
      formData.append("token", "a99442d2a736365f5fe637e299b0e339");
      formData.append("template_id", template);

      try {
        setLoading(true);
        const response = await fetch(
          "https://dev.zestgeek.com/OMRScanning/public/api/image-upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = response.json();
        data.then((res) => {
          if (res?.data) setShowForm(true);
          setTmQuestion(res?.data?.tm_question);
          setQuestiondetails(res?.data?.tm_schoolhomework);
          setLoading(false);
        });
        // setShowForm(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    },
    [template]
  );

  const postData = async (pic) => {
    // const formData = new FormData();
    // formData.append("template_image", pic);
    // formData.append("token", 'a99442d2a736365f5fe637e299b0e339');
    // formData.append("template_id", template);
    // try {
    //   setLoading(true);
    //   const response = await fetch("https://dev.zestgeek.com/OMRScanning/public/api/image-upload", {
    //     method: "POST",
    //     body: formData
    //   })
    //   const data = response.json()
    //   data.then((res) => {
    //     if (res?.data)
    //       setShowForm(true)
    //     setTmQuestion(res?.data?.tm_question)
    //     setQuestiondetails(res?.data?.tm_schoolhomework)
    //     setLoading(false);
    //   })
    //   // setShowForm(true);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop,
  });
  const handleClear = () => {
    setFile(null);
    setQuestiondetails({});
    setTmQuestion([]);
  };

  return (
    <div class="container-wrapper">
      <Header />
      <div
        id="wrapper"
        style={
          {
            // height: '100vh'
          }
        }
      >
        <div className="left-cls">
          <Sidebar />
        </div>
        <section
          className="custom-wrapper"
          style={{
            // marginTop: "122px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="scanner">
            <b style={{ fontSize: "27px", textAlign: "center" }}>Scanner</b>
          </div>
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginLeft: "20px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
            className="right-cls"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="Assignment"
            >
              <label style={{ margin: "0px" }}> Assignment:</label>
              <select className="select-scan" name="assignment">
                <option value={100}>test assignment-1 </option>
                <option value={101}>test assignment-2 </option>
                <option value={102}>test assignment-3 </option>
              </select>{" "}
              <br /> <br />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "0px" }}>Student:</label>
              <select className="select-scan" name="student">
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
                {!template && <option>Select Template </option>}
                <option value={1}>Template-1 </option>
                <option value={2}>Template-2 </option>
              </select>
              <br /> <br />
            </div>
          </div>
          {loading && (
            <div className="pos-center">
              <Spinner />
            </div>
          )}
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="EditMain"
          >
            {file ? (
              <div className="img-container">
                {/* <div style={{display:"flex",justifyContent:"center"}}>
                 <button style={{ textAlign: "right", display: "block", margin: "16px" }}
                className='Edit'
                  onClick={() =>
                    editImage(file, (output) => {
                      postData(output)
                      console.log("No Taskn done", output)
                      setFile(URL.createObjectURL(output))
                    })
                  }
                >
                  Edit
                </button> 
               
                </div> */}
                <button onClick={handleClear} className="clearbutton">X</button>
                <img src={file} alt="Selected file" className="EditImg" />
              </div>
            ) : null}
          </div>
          <div className="upload-section">
            {/* <div><Puff type="ThreeDots" color="white" height={80} width={80} /></div> */}
            {!file && (
              <div
                className={`file-uploader ${isDragActive ? "drag-active" : ""}`}
                {...getRootProps()}
              >
                {/* <Puff type="ThreeDots" color="#00BFFF" height={80} width={80} /> */}
                <input {...getInputProps()} />
                <p>Click to scan a file</p>
              </div>
            )}
            {/* {
              file ? <div className="img-container" >
                <img src={file} alt="Selected file" /> */}
            {/* <button style={{ textAlign: "right", display: "block", margin: "16px" }}
                  onClick={() =>
                    editImage(file, (output) => {
                      postData(output)
                      console.log("No Taskn done", output)
                      setFile(URL.createObjectURL(output))
                    })
                  }
                >
                  Edit
                </button> */}
            {/* </div> : null
            } */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="Questions"
          >
            {showForm && tmQuestion && questiondetails&& (
              <Questions
                questionDetails={questiondetails}
                tmQuestion={tmQuestion}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
