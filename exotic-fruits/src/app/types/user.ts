export interface User {
    _id?: string;
    tel: string;
    email: string;
    username: string;
    password?: string;
  }
  
  export interface UserForAuth {
    username: string;
    email: string;
    tel: string;
    password: string;
    id: string;
  }
  
  export interface ProfileDetails {
    username: string;
    email: string;
    tel: string;
  }
  