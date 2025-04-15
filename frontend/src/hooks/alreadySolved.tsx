import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Solved = () => {
  const navigate = useNavigate();

  const { data = [] } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("user-token");
        if (!token) {
          navigate("/authenticate");
          return [];
        }

        const response = await axios.get(
          "https://coderush-0p5u.onrender.com/api/user/solvedProblems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        // extract only frontend_id as array
        return response.data.list.map(
          (item: { frontend_id: number }) => item.frontend_id
        );
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("user-token");
          navigate("/authenticate");
          return [];
        }
        throw new Error("Failed to fetch leaderboard data");
      }
    },
  });

  return data;
};

export default Solved;
