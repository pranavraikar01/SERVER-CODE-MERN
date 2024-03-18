// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Retrieve the token from localStorage
//     axios
//       .get("http://localhost:3000/api/v1/data/datafetch")
//       .then((response) => {
//         const data = response.data;
//         console.log(data);
//         if (data.status === "ok") {
//           // Set the user data if the request is successful
//           console.log("data pranav");
//           setUserData(data.data);
//           console.log("helloooooo", userData);
//         } else {
//           // Handle error (e.g., token expired, not authenticated)
//         }
//       })
//       .catch((error) => {
//         // Handle network or other errors
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     // Log userData whenever it changes
//     console.log("This is dashboard data");
//     console.log("hi ppp", userData);
//   }, [userData]);

//   return (
//     <>
//       <div>
//         {userData ? (
//           <div className="Dashboard-info">
//             <h2>Welcome, {userData.end_year}!</h2>
//             <p>Email: {userData.email}</p>
//             <p>Phone number:{userData.phoneno}</p>
//             <p>Address:{userData.address}</p>
//             <p>Age:{userData.age}</p>
//             <p>Preferred role:{userData.preferredrole}</p>
//             {/* Display other user information */}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";
function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/data/datafetch")
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "ok") {
          setUserData(data.data);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("This is dashboard data");
    console.log("hi ppp", userData);
  }, [userData]);

  return (
    <>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="Dashboard-info">
            {userData.dataFetched.map((user) => (
              <div key={user._id}>
                <h2>Welcome, {user.end_year}!</h2>
                <p>Title: {user.title}</p>
                <p>Phone number: {user.phoneno}</p>
                <p>Address: {user.address}</p>
                <p>Age: {user.age}</p>
                <p>Preferred role: {user.preferredrole}</p>
                {/* Display other user information */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
