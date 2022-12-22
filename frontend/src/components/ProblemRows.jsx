import React from 'react'

const ProblemRows = () => {
    return (
        <>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17Apple MacBook Pro 17 "
                </th>
                <td class="py-4 px-6">
                    <div className="badge badge-primary max-w-sm m-auto font-bold text-gray-50">Easy</div>
                </td>

            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    <div className="badge badge-secondary max-w-sm m-auto font-bold text-gray-50">Medium</div>
                </td>

            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    <div className="badge badge-accent max-w-sm m-auto font-bold text-gray-50">Hard</div>
                </td>
            </tr>
        </>
    )
}

export default ProblemRows