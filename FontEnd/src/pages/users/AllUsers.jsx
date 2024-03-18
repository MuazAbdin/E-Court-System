
import { useLoaderData } from "react-router-dom";
import Wrapper from "../../assets/stylingWrappers/CaseCatalog";
import StyledSearchBar from "../../assets/stylingWrappers/SearchBar";
import { Table } from "../../components";
import { fetcher } from '../../utils/fetcher';

function AllUsers() {
  const users = useLoaderData();
  return (
    <Wrapper>
      <h3 className="title">USERS</h3>
      <Table
        tableCaption=""
        tableHeader={["#", "Name", "idNumber", "Type",  "Email", "Mobile"]}
      >
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.idNumber}</td>
            <td>{user.userType}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
          </tr>
        ))}
      </Table>
    </Wrapper>
  );
}


export default AllUsers;

export async function loader() {
 
 try {
    const response = await fetcher("/users/");
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    return error;
  }  
}