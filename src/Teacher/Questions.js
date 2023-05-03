import React from 'react'


export default function Questions({ questionDetails, tmQuestion }) {
    const arr = ["A", "B", "C", "D"]

    return (

        <div className='form-container'>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <h3> AssignmentId : {questionDetails?.assignment_id}</h3>
                <h3> StudentId : {questionDetails?.student_id}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{
                    display: "flex",
                    // width: "444px",
                    flexDirection: "column",
                }}>
                    {tmQuestion?.map((items, i) => {
                        if (i % 2 == 0) {
                            return (
                                <>
                                    <label style={{ margin: "0px" }}>Questions :{items?.TM_QN_Id}</label>
                                    <select
                                        className="select-scan"
                                        name="Questions"
                                    // onChange={onChangeAssign}
                                    >
                                        <option value={100}> {items.answer_select}</option>
                                        {arr.map((item) => {
                                            if (item !== items.answer_select) {
                                                return (
                                                    <option value={100}> {item}</option>
                                                )
                                            }
                                        })}
                                    </select>{" "}
                                    <br /> <br />
                                </>
                            )
                        }
                    })}
                </div>
                <div style={{
                    display: "flex",
                    // width: "444px",
                    flexDirection: "column",
                }}>
                    {tmQuestion?.map((items, i) => {
                        if (i % 2 !== 0) {
                            return (
                                <>
                                    <label style={{ margin: "0px" }}>Questions :{items?.TM_QN_Id}</label>
                                    <select
                                        className="select-scan"
                                        name="Questions"
                                    >
                                        <option value={100}> {items.answer_select}</option>
                                        {arr.map((item) => {
                                            if (item !== items.answer_select) {
                                                return (

                                                    <option value={100}> {item}</option>
                                                )
                                            }
                                        })}
                                    </select>{" "}
                                    <br /> <br />
                                </>
                            )

                        }

                    })}

                </div>
            </div>


        </div>
    )
}
