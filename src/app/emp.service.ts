import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
private api_Url = "http://localhost:3000/employee_Data/"
  constructor(private http:HttpClient) { }

  get_Employees(){
    return this.http.get(this.api_Url)
  }

  post_Employees(obj:any){
    return this.http.post(this.api_Url,obj)
  }

  update_Employees(id:any, obj:any){
    return this.http.put(this.api_Url+id,obj)
  }

  delete_Employees(id:any){
    return this.http.delete(this.api_Url+id)
  }
}
