import { gql, useQuery } from "@apollo/client";
import "./App.css";

const query = gql`
    query GetTodos {
        getTodos {
            id
            title
            completed
            user {
                name
                email
                phone
            }
        }
    }
`;

function App() {
    const { data, error, loading } = useQuery(query);
    console.log("data:", data);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(error);
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                    </tr>
                    {data.getTodos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.completed.toString()}</td>
                            <td>{todo.user.name}</td>
                            <td>{todo.user.email}</td>
                            <td>{todo.user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
