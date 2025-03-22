import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Social() {
    const [record, setRecord] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => setRecord(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {record.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Social