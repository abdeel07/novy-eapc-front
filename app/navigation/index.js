import Icon from '@mdi/react';
import { mdiOrderBoolAscendingVariant } from '@mdi/js';
import { mdiCheckboxMarkedOutline } from '@mdi/js';
import { HomeOutlined } from '@mui/icons-material';
import { mdiLaptopAccount } from '@mdi/js';




const navigation = () => {
    return [
      {
        title: 'Dashboard',
        icon: <HomeOutlined />,
        path: '/'
      },
      {
        title: 'Mes objectives',
        icon: <Icon path={mdiCheckboxMarkedOutline} size={1} />,
        path: '/mes-objectives'
      },
     
      {
        title: 'Tous les objectives',
        icon: <Icon path={mdiOrderBoolAscendingVariant} size={1} />,
        path: '/tous-les-objectves',
    
      },
      {
        title: 'Tous les entretiens',
        icon: 
        <Icon path={mdiLaptopAccount} size={1} />,
        path: 'tous-les-entretiens',
     
      },
   
    
    ]
  }
  
  export default navigation