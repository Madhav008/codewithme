const express = require('express');
const router = express.Router();
const axios = require("axios");
var FormData = require('form-data');

router.post('/', getResult)


async function getResult(req, res) {

  const { pid, userCode, slug, lang } = req.body;

  try {
    const sub_id = await sendSubmissionRequest(userCode, lang, slug);
    console.log(sub_id);
    const output = await getFinalResult(sub_id,pid);
    res.send(output);
  }
  catch (error) {
    res.status(500).send(error.message)
  }
}


async function sendSubmissionRequest(userCode, lang, slug) {
  var data = new FormData();
  data.append('source', 'https://practice.geeksforgeeks.org');
  data.append('request_type', 'solutionCheck');
  data.append('userCode', userCode);
  data.append('code', '//{ Driver Code Starts\r\n//Initial Template for Java');
  data.append('language', 'java');
  try {
    const res = await axios.post(
      'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/' + slug + '/compile/',
      '------WebKitFormBoundarycw8njaL6uwBOYVr2\r\nContent-Disposition: form-data; name="source"\r\n\r\nhttps://practice.geeksforgeeks.org\r\n------WebKitFormBoundarycw8njaL6uwBOYVr2\r\nContent-Disposition: form-data; name="request_type"\r\n\r\nsolutionCheck\r\n------WebKitFormBoundarycw8njaL6uwBOYVr2\r\nContent-Disposition: form-data; name="userCode"\r\n\r\n\r\n\r\n//User function Template for Java\r\n\r\n\r\nclass Solution{\r\n    \r\n   \r\n    // Function for finding maximum and value pair\r\n    public static int maxDistance (int arr[], int n) {\r\n        //Complete the function\r\n        return 1;\r\n    }\r\n    \r\n    \r\n}\r\n\r\n\r\n\r\n------WebKitFormBoundarycw8njaL6uwBOYVr2\r\nContent-Disposition: form-data; name="code"\r\n\r\n//{ Driver Code Starts\r\n//Initial Template for Java\r\n\r\n//Initial Template for Java\r\n\r\n\r\n/*package whatever //do not write package name here */\r\n\r\nimport java.io.*;\r\nimport java.util.*;\r\n\r\n\r\nclass Array {\r\n    \r\n    // Driver code\r\n\tpublic static void main (String[] args) throws IOException{\r\n\t\t// Taking input using buffered reader\r\n\t\tBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\r\n\t\t\r\n\t\tint testcases = Integer.parseInt(br.readLine());\r\n\t\t\r\n\t\t// looping through all testcases\r\n\t\twhile(testcases-- > 0){\r\n\t\t    String line = br.readLine();\r\n\t\t    String[] element = line.trim().split("\\\\s+");\r\n\t\t    int n = Integer.parseInt(element[0]);\r\n\t\t     \r\n\t\t    int arr [] = new int[n];\r\n\t\t    \r\n\t\t    line = br.readLine();\r\n\t\t    String[] elements = line.trim().split("\\\\s+");\r\n\t\t    for(int i = 0;i<n;i++){\r\n\t\t        arr[i] = Integer.parseInt(elements[i]);\r\n\t\t    }\r\n\t\t    Solution obj = new Solution();\r\n\t\t    int ans = obj.maxDistance(arr, n);\r\n\t\t    System.out.println(ans);\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\r\n\r\n\r\n// } Driver Code Ends\r\n\r\n\r\n//User function Template for Java\r\n\r\n\r\nclass Solution{\r\n    \r\n   \r\n    // Function for finding maximum and value pair\r\n    public static int maxDistance (int arr[], int n) {\r\n        //Complete the function\r\n        return 1;\r\n    }\r\n    \r\n    \r\n}\r\n\r\n\r\n\r\n------WebKitFormBoundarycw8njaL6uwBOYVr2\r\nContent-Disposition: form-data; name="language"\r\n\r\njava\r\n------WebKitFormBoundarycw8njaL6uwBOYVr2--\r\n',
      {
        headers: {
          'authority': 'practiceapiorigin.geeksforgeeks.org',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarycw8njaL6uwBOYVr2',
          'cookie': 'gfguserName=madhavj211%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE2NzE1MzIzNzMsImV4cCI6MTY3NDEyNDM3MywiaGFuZGxlIjoibWFkaGF2ajIxMSIsInV1aWQiOiI0MTUyM2RjMDJhMWZkZTVmZTk5YzJjMjlhNWU0YzZiMiIsInByb2ZpbGVVcmwiOiJodHRwczpcL1wvbWVkaWEuZ2Vla3Nmb3JnZWVrcy5vcmdcL2ltZy1wcmFjdGljZVwvdXNlcl93ZWItMTU5ODQzMzIyOC5zdmciLCJpbnN0aXR1dGVJZCI6NDYsImluc3RpdHV0ZU5hbWUiOiJDaGl0a2FyYSBVbml2ZXJzaXR5LCBQdW5qYWIiLCJuYW1lIjoiSGFyaSBPbSIsImlzSW50ZXJlc3RTZWxlY3RlZCI6dHJ1ZSwicHVpZCI6InVtbU1TZG8zMVE9PSIsInBhIjoxfQ.aLCx1ZG59bcp7lvtqJSSMv8KEMuJEfdt7qWx2KnA56LEJQLX8pbci1L3oYQCHJuQl14u7FztWzxGMF731JDDYwcb_vlbt4BEOBWQgGjwx6q_jM-jGuhD2gJd84nwRVRh_9yogNy2wYqqNL63FubO5pgcCRMhJy71NHfRt7bIjqA1Ys67OGB4encIO2eYS5sZwZpfRbkwIJOO_RZEpPGZyU93bhOuzU514rGHLrjoQwdsWNBHZXThnwvLdEDxD9srzY967ix1quZ8yOuy4rEAvQ7xWeLXpqp1sYlZjK_UED1U2L6o_KCWIuTFtGN_GZ8lwtEiCGMi7UtdlOcMaW3J-w; http_referrer="https://practice.geeksforgeeks.org/problems/a-difference-of-values-and-indexes0302/1"',
          'dnt': '1',
          'origin': 'https://practice.geeksforgeeks.org',
          'referer': 'https://practice.geeksforgeeks.org/',
          'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
      }
    )

    return res.data.results.submission_id;
  } catch (error) {
    console.log(error.message)
  }

}




async function getFinalResult(sub_id,pid) {
  var data = new FormData();
  data.append('sub_id', sub_id);
  data.append('sub_type', 'solutionCheck');
  data.append('pid', String(pid));


  var config = {
    method: 'post',
    url: 'https://practiceapiorigin.geeksforgeeks.org/api/latest/problems/submission/result/',
    headers: {
      'authority': 'practiceapiorigin.geeksforgeeks.org',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'gfguserName=madhavj211%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmdlZWtzZm9yZ2Vla3Mub3JnXC8iLCJpYXQiOjE2NzE1MzIzNzMsImV4cCI6MTY3NDEyNDM3MywiaGFuZGxlIjoibWFkaGF2ajIxMSIsInV1aWQiOiI0MTUyM2RjMDJhMWZkZTVmZTk5YzJjMjlhNWU0YzZiMiIsInByb2ZpbGVVcmwiOiJodHRwczpcL1wvbWVkaWEuZ2Vla3Nmb3JnZWVrcy5vcmdcL2ltZy1wcmFjdGljZVwvdXNlcl93ZWItMTU5ODQzMzIyOC5zdmciLCJpbnN0aXR1dGVJZCI6NDYsImluc3RpdHV0ZU5hbWUiOiJDaGl0a2FyYSBVbml2ZXJzaXR5LCBQdW5qYWIiLCJuYW1lIjoiSGFyaSBPbSIsImlzSW50ZXJlc3RTZWxlY3RlZCI6dHJ1ZSwicHVpZCI6InVtbU1TZG8zMVE9PSIsInBhIjoxfQ.aLCx1ZG59bcp7lvtqJSSMv8KEMuJEfdt7qWx2KnA56LEJQLX8pbci1L3oYQCHJuQl14u7FztWzxGMF731JDDYwcb_vlbt4BEOBWQgGjwx6q_jM-jGuhD2gJd84nwRVRh_9yogNy2wYqqNL63FubO5pgcCRMhJy71NHfRt7bIjqA1Ys67OGB4encIO2eYS5sZwZpfRbkwIJOO_RZEpPGZyU93bhOuzU514rGHLrjoQwdsWNBHZXThnwvLdEDxD9srzY967ix1quZ8yOuy4rEAvQ7xWeLXpqp1sYlZjK_UED1U2L6o_KCWIuTFtGN_GZ8lwtEiCGMi7UtdlOcMaW3J-w; gfg_nluid=f1513f7c3a0850f8ed3a13135cd9f402',
      'dnt': '1',
      'origin': 'https://practice.geeksforgeeks.org',
      'referer': 'https://practice.geeksforgeeks.org/',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      ...data.getHeaders()
    },
    data: data
  };

  try {
    const response = await axios(config);

    if (response.data.status == "QUEUED") {
      console.log("Processing");
      return await getFinalResult(sub_id,pid);
    } else {
      return response.data;
    }

  } catch (error) {
    console.log(error.message);
  }


}


module.exports = router;