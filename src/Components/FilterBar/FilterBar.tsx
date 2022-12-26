import React, { useEffect, useState } from 'react';
import "./FilterBar.scss"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Client } from '../../Shared/Models/Client.model';

function FilterBar(props: {searchData: Client["search"][]}) {
  const [surface, setSurface] = useState<number[]>([]);
  const [maxSurface, setMaxSurface] = useState<number>(0);
  const [budget, setBudget] = useState<number[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(0);
  const [rooms, setRooms] = useState<number[]>([]);
  const [maxRooms, setMaxRooms] = useState<number>(0);

  useEffect(() => {
    if(props.searchData.length > 0) {
      calculateMinMax(props.searchData);
      setMaxSurface(Math.max(...surface));
      setMaxBudget(Math.max(...budget));
      setMaxRooms(Math.max(...rooms));
    }
  }, [props.searchData, maxSurface, maxBudget, maxRooms])

  const handleSurface = (event: Event, newValue: number | number[]) => {
    setSurface(newValue as number[]);
  }

  const handleBudget = (event: Event, newValue: number | number[]) => {
    setBudget(newValue as number[]);
  }

  const handleRooms = (event: Event, newValue: number | number[]) => {
    setRooms(newValue as number[]);
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
              step={100}
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
    </div>
  )
}

export default FilterBar