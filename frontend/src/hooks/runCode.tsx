import axios from "axios"

type TestCase = {
    input: string
    expected: string
}

type Code = {
    code: string
}

type codeRunningTypes = {
    questionId: number
    codie: string
    testCases: TestCase[]
    addOnCode: Code[]
}

const codeRequest = async ({questionId, codie, testCases, addOnCode}: codeRunningTypes) => {
    const code = addOnCode.map((val, index) => {
        let expectedOutput : number | string = testCases[index].expected.replace(/^['"]|['"]$/g, '');
        
        if (!isNaN(Number(expectedOutput))) {
            expectedOutput = Number(expectedOutput);
        }
        
        const importMatch = val.code.match(/import\s+[^;]+;/g);
        const imports = importMatch ? importMatch.join('\n') : '';
        
        const cleanedAddOnCode = val.code.replace(/import\s+[^;]+;/g, '').trim();
        
        const completeCode = `${imports}\n\n${codie}\n\n${cleanedAddOnCode}`;
        
        return {
            code: completeCode,
            output: expectedOutput
        }
    });
    
    const token = localStorage.getItem("user-token")
    const response = await axios.post(
        'https://coderush-0p5u.onrender.com/api/user/submit',
        {
            questionId,
            code
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const data = response.data;
    return data.response?.results || [];
}

export default codeRequest;