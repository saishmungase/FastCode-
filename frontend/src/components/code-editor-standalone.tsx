// import { useState, useRef, useEffect } from "react"
// import CodeMirror from '@uiw/react-codemirror'
// import { java } from '@codemirror/lang-java'
// import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'
// import codeRequest from "../hooks/runCode"
// import { useParams } from "react-router-dom"

// type TestCase = {
//   input: string
//   expected: string
// }

// type Code = {
//   code : string
// }

// type CodeEditorProps = {
//   questionName: string
//   level: string
//   description: string
//   testCases: TestCase[]
//   initialCode: string
//   addOnCode : Code[]
// }

// const questions: CodeEditorProps[] = [
//   {
//     questionName: "Valid Anagram",
//     level: "Easy",
//     description:
//       "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
//     testCases: [
//       { input: "s='anagram', t='nagaram'", expected: "true" },
//       { input: "s='rat', t='car'", expected: "false" }
//     ],
//     initialCode: `class Solution {
//     public boolean isAnagram(String s, String t) {
//         // Your code here
//         return false;
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         boolean soln = s.isAnagram("anagram", "nagaram");
//         System.out.println(soln);
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         boolean soln = s.isAnagram("rat", "car");
//         System.out.println(soln);
//     }
// }`
//       }
//     ]
//   },
//   {
//     questionName: "Move Zeroes",
//     level: "Easy",
//     description:
//       "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
//     testCases: [
//       { input: "[0,1,0,3,12]", expected: "[1,3,12,0,0]" },
//       { input: "[0]", expected: "[0]" }
//     ],
//     initialCode: `class Solution {
//     public void moveZeroes(int[] nums) {
//         // Your code here
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
        
// public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int[] nums = {0, 1, 0, 3, 12};
//         s.moveZeroes(nums);
//         System.out.println(Arrays.toString(nums));
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
        
// public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int[] nums = {0};
//         s.moveZeroes(nums);
//         System.out.println(Arrays.toString(nums));
//     }
// }`
//       }
//     ]
//   },
//   {
//     questionName: "Longest Substring Without Repeating Characters",
//     level: "Medium",
//     description:
//       "Given a string s, find the length of the longest substring without repeating characters.",
//     testCases: [
//       { input: "'abcabcbb'", expected: "3" },
//       { input: "'bbbbb'", expected: "1" },
//       { input: "'pwwkew'", expected: "3" }
//     ],
//     initialCode: `class Solution {
//     public int lengthOfLongestSubstring(String s) {
//         // Your code here
//         return 0;
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int result = s.lengthOfLongestSubstring("abcabcbb");
//         System.out.println(result);
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int result = s.lengthOfLongestSubstring("bbbbb");
//         System.out.println(result);
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int result = s.lengthOfLongestSubstring("pwwkew");
//         System.out.println(result);
//     }
// }`
//       }
//     ]
//   },
//   {
//     questionName: "Product of Array Except Self",
//     level: "Medium",
//     description:
//       "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division and in O(n) time.",
//     testCases: [
//       { input: "[1,2,3,4]", expected: "[24,12,8,6]" },
//       { input: "[-1,1,0,-3,3]", expected: "[0,0,9,0,0]" }
//     ],
//     initialCode: `class Solution {
//     public int[] productExceptSelf(int[] nums) {
//         // Your code here
//         return new int[nums.length];
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
        
