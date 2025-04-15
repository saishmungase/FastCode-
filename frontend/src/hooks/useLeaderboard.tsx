// // import { useQuery } from "@tanstack/react-query";

// // const useLeaderBoard = () => {
// //     const { data, status, isFetching } = useQuery({
// //         queryKey: ['leaderboard'],
// //         queryFn: async () => {
// //             const response = await fetch("http://localhost:5000/api/leaderboard");
// //             if (!response.ok) throw new Error("Failed to fetch leaderboard data");
// //             return response.json();
// //         },
// //         staleTime: 1000 * 60, // Optional: cache data for 1 minute
// //     });

// //     console.log("The Data => ", data);
// //     return { data: data || [], isFetching, status };
// // };

// // export default useLeaderBoard;


// import { useState, useEffect } from "react";

// const useLeaderboard = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await fetch("/api/leaderboard"); // Update API endpoint if needed
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const result = await response.json();
//         console.log("Fetched Data:", result);

//         setData(result);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     console.log(fetchLeaderboard())
//     fetchLeaderboard();
//   }, []); 

//   return { data, loading, error };
// };

// export default useLeaderboard;
