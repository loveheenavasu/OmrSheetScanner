import React, { useState, useCallback, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./css/Scan.css";
import Questions from "./Questions";
import { useDropzone } from "react-dropzone";
import Spinner from "../Spinner";
import "../Spinner.css";

const assignment1QueID = [
  12311, 12412, 12513, 12614, 12715, 13116, 132, 133, 134, 220, 221, 222, 223,
  224, 225,
];
const assignment2QueID = [
  323, 324, 325, 326, 327, 431, 432, 433, 434, 520, 521, 522, 523, 524, 525,
];
const assignment3QueID = [
  623, 624, 625, 626, 627, 731, 732, 733, 734, 820, 921, 922, 923, 924, 925,
];

export default function Scan() {
  const [file, setFile] = useState(null);
  const [tmQuestion, setTmQuestion] = useState([]);
  const [questiondetails, setQuestiondetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [respons, setRespons] = useState(null);
  const [template, setTemplate] = useState(null);
  const [studentId, setStudentId] = useState(200);
  const [assignmentId, setAssignmentId] = useState(100);
  let isIphone = false

  const onChangeTemplate = (e) => {
    setTemplate(Number(e.target.value));
  };
  const onChangeStudent = (e) => {
    setStudentId(e.target.value);
  };

  const handleAssigmentChange = (e) => {
    setAssignmentId(Number(e.target.value));
  };

  // const editImage = (image, done) => {
  //   const imageFile = image.pintura ? image.pintura.file : image;
  //   const imageState = image.pintura ? image.pintura.data : {};
  //   const editor = openDefaultEditor({
  //     src: imageFile,
  //     imageState,
  //   });
  //   editor.on("close", (data) => {});
  //   editor.on("process", ({ dest, imageState }) => {
  //     Object.assign(dest, {
  //       pintura: { file: imageFile, data: imageState },
  //     });
  //     done(dest);
  //   });
  // };
  const resultDivRef = useRef(null);

  console.log(navigator.userAgent, "useragent")

  useEffect(() => {
    // Scroll to the result div
    if (resultDivRef.current && respons?.status === 200) {
      const headerHeight = 90; // Height of the sticky header in pixels
      const offset = resultDivRef.current.offsetTop - headerHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, [respons]);


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
      formData.append("student_id", studentId);
      formData.append("assignment_id", assignmentId);
      if (assignmentId === 100) {
        formData.append("assignmentQueIDs", assignment1QueID.join(","));
      } else if (assignmentId === 101) {
        formData.append("assignmentQueIDs", assignment2QueID.join(","));
      } else {
        formData.append("assignmentQueIDs", assignment3QueID.join(","));
      }

      if (/iPhone/i.test(navigator.userAgent) && window?.innerWidth <= 768) {
        isIphone = true
      }
      formData.append("isPhone", isIphone);

      try {
        setLoading(true);
        const response = await fetch(
          "https://dev.zestgeek.com/OMRScanning/public/api/image-upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const blob = new Blob([acceptedFiles[0]], {
          type: acceptedFiles[0].type,
        });
        const url = URL.createObjectURL(blob);
        setFile(url);
        setTmQuestion(data?.data?.tm_question);
        setQuestiondetails(data?.data?.tm_schoolhomework);
        setLoading(false);
        setRespons(data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [template, studentId, assignmentId]
  );
  const handleSubmit = async () => {
    if (respons?.status === 200) {
      // Call the second API to save the result JSON
      const updatedResponse = {
        type: respons?.type,
        data: {
          tm_schoolhomework: respons?.data?.tm_schoolhomework,
          tmQuestion,
        },
        tm_image: respons?.tm_image,
      };

      await fetch(
        "https://dev-app.tabbiemath.com/tabbiedevapi/public/api/scanapistore",
        {
          method: "POST",
          body: JSON.stringify(updatedResponse),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { assignment_id, student_id, template_id } =
        respons?.data?.tm_schoolhomework;

      // Redirect to the website with the assignment_id, student_id, and template_id values
      window.location.href = `https://dev-app.tabbiemath.com/scnapi/testjson.php?assignment_id=${assignment_id}&student_id=${student_id}&template_id=${template_id}`;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    window?.innerWidth > 768
      ? {
          multiple: false,
          onDrop,
          accept: {
            "image/png": [".png", ".jpg", ".jpeg", ".svg"],
          },
        }
      : {
          multiple: false,
          onDrop,
        }
  );
  const handleClear = () => {
    setFile(null);
    setQuestiondetails({});
    setTmQuestion([]);
    setRespons(null);
  };

  return (
    <div className="container-wrapper">
      <Header />
      <div id="wrapper">
        <div className="left-cls">
          <Sidebar />
        </div>
        <section
          className="custom-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="scanner">
            <b
              style={{ fontSize: "27px", textAlign: "center" }}
              className="assigmentHeading"
            >
              Scanner
            </b>
          </div>
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: " 25px 0 25px 0",
            }}
            className="right-cls"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              className="Assignment  Assignment-2"
            >
              <label style={{ margin: "0px" }} className="assigmentHeading">
                {" "}
                Assignment:
              </label>
              <select
                className="select-scan select-scan-2"
                name="assignment"
                onChange={handleAssigmentChange}
              >
                <option value={100}>test assignment-1 </option>
                <option value={101}>test assignment-2 </option>
                <option value={102}>test assignment-3 </option>
              </select>{" "}
              <br />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "0px" }} className="assigmentHeading">
                Student:
              </label>
              <select
                className="select-scan select-scan-2"
                name="student"
                onChange={onChangeStudent}
              >
                <option value={200}>Student-1 </option>
                <option value={201}>Student-2 </option>
                <option value={202}>Student-3 </option>
              </select>{" "}
              <br />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ margin: "0px" }} className="assigmentHeading">
                Template:
              </label>
              <select
                className="select-scan select-scan-2"
                name="template"
                onChange={onChangeTemplate}
              >
                {!template && <option>Select Template </option>}
                <option value={1}>Template-1 </option>
                <option value={2}>Template-2 </option>
              </select>
            </div>
          </div>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="EditMain"
          >
            {file ? (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="iphonestyle"
              >
                <div className={`img-container   img-container2}`}>
                  <button
                    onClick={handleClear}
                    className={`bg-primary clearbutton ${
                      loading && "clearbutton2"
                    }`}
                  >
                    X
                  </button>
                  <img
                    src={file}
                    alt="Selected file"
                    className={`EditImg ${loading && "blurimg"}
                       Editimg2
                    `}
                  />
                </div>
                {loading && (
                  <div
                    className="pos-center"
                    style={{ position: "absolute", zIndex: 1 }}
                  >
                    <Spinner />
                  </div>
                )}
              </div>
            ) : null}
          </div>
      
          {!file && (
            <div
              style={{
                display: " flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "0 70px",
              }}
              className="instructiondiv"
            >
              <div className="instrunctionImg">
                <img src="./sample.jpg" height={170} alt="" />
                <p className="text-primary instruction">
                  <span style={{ fontWeight: 700 }}>Instructions : </span>
                  Position the phone correctly straight <br />
                  and around the dotted lines as shown, and take the picture.
                </p>
              </div>

              <div className="upload-section">
                {!file && (
                  <>
                    <div
                      className={`file-uploader ${
                        isDragActive ? "drag-active" : ""
                      }`}
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps({
                          capture: "environment",
                        })}
                      />
                      <p>Click to scan a file</p>
                    </div>
                  </>
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
            </div>
          )}

          <div
            ref={resultDivRef}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="Questions"
          >
            {tmQuestion && questiondetails && (
              <>
                <Questions
                  questionDetails={questiondetails}
                  tmQuestion={tmQuestion}
                  setTmQuestion={setTmQuestion}
                  resultDivRef={resultDivRef}
                  template={template}
                />
              </>
            )}
            {tmQuestion?.length > 0 && (
              <div className="submit">
                <button onClick={handleSubmit} className="bg-primary">
                  Submit
                </button>
              </div>
            )}
            {respons?.status === 500 && (
              <p style={{ color: "red" }} className="errormsg">
                {respons?.msg}
              </p>
            )}
          
          </div>
        </section>
      </div>
    </div>
  );
}
