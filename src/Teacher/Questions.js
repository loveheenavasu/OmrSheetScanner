import React  from "react";

export default function Questions({
  questionDetails,
  tmQuestion,
  setTmQuestion,
}) {
  const arr = ["A", "B", "C", "D"];


  const handleOptionChange = (e, quetionId) => {
    const newoption = e.target.value;
    setTmQuestion((tmquestion) =>
      tmquestion.map((prevque) => {
        if (prevque.TM_QN_Id === quetionId) {
          return { ...prevque, answer_select: newoption };
        } else {
          return prevque;
        }
      })
    );
  };


  const submitQuestions = () => {
    console.log(tmQuestion, "tmQuestions");
  };

  return (
    <>
      {tmQuestion.length > 0 && (
        <div className="form-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <h3 className="que-heading assigmentHeading">
              Assignment Id: {questionDetails.assignment_id}
            </h3>
            <h3 className="que-heading assigmentHeading">
              Student Id: {questionDetails.student_id}
            </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: "36px",
              }}
            >
              {tmQuestion?.map((items) => (
                <div
                  key={items.TM_QN_Id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={{ margin: "0px" }} className="assigmentHeading">
                    Question: {items.TM_QN_Id}
                  </label>
                  <select
                    className="select-scan select-scan-question"
                    name="Questions"
                    onChange={(event) =>
                      handleOptionChange(event, items.TM_QN_Id)
                    }
                  >
                    <option value={items.answer_select}>
                      {" "}
                      {items.answer_select}
                    </option>
                    {arr.map((item) => {
                      if (item !== items.answer_select) {
                        return (
                          <option key={item} value={item}>
                            {" "}
                            {item}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tmQuestion.length > 0 && (
        <div className="submit">
          <button onClick={submitQuestions} >Submit</button>
        </div>
      )}
    </>
  );
}
