// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Search, Filter, Code, ArrowRight, BarChart2 } from "lucide-react"
// import Solved from "../hooks/alreadySolved";

// // Sample problem data
// const problemsData = [
//   {
//     id: 1,
//     title: "Valid Anagram",
//     difficulty: "Easy",
//     tags: ["String", "Hash Table", "Sorting"],
//     solvedCount: 3723,
//     description:
//       "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
//   },
//   {
//     id: 2,
//     title: "Move Zeroes",
//     difficulty: "Easy",
//     tags: ["Array", "Two Pointers"],
//     solvedCount: 3895,
//     description:
//       "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
//   },
//   {
//     id: 3,
//     title: "Longest Substring Without Repeating Characters",
//     difficulty: "Medium",
//     tags: ["String", "Sliding Window", "Hash Table"],
//     solvedCount: 3120,
//     description:
//       "Given a string s, find the length of the longest substring without repeating characters.",
//   },
//   {
//     id: 4,
//     title: "Product of Array Except Self",
//     difficulty: "Medium",
//     tags: ["Array", "Prefix Sum"],
//     solvedCount: 2941,
//     description:
//       "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division and in O(n) time.",
//   },
//   {
//     id: 5,
//     title: "Minimum Window Substring",
//     difficulty: "Hard",
//     tags: ["String", "Sliding Window", "Hash Table"],
//     solvedCount: 2104,
//     description:
//       "Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string.",
//   },
//   {
//     id: 6,
//     title: "Trapping Rain Water",
//     difficulty: "Hard",
//     tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
//     solvedCount: 2432,
//     description:
//       "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
//   },
// ];


// export default function Problems() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [difficultyFilter, setDifficultyFilter] = useState("All")
 

//   const filteredProblems = problemsData.filter((problem) => {
//     const matchesSearch =
//       problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

//     const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter

//     return matchesSearch && matchesDifficulty
//   })

  
//   const solved = await Solved();
//   console.log('Solved Array : ' + solved);

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case "Easy":
//         return "text-green-500 bg-green-500/10"
//       case "Medium":
//         return "text-yellow-500 bg-yellow-500/10"
//       case "Hard":
//         return "text-red-500 bg-red-500/10"
//       default:
//         return "text-gray-500 bg-gray-500/10"
//     }
//   }


//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//       <section className="container mx-auto px-4 pt-28 pb-20">
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">Coding Problems</h1>
//           <p className="text-gray-300 max-w-2xl mx-auto">
//             Browse through our collection of coding problems. Filter by difficulty or search for specific topics.
//           </p>
//         </motion.div>

//         <motion.div
//           className="mb-8 flex flex-col md:flex-row gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <div className="relative flex-grow">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search problems by name, description, or tags..."
//               className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-2 md:w-48">
//             <Filter size={20} className="text-gray-400" />
//             <select
//               className="flex-grow py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
//               value={difficultyFilter}
//               onChange={(e) => setDifficultyFilter(e.target.value)}
//             >
//               <option value="All">All Difficulties</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>
//         </motion.div>

//         <div className="grid gap-4">
//           {filteredProblems.length > 0 ? (
//             filteredProblems.map((problem, index) => (
//               <motion.div
//                 key={problem.id}
//                 className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//               >
//                 <div className="p-6">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <span
//                           className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}
//                         >
//                           {problem.difficulty}
//                         </span>
//                         <div className="flex items-center text-gray-400 text-sm">
//                           <BarChart2 size={16} className="mr-1" />
//                           {problem.solvedCount.toLocaleString()} solves
//                         </div>
//                       </div>
//                       <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
//                       <p className="text-gray-300 mb-4">{problem.description}</p>
//                       <div className="flex flex-wrap gap-2">
//                         {problem.tags.map((tag) => (
//                           <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="md:ml-4">
//                       {solved.includes(problem.id) ? <div 
//                         className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap">Solved</div> : <a
//                         href={`/problems/${problem.id}`}
//                         className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap"
//                       >
//                         Solve Now <ArrowRight size={16} className="ml-2" />
//                       </a>}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               className="text-center py-12"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Code size={48} className="mx-auto text-gray-600 mb-4" />
//               <h3 className="text-xl font-medium mb-2">No problems found</h3>
//               <p className="text-gray-400">Try adjusting your search or filter criteria</p>
//             </motion.div>
//           )}
//         </div>
//       </section>
//     </main>
//   )
// }


import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Code, ArrowRight, BarChart2 } from "lucide-react";
import Solved from "../hooks/alreadySolved"; // ✅ this is a hook!

const problemsData = [
  {
    id: 1,
    title: "Valid Anagram",
    difficulty: "Easy",
    tags: ["String", "Hash Table", "Sorting"],
    solvedCount: 3723,
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
  },
  {
    id: 2,
    title: "Move Zeroes",
    difficulty: "Easy",
    tags: ["Array", "Two Pointers"],
    solvedCount: 3895,
    description:
      "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window", "Hash Table"],
    solvedCount: 3120,
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
  },
  {
    id: 4,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    tags: ["Array", "Prefix Sum"],
    solvedCount: 2941,
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division and in O(n) time.",
  },
  {
    id: 5,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    tags: ["String", "Sliding Window", "Hash Table"],
    solvedCount: 2104,
    description:
      "Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string.",
  },
  {
    id: 6,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    solvedCount: 2432,
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  },
];

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const solved = Solved();
  console.log("Solved List : " + solved)

  const filteredProblems = problemsData.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDifficulty =
      difficultyFilter === "All" || problem.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 bg-green-500/10";
      case "Medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "Hard":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="container mx-auto px-4 pt-28 pb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Coding Problems</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse through our collection of coding problems. Filter by difficulty or search for specific topics.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search problems by name, description, or tags..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:w-48">
            <Filter size={20} className="text-gray-400" />
            <select
              className="flex-grow py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <BarChart2 size={16} className="mr-1" />
                          {problem.solvedCount.toLocaleString()} solves
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                      <p className="text-gray-300 mb-4">{problem.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:ml-4">
                      {solved.includes(problem.id) ? (
                        <div className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap">
                          Solved
                        </div>
                      ) : (
                        <a
                          href={`/problems/${problem.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors whitespace-nowrap"
                        >
                          Solve Now <ArrowRight size={16} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Code size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">No problems found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
