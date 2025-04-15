import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

interface TestCase {
  code: string;
  output: string | number;
}

async function runCode(payload: TestCase[]) {
  try {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing in environment variables");
      return { error: 'API configuration error' };
    }

    if (!Array.isArray(payload)) {
      console.error("Expected array payload, received:", typeof payload);
      return { error: 'Invalid payload format' };
    }

    const languageId = 62; 
    console.log(payload);

    const submissions = await Promise.all(
      payload.map(async (testCase) => {
        console.log(testCase)
        if (!testCase.code) {
          console.error("Missing code in test case");
          throw new Error("Invalid test case format - missing code");
        }

        const response = await axios.post(
          `${JUDGE0_API_URL}?base64_encoded=false&wait=true`, 
          {
            source_code: testCase.code,
            language_id: languageId
          }, 
          {
            headers: {
              'x-rapidapi-key': process.env.API_KEY,
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            }
          }
        );
        return response.data;
      })
    );
    console.log(submissions)
    const results = submissions.map((submission, index) => {
      
      const expectedOutput = String(payload[index].output).trim();
      let actualOutput = submission.stdout ? submission.stdout.trim() : '';
      
      if (expectedOutput.toLowerCase() === 'true' || expectedOutput.toLowerCase() === 'false') {
        if (actualOutput.toLowerCase() === expectedOutput.toLowerCase()) {
          actualOutput = expectedOutput; 
        }
      }
      
      if (expectedOutput.startsWith('[') && expectedOutput.endsWith(']')) {
        try {
          const expectedArray = JSON.parse(expectedOutput.replace(/'/g, '"'));
          const actualArray = JSON.parse(actualOutput.replace(/'/g, '"'));
          if (JSON.stringify(expectedArray) === JSON.stringify(actualArray)) {
            actualOutput = expectedOutput; 
          }
        } catch (e) {
          console.log("Error In Backend");
        }
      }
      console.log("Actual Output => " + actualOutput)
      console.log("Expected Output => " + expectedOutput)
      const status = actualOutput === expectedOutput ? 'Passed' : 'Failed';
    
      return {
        testCase: index + 1,
        timeTaken: submission.time,
        status,
        actualOutput,
        expectedOutput
      };
    });

    return {
      results
    };

  } catch (error) {
    console.error('Error executing code:', error);
    if (axios.isAxiosError(error)) {
      return { 
        error: 'Failed to execute code', 
        details: error.response?.data || error.message 
      };
    }
    return { error: 'Failed to execute code' };
  }
}

export default runCode;