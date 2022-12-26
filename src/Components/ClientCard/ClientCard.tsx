import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { Client } from '../../Shared/Models/Client.model';
import "./ClientCard.scss"
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ChairIcon from '@mui/icons-material/Chair';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ClientCard = (props: {client: Client}) => {
  const [lastName, setLastName] = useState<string>(props.client.lastName);
  const [firstName, setFirstName] = useState<string>(props.client.firstName);
  const [phone, setPhone] = useState<string>(props.client.phone);
  const [email, setEmail] = useState<string>(props.client.email);
  const [search, setSearch] = useState<Client["search"]>(props.client.search);

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        width: 60, 
        height: 60,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <Card sx={{ maxWidth: 345, borderLeft: 3, borderColor: stringToColor(`${firstName} ${lastName}`) }} className="user-card-container">
      <div className="content-header">
        <Avatar className="client-avatar" {...stringAvatar(`${firstName} ${lastName}`)} />
        <Typography className="client-name" variant="h5" component="div">{firstName} {lastName}</Typography>
      </div>
      <div className="content-body">
        <Typography className="client-informations" variant="body2">
          <span>
            <SmartphoneIcon className="client-icon" fontSize="small" color="action" />
            {phone}
            <ContentCopyIcon className="client-copy-icon" fontSize="small" onClick={() =>  navigator.clipboard.writeText(phone)}/>
          </span>
          <span>
            <EmailIcon className="client-icon" fontSize="small" color="action" />
            {email}
            <ContentCopyIcon className="client-copy-icon" fontSize="small" onClick={() =>  navigator.clipboard.writeText(email)}/>
          </span>
          <span><ChairIcon className="client-icon" fontSize="small" color="action" />{search.surface} m<sup>2</sup></span>
          <span><EuroSymbolIcon className="client-icon" fontSize="small" color="action" />{search.budget} €</span>
          <span><HomeIcon className="client-icon" fontSize="small" color="action" />{search.rooms} {search.rooms > 1 ? "rooms" : "room"}</span>
        </Typography>
      </div>
    </Card>
  )
}

export default ClientCard