import React, { useEffect, useState } from 'react';
import "./FilterBar.scss"
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { Client } from '../../Shared/Models/Client.model';
import Store from '../../Store/Index';
import { Filters } from '../../Shared/Models/Filters.model';

function FilterBar(props: {resetFilter: any, filterClients: any}) {
  const [clients, setClients] = useState<Client[]>([]);
  const [surface, setSurface] = useState<number[]>([]);
  const [maxSurface, setMaxSurface] = useState<number>(0);
  const [budget, setBudget] = useState<number[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(0);
  const [rooms, setRooms] = useState<number[]>([]);
  const [maxRooms, setMaxRooms] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    surface: {
      range: []
    },
    budget: {
      range: []
    },
    rooms: {
      range: []
    }
  });
  const [filtered, setFiltered] = useState<boolean>(false);

  useEffect(() => {
    Store.subscribe(() => {
      setClients(Store.getState().clients);
    })
    if(clients.map(client => client.search).length > 0) {
      calculateMinMax(clients.map(client => client.search));
      setMaxSurface(Math.max(...surface));
      setMaxBudget(Math.max(...budget));
      setMaxRooms(Math.max(...rooms));
    }
  }, [clients, maxSurface, maxBudget, maxRooms])

  const sendFilters = () => {
    props.filterClients(filters)
  }

  const updateFilters = (filterArr: {key: string, range: number[]}) => {
    if(filterArr.key === "surface") {
      setFilters(
        filters => ({
          ...filters,
          ...{
            surface: {
              range: [...filterArr.range]
            }
          }
        })
      )
    } else if (filterArr.key === "budget") {
      setFilters(
        filters => ({
          ...filters,
          ...{
            budget: {
              range: [...filterArr.range]
            }
          }
        })
      )
    } else {
      setFilters(
        filters => ({
          ...filters,
          ...{
            rooms: {
              range: [...filterArr.range]
            }
          }
        })
      )
    }
    setFiltered(true);
    sendFilters();
  }

  const handleSurface = (event: Event, newValue: number | number[]) => {
    setSurface(newValue as number[]);
    updateFilters({
      key: "surface",
      range: newValue as number[]
    });
  }

  const handleBudget = (event: Event, newValue: number | number[]) => {
    setBudget(newValue as number[]);
    updateFilters({
      key: "budget",
      range: newValue as number[]
    });
  }

  const handleRooms = (event: Event, newValue: number | number[]) => {
    setRooms(newValue as number[]);
    updateFilters({
      key: "rooms",
      range: newValue as number[]
    });
  }

  const getMin = (arr: number[]) => {
    return arr.reduce((p, v) => {
      return p < v ? p : v;
    });
  }

  const getMax = (arr: number[]) => {
    return arr.reduce((p, v) => {
      return p > v ? p : v;
    });
  }

  const calculateMinMax = (searchData: Client["search"][]) => {
    const surfaceArr = searchData.map((search: Client["search"]) => {
      return search.surface;
    })
    const budgetArr = searchData.map((search: Client["search"]) => {
      return search.budget;
    })
    const roomsArr = searchData.map((search: Client["search"]) => {
      return search.rooms;
    })

    setSurface([getMin(surfaceArr), getMax(surfaceArr)]);
    setBudget([getMin(budgetArr), getMax(budgetArr)]);
    setRooms([getMin(roomsArr), getMax(roomsArr)]);
    
    setFilters(
      filters => ({
        ...filters,
        ...{
          surface: {
            range: [...surface]
          },
          budget: {
            range: [...budget]
          },
          rooms: {
            range: [...rooms]
          }
        }
      })
    )
  }

  const resetFilter = () => {
    calculateMinMax(clients.map(client => client.search));
    setFiltered(false);
    props.resetFilter(false);
  }

  return (
    <div className="clients-filter-container">
      <div className="filters-box">
        <div className="filter">
          <span className="filter-label">Surface</span>
          <div className="filter-body">
            <span className="statics">{Math.min(...surface)}</span>
            <div className="filter-bar">
              <Slider
                max={maxSurface}
                step={10}
                value={surface}
                onChange={handleSurface}
                valueLabelDisplay="auto"
              />
            </div>
            <span className="statics">{Math.max(...surface)}</span>
          </div>
        </div>
        <div className="filter">
          <span className="filter-label">Budget</span>
          <div className="filter-body">
            <span className="statics">{Math.min(...budget)}</span>
            <div className="filter-bar">
              <Slider
                max={maxBudget}
                step={1000}
                value={budget}
                onChange={handleBudget}
                valueLabelDisplay="auto"
              />
            </div>
            <span className="statics">{Math.max(...budget)}</span>
          </div>
        </div>
        <div className="filter">
          <span className="filter-label">Rooms</span>
          <div className="filter-body">
            <span className="statics">{Math.min(...rooms)}</span>
            <div className="filter-bar">
              <Slider
                max={maxRooms}
                step={1}
                value={rooms}
                onChange={handleRooms}
                valueLabelDisplay="auto"
              />
            </div>
            <span className="statics">{Math.max(...rooms)}</span>
          </div>
        </div>
      </div>
      {filtered === true && 
        <Button className="clear-filters" variant="contained" onClick={resetFilter}>
          Clear Filters
        </Button>
      }
      {filtered === false && 
        <Button className="clear-filters" variant="contained" disabled>
          Clear Filters
        </Button>
      }
    </div>
  )
}

export default FilterBar