// public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int[] result = s.productExceptSelf(new int[]{1, 2, 3, 4});
//         System.out.println(Arrays.toString(result));
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
// public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int[] result = s.productExceptSelf(new int[]{-1, 1, 0, -3, 3});
//         System.out.println(Arrays.toString(result));
//     }
// }`
//       }
//     ]
//   },
//   {
//     questionName: "Minimum Window Substring",
//     level: "Hard",
//     description:
//       "Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string \"\".",
//     testCases: [
//       { input: "s='ADOBECODEBANC', t='ABC'", expected: "'BANC'" },
//       { input: "s='a', t='a'", expected: "'a'" }
//     ],
//     initialCode: `class Solution{
//     public String minWindow(String s, String t) {
//         // Your code here
//         return "";
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         String result = s.minWindow("ADOBECODEBANC", "ABC");
//         System.out.println(result);
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         String result = s.minWindow("a", "a");
//         System.out.println(result);
//     }
// }`
//       }
//     ]
//   },
//   {
//     questionName: "Trapping Rain Water",
//     level: "Hard",
//     description:
//       "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
//     testCases: [
//       { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
//       { input: "[4,2,0,3,2,5]", expected: "9" }
//     ],
//     initialCode: `class Solution {
//     public int trap(int[] height) {
//         // Your code here
//         return 0;
//     }
// }`,
//     addOnCode: [
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int result = s.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1});
//         System.out.println(result);
//     }
// }`
//       },
//       {
//         code: `
//         import java.util.*;
//         public class Main {
//     public static void main(String[] args) {
//         Solution s = new Solution();
//         int result = s.trap(new int[]{4,2,0,3,2,5});
//         System.out.println(result);
//     }
// }`
//       }
//     ]
//   }
// ];


// export default function CodeEditor() {
//   const { id } = useParams()
//   let idx = parseInt(id);
//   idx -= 1;
//   const questionIndex = idx;
//   const question = questions[questionIndex] || questions[0]

//   const [code, setCode] = useState<string>(question.initialCode)
//   const [results, setResults] = useState<boolean[]>(Array(question.testCases.length).fill(null))
//   const [showTerminal, setShowTerminal] = useState(false)
//   const [activeTab, setActiveTab] = useState("editor")
//   const textareaRef = useRef<HTMLTextAreaElement>(null)
//   const [submitLoad, setSubmitLoad] = useState(false)
//   const highlightedLinesRef = useRef<HTMLDivElement>(null)
//   const [allPassed, setAllPassed] = useState(false);
//   const [allPassedData, setAllPassedData] = useState({});

//   useEffect(() => {
//     if (textareaRef.current && highlightedLinesRef.current) {
//       highlightedLinesRef.current.scrollTop = textareaRef.current.scrollTop
//       highlightedLinesRef.current.scrollLeft = textareaRef.current.scrollLeft
//     }
//   }, [code])

//   const runCode = async () => {
//     setSubmitLoad(true)
//     try {
//       const data = await codeRequest({
//         questionId: questionIndex,
//         codie: code,
//         testCases: question.testCases,
//         addOnCode: question.addOnCode,
//       })
  
//       console.log("The Data =>", data)

//       const newResults = data.map((testCase) => {
//         return (testCase.status == "Passed") ? true : false;
//       })
//       let soln = true;
//       newResults.map((val) => {
//           if(val == false){
//             soln = val;
//           }
//       })
//       if(soln){
//         setAllPassed(soln)
//         setAllPassedData(data)
//       }
//       setResults(newResults)
//       setShowTerminal(true)
//     } catch (error) {
//       console.error("Error running code:", error)
//     }
//     setSubmitLoad(false)
//   }


//   const getBadgeColor = (level: string) => {
//     switch (level.toLowerCase()) {
//       case "easy":
//         return "bg-green-900/20 text-green-400 border-green-800"
//       case "medium":
//         return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
//       case "hard":
//         return "bg-red-900/20 text-red-400 border-red-800"
//       default:
//         return "bg-blue-900/20 text-blue-400 border-blue-800"
//     }
//   }

