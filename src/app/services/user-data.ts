import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserData[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.transformUser(user)))
    );
  }

  private transformUser(user: User): UserData {
    const positions = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'Marketing Manager', 'DevOps Engineer', 'Sales Manager', 'HR Manager', 'Senior Engineer', 'UX Designer'];
    const departments = ['Engineering', 'Product', 'Design', 'Analytics', 'Marketing', 'Sales', 'HR'];
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      position: positions[user.id % positions.length],
      salary: Math.floor(Math.random() * 50000) + 50000,
      department: departments[user.id % departments.length]
    };
  }
}
