
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";

function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function About() {
  return <h2>About Our Student Portal</h2>;
}

// Parent route for Students
function StudentsLayout() {
  return (
    <div>
      <h2>Students Page</h2>
      <Outlet />
    </div>
  );
}

// Students list
function Students() {
  const students = [
    { id: 1, name: "Ananya" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Priya" }
  ];

  return (
    <div>
      <h3>Student List</h3>

      {students.map((student) => (
        <p key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.name}
          </Link>
        </p>
      ))}
    </div>
  );
}

// Dynamic route using useParams
function StudentDetails() {
  const { id } = useParams();

  const students = {
    1: { name: "Ananya", course: "CSE" },
    2: { name: "Rahul", course: "ECE" },
    3: { name: "Priya", course: "IT" }
  };

  const student = students[id];

  if (!student) {
    return <h3>Student not found!</h3>;
  }

  return (
    <div>
      <h3>Student Details</h3>
      <p>ID: {id}</p>
      <p>Name: {student.name}</p>
      <p>Course: {student.course}</p>
      <Link to="/students">Back to Students</Link>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/about">About</Link>{" | "}
        <Link to="/students">Students</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/students" element={<StudentsLayout />}>
          <Route index element={<Students />} />
          <Route path=":id" element={<StudentDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