//   return (
//     <div className="flex flex-col w-full h-screen pt-[50px] bg-gray-950 text-gray-100">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-grow overflow-hidden">
//         <div className="bg-gray-900 border border-gray-800 rounded-lg text-gray-100 overflow-auto">
//           <div className="p-4 border-b border-gray-800">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold">{question.questionName}</h2>
//               <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(question.level)}`}>{question.level}</span>
//             </div>
//             <p className="text-gray-400 mt-2">{question.description}</p>
//           </div>
//           <div className="p-4">
//             <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
//             <div className="space-y-3">
//               {question.testCases.map((tc, index) => (
//                 <div key={index} className="bg-gray-800 p-3 rounded-md border border-gray-700">
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Test Case #{index + 1}</span>
//                     {results[index] !== null &&
//                       (results[index] ? (
//                         <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       ) : (
//                         <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       ))}
//                   </div>
//                   <div className="mt-2 text-sm">
//                     <span className="text-gray-500">Input:</span>
//                     <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">{tc.input}</pre>
//                     <span className="text-gray-500">Expected:</span>
//                     <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">{tc.expected}</pre>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
//           <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
//             <div className="flex">
//               <button
//                 onClick={() => setActiveTab("editor")}
//                 className={`px-3 py-1 text-sm rounded-md ${activeTab === "editor" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
//               >
//                 Solution.java
//               </button>
//               <button
//                 onClick={() => setActiveTab("instructions")}
//                 className={`px-3 py-1 text-sm rounded-md ml-2 ${activeTab === "instructions" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
//               >
//                 Instructions
//               </button>
//             </div>
//             <button
//               onClick={async () => {
//                 setSubmitLoad(true)
//                 await runCode()
//                 setSubmitLoad(false)
//               }}
//               className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
//             >
//               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {submitLoad ? "Running..." : "Run Code"}
//             </button>
//           </div>

//           {activeTab === "editor" && (
//             <CodeMirror
//               value={code}
//               height="500px"
//               extensions={[java()]}
//               onChange={(value) => setCode(value)}
//               theme={tokyoNightStorm}
//             />
//           )}

//           {activeTab === "instructions" && (
//             <div className="p-4 h-full overflow-auto">
//               <h3 className="text-lg font-semibold">Instructions</h3>
//               <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
//                 <li>Handle all the test cases correctly</li>
//                 <li>Be efficient in terms of time and space complexity</li>
//                 <li>Follow good coding practices</li>
//               </ul>
//               <p className="mt-2 text-sm">Click "Run Code" to check your solution.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className={`bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden ${showTerminal ? "h-64" : "h-0"}`}>
//         <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-gray-850">
//           <h3 className="text-sm font-medium">Terminal</h3>
//           <button
//             onClick={() => setShowTerminal(false)}
//             className="h-6 w-6 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="p-3 text-sm text-green-400">Code executed. Check result badges above 👆</div>
//       </div>
//     </div>
//   )
// }



