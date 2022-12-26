import React, { useEffect, useState } from 'react';
import Store from '../../Store/Index';
import { useDispatch } from 'react-redux';
import FilterBar from '../../Components/FilterBar/FilterBar';
import { clients$ } from '../../Shared/Services/Clients.service';
import "./ClientsList.scss";
import { Client } from '../../Shared/Models/Client.model';
import ClientCard from '../../Components/ClientCard/ClientCard';
import { Filters } from '../../Shared/Models/Filters.model';

const ClientsList = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [filtered, setFiltered] = useState<boolean>(false);

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
  }, [])

  const filterClients = (filters: Filters) => {
    let filteredResult = clients.filter((client: Client) => {
      return (
        ((Math.min(...filters.surface.range) <= client.search.surface) && client.search.surface <= Math.max(...filters.surface.range))
        &&
        ((Math.min(...filters.budget.range) <= client.search.budget) && client.search.budget <= Math.max(...filters.budget.range))
        &&
        ((Math.min(...filters.rooms.range) <= client.search.rooms) && client.search.rooms <= Math.max(...filters.rooms.range))
      )
    })
    setFilteredClients(filteredResult);
    setFiltered(true);
  }

  const resetFilter = (reset: boolean) => {
    setFiltered(reset);
    setFilteredClients([]);
  }

  return (
    <div className="clients-list-container">
      <div className="clients-filter">
        <FilterBar filterClients={filterClients} resetFilter={resetFilter}/>
      </div>
      <div className="clients-list">
        {filtered === false && clients.map((client: Client) => (
          <ClientCard key={client.id} client={client} />
        ))}

        {filtered === true && filteredClients.map((client: Client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

export default ClientsList