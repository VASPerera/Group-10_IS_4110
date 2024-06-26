import React, { useEffect, useState } from "react";
import useAuth from "./UseAth";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function () {
  const isAuthenticated = useAuth();
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();

  // const { userId} = useParams(); // Access the id from the route parameters
  const [undergraduateData, setUndergraduateData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    bio: "",
    profilePic: "",
  });

  const [img,setimg] = useState("");

  const fetchData = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case where the token is not available
        console.log("No token available");
        return;
      }
      const response = await fetch(
        `http://localhost:3001/user/undergraduates/${userId}`
      );

      const data = await response.json();
      console.log(data);

      setUndergraduateData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        university: data.university || "",
        bio: data.bio || "",
        profilePic: `http://localhost:3001/uploads/${data.profilePic}` || "https://bootdey.com/img/Content/avatar/avatar7.png",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated == null) return;

    if (isAuthenticated == false) {
      // Handle unauthorized access, e.g., redirect to login page
      navigate("/login");
      return;
    }
    fetchData(userid);
  }, [isAuthenticated]); // Fetch data when the component mounts and when id changes

  const handleInputChange = (event) => {
    // Handle input changes if needed
    const { name, value } = event.target;
    setUndergraduateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setimg(file);
    
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token available");
        return;
      }

      const formData = new FormData();
      formData.append("profilePic", img);
      formData.append("id", userid);

      const response = await fetch("http://localhost:3001/upload/uploadpic", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUndergraduateData((prevData) => ({
          ...prevData,
          profilePic: "http://localhost:3001/uploads/" + data.user.profilePic,
        }));
        
      } else {
        console.error("Error updating profile picture:", data.error);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission if needed
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case where the token is not available
        console.log("No token available");
        return;
      }
      const response = await fetch(
        `http://localhost:3001/user/updateuser/${userid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(undergraduateData),
        }
      );
      

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("User updated successfully:", data);
      } else {
        console.error("Error updating user:", data.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div>
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary" style={{ color: "black" }}>
          Edit Profile
        </h1>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={
                  undergraduateData.profilePic
                    
                }
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              ></img>

              <input
                type="file"
                class="form-control"
                onChange={handleFileChange}
              />
              <button type="Submit" value={"submit"} onClick={handleUpload}>
                upload
              </button>
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <h3>Personal info</h3>

            <form
              className="form-horizontal"
              role="form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="col-lg-3 control-label">First name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    value={undergraduateData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Last name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    value={undergraduateData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">University:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    name="university"
                    value={undergraduateData.university}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Bio:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    name="bio"
                    value={undergraduateData.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <button type="Submit" value={"submit"}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
