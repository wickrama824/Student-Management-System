import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios
            .get("http://localhost:8081/students")
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => console.log(error));
    };

    const addStudent = async () => {
        if (!name || !email || !course) {
            alert("Please fill all fields");
            return;
        }

        await axios.post("http://localhost:8081/students", {
            name,
            email,
            course,
        });

        setName("");
        setEmail("");
        setCourse("");

        fetchStudents();
    };

    const deleteStudent = async (id) => {
        await axios.delete(
            `http://localhost:8081/students/${id}`
        );

        fetchStudents();
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #667eea, #764ba2)",
                padding: "40px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "auto",
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "30px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#4f46e5",
                        marginBottom: "25px",
                    }}
                >
                    🎓 Student Management System
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "25px",
                    }}
                >
                    <div
                        style={{
                            background: "#3b82f6",
                            color: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        <h2>{students.length}</h2>
                        <p>Total Students</p>
                    </div>

                    <div
                        style={{
                            background: "#22c55e",
                            color: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        <h2>Active</h2>
                        <p>Student Records</p>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="🔍 Search Student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "25px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            flex: "1",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <input
                        type="email"
                        placeholder="Student Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            flex: "1",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        style={{
                            flex: "1",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <button
                        onClick={addStudent}
                        style={{
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Add Student
                    </button>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                    <tr
                        style={{
                            background: "#4f46e5",
                            color: "white",
                        }}
                    >
                        <th style={{ padding: "15px" }}>ID</th>
                        <th style={{ padding: "15px" }}>Name</th>
                        <th style={{ padding: "15px" }}>Email</th>
                        <th style={{ padding: "15px" }}>Course</th>
                        <th style={{ padding: "15px" }}>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {students
                        .filter((student) =>
                            student.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((student) => (
                            <tr
                                key={student.id}
                                style={{
                                    textAlign: "center",
                                    borderBottom:
                                        "1px solid #e5e7eb",
                                }}
                            >
                                <td style={{ padding: "12px" }}>
                                    {student.id}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {student.name}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {student.email}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    {student.course}
                                </td>

                                <td style={{ padding: "12px" }}>
                                    <button
                                        style={{
                                            background: "#22c55e",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 15px",
                                            borderRadius: "8px",
                                            marginRight: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteStudent(student.id)
                                        }
                                        style={{
                                            background: "#ef4444",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 15px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                            color: "gray",
                        }}
                    >
                        No Students Found
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;