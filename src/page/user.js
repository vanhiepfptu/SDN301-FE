import { useEffect } from "react";

const User = () => {
  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      //   console.log(data);
      if (data.roleName === "guest") {
        navigator("/");
      }
      if (data.roleName === "admin") {
        navigator("/staff/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <div></div>;
};

export default User;
