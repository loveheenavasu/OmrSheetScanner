import React from 'react'


export default function Questions({ questionDetails, tmQuestion }) {
    const arr = ["A", "B", "C", "D"]


    return (
        <>
        { tmQuestion.length>0 && <div className='form-container'>
     
           <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <h3>AssignmentId: {questionDetails.assignment_id}</h3>
         <h3>StudentId: {questionDetails.student_id}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridGap: "36px",
                }}>
                    {tmQuestion?.map((items) => (
                        <div key={items.TM_QN_Id} style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <label style={{ margin: "0px" }}>Question: {items.TM_QN_Id}</label>
                            <select className="select-scan" name="Questions">
                                {/* <option value={100}> {items.answer_select}</option> */}
                                {arr.map((item) => {
                                    if (item !== items.answer_select) {
                                        return (
                                            <option key={item} value={100}> {item}</option>
                                        )
                                    }
                                    return null;
                                })}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>}
        </>
    )
}
