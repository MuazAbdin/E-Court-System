import { fetcher } from '../../utils/fetcher';
import { toast } from 'react-toastify';
import Wrapper from "../../assets/stylingWrappers/CaseCatalog";
import { Input } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function Court() {
  const court = useLoaderData();

  const COURT_FIELDS = [
    "name", "city", "street", 
    "phoneNumber", "email" 
  ];

  return (
    <Wrapper>
      { COURT_FIELDS.map(field => 
          <h3 key={field}>{court[field]}</h3>
        )
      }
    </Wrapper>
  )
}

export default Court

export async function loader({ params }) {
  try {
    const { courtId } = params;
    const response = await fetcher(`/courts/${courtId}`);
    if (!response.ok) throw response;
    const courts = await response.json();
    return courts;
  } catch (error) {
    toast.error(await error.text());
    return [];
  }
}