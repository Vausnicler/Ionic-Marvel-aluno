import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    private publickey = "";
    private privatekey = "";

    private host = "http://gateway.marvel.com/";


    constructor(private http: HttpClient){}

    public getDados(url: string, parameters: string) {
      let ts = this.generateTs();

      return new Promise((ret) =>{
        this.http.get(this.host + url + '?ts=' + ts + '&apikey=' + this.publickey + '&hash=' + this.getHash(ts) + parameters).subscribe((response) => {
          if(response){
            ret(response);

          } else {
            ret(false);
          }
        })

      })


        }

        private generateTs(){
          return Math.floor(100000 + Math.random() * 900000);
    }

    private getHash(ts){
      return Md5.hashStr(ts + this.privatekey + this.publickey);
    }

    private getKeys(){
      return new Promise((ret) => {
        this.http.get('assets/keys.json').subscribe((keys:any) => {
          this.publickey = keys.public;
          this.privatekey = keys.private;

          ret(true);
      })

    })
  }
}


