import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Search, Users, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (!token) {
      navigate("/authenticate");
    }
  }, [navigate]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      try {
        const token = localStorage.getItem("user-token");
        if (!token) {
          navigate("/authenticate");
          return [];
        }
        
        const response = await axios.get("https://coderush-0p5u.onrender.com/api/leaderboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        return response.data.leaderboard ?? [];
  
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("user-token"); // Clear invalid token
          navigate("/authenticate");
          return [];
        }
        throw new Error("Failed to fetch leaderboard data");
      }
    },
  });
  
  const leaderboardData = data ?? [];

  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.points - a.points);

  const filteredUsers = sortedLeaderboard.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={20} />;
    if (rank === 2) return <Trophy className="text-gray-400" size={20} />;
    if (rank === 3) return <Trophy className="text-amber-700" size={20} />;
    return <span className="font-bold">{rank}</span>;
  };

  if (isFetching) {
  return <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center text-white">
      <h3>Loading......</h3>
    </main>
  }
  if (error) return <h3>Error fetching data: {(error as Error).message}</h3>;
  if (!leaderboardData.length) return <h3>No data available</h3>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See who is leading the pack. Compete with other coders and climb the ranks by solving problems.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 p-6 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedLeaderboard.slice(0, 3).map((user, index) => (
              <div key={user.id} className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4">
                  <Medal className="text-yellow-500" size={24} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{index + 1} Place</p>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-yellow-500">{user.points.toLocaleString()} points</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="hover:bg-gray-700/30 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700">
                          {getRankIcon(index + 1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="text-yellow-500 mr-2" size={16} />
                          <span>{user.points.toLocaleString()}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <Users size={32} className="mx-auto text-gray-600 mb-2" />
                      <p className="text-gray-400">No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </main>
  );
}