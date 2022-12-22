import React from 'react'
import './problem.css'
const Problems = () => {
   
    return (
        <div className='problems p-3 overflow-scroll text-white h-[100%] max-h-[100%]'>
            <p className=''><span >Given </span> 
                <span >a Integer</span>
                <span > array A[] of n elements. Your task is to complete the function </span>
                <strong><span >PalinArray</span></strong>
                <span>.</span>
                <span > Which will return 1 if all the elements of the Array are palindrome otherwise it will return&nbsp;0.</span>
            </p>
            <p>
                <strong>
                    <span >Example 1:</span>
                </strong>
            </p>
            <pre >
                <span >
                    <strong>Input:</strong>
                </span>
                <span >5111 222 333 444 555</span>
                <span >
                    <strong>Output:</strong>
                </span>
                <span >1</span>
                <span >
                    <strong>Explanation:</strong>
                </span>
                <span >A[0] = 111 <br/>which is a palindrome number.A[1] = 222
                    <br/>which is a palindrome number.A[2] = 333 <br/>which is a palindrome number.A[3] = 444 <br/>which is a palindrome number.A[4] = 555 <br/>which is a palindrome number.As all numbers are palindrome so This will return 1.</span>
            </pre>
            <p>
                <span >
                    <strong>Example 2:</strong>
                </span>
            </p>
            <pre>
                <span >
                    <strong>Input:</strong>3121 131 20</span>
                <span >
                    <strong>Output:</strong>
                </span>
                <span >0</span>
                <span >
                    <strong>Explanation:</strong>20 is not a palindrome hence the output is 0.</span>
            </pre>
            <p>
                <span >
                    <strong>Constraints:</strong>
                </span><br /><span >1 &lt;=T&lt;= 50</span>
                <br /><span >1 &lt;=n&lt;= 20</span>
                <br /><span >1 &lt;=A[]&lt;= 10000</span>
            </p>

        </div>
    )
}

export default Problems