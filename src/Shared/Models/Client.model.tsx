export interface Client {
  id: string,
  lastName: string,
  firstName: string,
  phone: string,
  email: string,
  search : {
    surface: number,
    budget: number,
    room: number
  }
}