import { useState, useRef, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { java } from "@codemirror/lang-java"
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm"
import codeRequest from "../hooks/runCode"
import { useParams } from "react-router-dom"

type TestCase = {
  input: string
  expected: string
}

type Code = {
  code: string
}

type CodeEditorProps = {
  questionName: string
  level: string
  description: string
  testCases: TestCase[]
  initialCode: string
  addOnCode: Code[]
}

const questions: CodeEditorProps[] = [
  {
    questionName: "Valid Anagram",
    level: "Easy",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    testCases: [
      { input: "s='anagram', t='nagaram'", expected: "true" },
      { input: "s='rat', t='car'", expected: "false" },
    ],
    initialCode: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Your code here
        return false;
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        boolean soln = s.isAnagram("anagram", "nagaram");
        System.out.println(soln);
    }
}`,
      },
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        boolean soln = s.isAnagram("rat", "car");
        System.out.println(soln);
    }
}`,
      },
    ],
  },
  {
    questionName: "Move Zeroes",
    level: "Easy",
    description:
      "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    testCases: [
      { input: "[0,1,0,3,12]", expected: "[1,3,12,0,0]" },
      { input: "[0]", expected: "[0]" },
    ],
    initialCode: `class Solution {
    public void moveZeroes(int[] nums) {
        // Your code here
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        
public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int[] nums = {0, 1, 0, 3, 12};
        s.moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
}`,
      },
      {
        code: `
        import java.util.*;
        
public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int[] nums = {0};
        s.moveZeroes(nums);
        System.out.println(Arrays.toString(nums));
    }
}`,
      },
    ],
  },
  {
    questionName: "Longest Substring Without Repeating Characters",
    level: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    testCases: [
      { input: "'abcabcbb'", expected: "3" },
      { input: "'bbbbb'", expected: "1" },
      { input: "'pwwkew'", expected: "3" },
    ],
    initialCode: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int result = s.lengthOfLongestSubstring("abcabcbb");
        System.out.println(result);
    }
}`,
      },
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int result = s.lengthOfLongestSubstring("bbbbb");
        System.out.println(result);
    }
}`,
      },
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int result = s.lengthOfLongestSubstring("pwwkew");
        System.out.println(result);
    }
}`,
      },
    ],
  },
  {
    questionName: "Product of Array Except Self",
    level: "Medium",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division and in O(n) time.",
    testCases: [
      { input: "[1,2,3,4]", expected: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expected: "[0,0,9,0,0]" },
    ],
    initialCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // Your code here
        return new int[nums.length];
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        
public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int[] result = s.productExceptSelf(new int[]{1, 2, 3, 4});
        System.out.println(Arrays.toString(result));
    }
}`,
      },
      {
        code: `
        import java.util.*;
public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int[] result = s.productExceptSelf(new int[]{-1, 1, 0, -3, 3});
        System.out.println(Arrays.toString(result));
    }
}`,
      },
    ],
  },
  {
    questionName: "Minimum Window Substring",
    level: "Hard",
    description:
      'Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string "".',
    testCases: [
      { input: "s='ADOBECODEBANC', t='ABC'", expected: "'BANC'" },
      { input: "s='a', t='a'", expected: "'a'" },
    ],
    initialCode: `class Solution{
    public String minWindow(String s, String t) {
        // Your code here
        return "";
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        String result = s.minWindow("ADOBECODEBANC", "ABC");
        System.out.println(result);
    }
}`,
      },
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        String result = s.minWindow("a", "a");
        System.out.println(result);
    }
}`,
      },
    ],
  },
  {
    questionName: "Trapping Rain Water",
    level: "Hard",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "[4,2,0,3,2,5]", expected: "9" },
    ],
    initialCode: `class Solution {
    public int trap(int[] height) {
        // Your code here
        return 0;
    }
}`,
    addOnCode: [
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int result = s.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1});
        System.out.println(result);
    }
}`,
      },
      {
        code: `
        import java.util.*;
        public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        int result = s.trap(new int[]{4,2,0,3,2,5});
        System.out.println(result);
    }
}`,
      },
    ],
  },
]

