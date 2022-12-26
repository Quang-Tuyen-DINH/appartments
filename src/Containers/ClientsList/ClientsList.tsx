import React, { useEffect, useState } from 'react';
import Store from '../../Store/Index';
import { useDispatch } from 'react-redux';
import FilterBar from '../../Components/FilterBar/FilterBar';
import { clients$ } from '../../Shared/Services/Clients.service';
import "./ClientsList.scss";
import { Client } from '../../Shared/Models/Client.model';
import ClientCard from '../../Components/ClientCard/ClientCard';

const ClientsList = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState<Client[]>([]);

  const fetchData = async () => {
    await clients$
      .then((res: any) => {
        dispatch({ type: "ADD_CLIENTS", payload: res });
      })
      .catch((err) => {console.log(err)});
  }

  useEffect(() => {
    fetchData();
    Store.subscribe(() => {
      setClients(Store.getState().clients);
    })
  })

  return (
    <div className="clients-list-container">
      <div className="clients-filter">
        <FilterBar searchData={clients.map((client: Client) => client.search)}/>
      </div>
      <div className="clients-list">
        {clients.map((client: Client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

export default ClientsList