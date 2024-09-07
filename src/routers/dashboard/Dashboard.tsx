import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      Dashboard
      <Button onClick={() => navigate('/')}>Back to login</Button>
    </div>
  );
}