export default function CodeEditor() {
  const { id } = useParams()
  const idx = Number.parseInt(id)
  const questionIndex = idx - 1
  const question = questions[questionIndex] || questions[0]

  const [code, setCode] = useState<string>(question.initialCode)
  const [results, setResults] = useState<boolean[]>(Array(question.testCases.length).fill(null))
  const [showTerminal, setShowTerminal] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [submitLoad, setSubmitLoad] = useState(false)
  const highlightedLinesRef = useRef<HTMLDivElement>(null)
  const [allPassed, setAllPassed] = useState(false)
  const [allPassedData, setAllPassedData] = useState<any[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [testFailed, setTestFailed] = useState(false)

  useEffect(() => {
    if (textareaRef.current && highlightedLinesRef.current) {
      highlightedLinesRef.current.scrollTop = textareaRef.current.scrollTop
      highlightedLinesRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }, [code])

  const runCode = async () => {
    setSubmitLoad(true)
    try {
      const data = await codeRequest({
        questionId: idx,
        codie: code,
        testCases: question.testCases,
        addOnCode: question.addOnCode,
      })
      console.log("Question Index Passed as => " + questionIndex)
      console.log("Question The Index => " + idx)
      console.log("The Data =>", data)

      const newResults = data.map((testCase) => {
        return testCase.status == "Passed" ? true : false
      })

      // Check if all test cases passed
      const allTestsPassed = newResults.every((result) => result === true)

      if (allTestsPassed) {
        setAllPassed(true)
        setAllPassedData(data)
        setTestFailed(false)
      } else {
        setAllPassed(false)
        setTestFailed(true)
      }

      setResults(newResults)
      setShowTerminal(true)
      setShowPopup(true)
    } catch (error) {
      console.error("Error running code:", error)
      setTestFailed(true)
      setShowPopup(true)
    }
    setSubmitLoad(false)
  }

  const handleTryAgain = () => {
    setShowPopup(false)
    setTestFailed(false)
  }

  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-900/20 text-green-400 border-green-800"
      case "medium":
        return "bg-yellow-900/20 text-yellow-400 border-yellow-800"
      case "hard":
        return "bg-red-900/20 text-red-400 border-red-800"
      default:
        return "bg-blue-900/20 text-blue-400 border-blue-800"
    }
  }

  return (
    <div className="flex flex-col w-full h-screen pt-[50px] bg-gray-950 text-gray-100">
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full">
            {allPassed ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">Congratulations!</h2>
                <p className="text-gray-300 mb-6">Your code has passed all the test cases.</p>

                <div className="mb-6 max-h-60 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-3 text-left">Test Results</h3>
                  {allPassedData.map((data, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-md border border-gray-700 mb-2 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Test Case #{index + 1}</span>
                        <span className="text-green-400 font-medium">{data.status}</span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Input:</span>
                        <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">
                          {question.testCases[index].input}
                        </pre>
                        <span className="text-gray-500">Expected:</span>
                        <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">
                          {question.testCases[index].expected}
                        </pre>
                        <span className="text-gray-500">Output:</span>
                        <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">{data.output}</pre>
                      </div>
                    </div>
                  ))}
                </div>

                <a href = {`/leaderboard`} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full">
                  Go to Leaderboard
                </a>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
                <p className="text-gray-300 mb-6">Your code failed some test cases. Please try again.</p>
                <button
                  onClick={handleTryAgain}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 flex-grow overflow-hidden">
        <div className="bg-gray-900 border border-gray-800 rounded-lg text-gray-100 overflow-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{question.questionName}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor(question.level)}`}>
                {question.level}
              </span>
            </div>
            <p className="text-gray-400 mt-2">{question.description}</p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
            <div className="space-y-3">
              {question.testCases.map((tc, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded-md border border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Test Case #{index + 1}</span>
                    {results[index] !== null &&
                      (results[index] ? (
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ))}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Input:</span>
                    <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">{tc.input}</pre>
                    <span className="text-gray-500">Expected:</span>
                    <pre className="mt-1 bg-gray-850 p-2 rounded text-gray-300 overflow-x-auto">{tc.expected}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1 text-sm rounded-md ${activeTab === "editor" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                Solution.java
              </button>
              <button
                onClick={() => setActiveTab("instructions")}
                className={`px-3 py-1 text-sm rounded-md ml-2 ${activeTab === "instructions" ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"}`}
              >
                Instructions
              </button>
            </div>
            <button
              onClick={async () => {
                setSubmitLoad(true)
                await runCode()
                setSubmitLoad(false)
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {submitLoad ? "Running..." : "Run Code"}
            </button>
          </div>

          {activeTab === "editor" && (
            <CodeMirror
              value={code}
              height="500px"
              extensions={[java()]}
              onChange={(value) => setCode(value)}
              theme={tokyoNightStorm}
            />
          )}

          {activeTab === "instructions" && (
            <div className="p-4 h-full overflow-auto">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Handle all the test cases correctly</li>
                <li>Be efficient in terms of time and space complexity</li>
                <li>Follow good coding practices</li>
              </ul>
              <p className="mt-2 text-sm">Click "Run Code" to check your solution.</p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`bg-gray-900 border-t border-gray-800 transition-all duration-300 overflow-hidden ${showTerminal ? "h-64" : "h-0"}`}
      >
        <div className="flex items-center justify-between p-2 border-b border-gray-800 bg-gray-850">
          <h3 className="text-sm font-medium">Terminal</h3>
          <button
            onClick={() => setShowTerminal(false)}
            className="h-6 w-6 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded"
          >
            ✕
          </button>
        </div>
        <div className="p-3 text-sm text-green-400">Code executed. Check result badges above 👆</div>
      </div>
    </div>
  )
}
