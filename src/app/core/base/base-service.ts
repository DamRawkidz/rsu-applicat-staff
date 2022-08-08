import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IapiResponse<T>{

    data:Array<T>
}

export class BaseService {
    // host:string = 'http://rsu-web.giftver.com'
    host:string = 'https://rsu.71dev.com/app-api'
    hostGemeral:string = 'https://rsu.71dev.com/edu-api'
    hostReport:string = 'https://rsu-reports-api.71dev.com'
    protected prefix:string = `${this.host}/api`
    protected prefixGemeral:string = `${this.hostGemeral}/api`
    protected prefixReport:string = `${this.hostReport}/dev`
    protected fullUrl:string = ''
    protected fullUrlGemeral:string = ''
    protected fullUrlReport:string = ''
    protected getUrl:string = 'http://localhost:8000/Get'

    constructor(
        endpoint:string,
        protected http: HttpClient
    ) {
        this.fullUrl = this.prefix + endpoint
        this.fullUrlGemeral = this.prefixGemeral + endpoint
        this.fullUrlReport = this.prefixReport + endpoint
    }

    // callService<T>(action: string, data?: any[]): Observable<IapiResponse<T>> {
    //     const body = {
    //         apiRequest: {
    //             action: action
    //         }
    //         , data: data || []
    //     };
    //     return this.http.post<IapiResponse<T>>(this.fullUrl, body)
    // }
    getPersonal(){
        return this.http.get('http://localhost:8000/Get')
    }
    getAll<T>(): Observable<T[]>{
        return this.http.get<T[]>(this.fullUrl)
    }
    getAllGemeral<T>(): Observable<T[]>{
        return this.http.get<T[]>(this.fullUrlGemeral)
    }
    search<T>(data: T): Observable<T[]>{
        return this.http.get<T[]>(`${this.fullUrl}${'?'}${'search'}${'='}${data}`)
    }
    add<T>(data: T) : Observable<T> {
        // console.log(data)
        return this.http.post<T>(this.fullUrl,data)
    }
    addGemeral<T>(data: T) : Observable<T> {
        // console.log(data)
        return this.http.post<T>(this.fullUrlGemeral,data)
    }

    getDate<T>(id: number): Observable<T> {
        // console.log(this.fullUrl)
        return this.http.get<T>(`${this.fullUrl}${'/'}${id}`)
    }
    getDateGemeral<T>(id: number): Observable<T> {
        // console.log(id)
        return this.http.get<T>(`${this.fullUrlGemeral}${'/'}${id}`)
    }
    get<T>(id: number): Observable<T> {
        return this.http.get<T>(`${this.fullUrl}/${id}`)
    }
    getGemeral<T>(id: number): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}/${id}`)
    }
    getRooms<T>(id: any): Observable<T> {
        return this.http.get<T>(`${this.fullUrl}${'/'}${id}${'/'}${'rooms'}`)
    }
    getSearch<T>(id: any,name:any): Observable<T> {
        return this.http.get<T>(`${this.fullUrl}${'?'}${name}${'='}${id}`)
    }
    getSearchGemeral<T>(id: any,name:any): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}${'?'}${name}${'='}${id}`)
    }
    getEducation<T>(id: any,name:any): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}${'?'}${name}${'='}${id}`)
    }
    getEducationGemeral<T>(id: any,name:any): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}${'?'}${name}${'='}${id}`)
    }
    getSearchToStr<T>(id: any,name:any,id2:any,name2:any): Observable<T> {
        return this.http.get<T>(`${this.fullUrl}${'?'}${name}${'='}${id}${'&'}${name2}${'='}${id2}`)
    }

    update<T>(id: number,data?: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrl}${'/'}${id}`,data)
    }
    put<T>(data: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrl}`,data)
    }

    updateInterView<T>(data: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrl}`,data)
    }
    approveInterView<T>(id:number,data: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrl}/${'approve'}/${id}`,data)
    }
    updateGemeral<T>(id: number,data: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrlGemeral}${'/'}${id}`,data)
    }
    updateGemeralNoId<T>(data: T) :Observable<Response>{
        return this.http.put<Response>(`${this.fullUrlGemeral}`,data)
    }

    deleteData(id: number) :Observable<Response> {
        return this.http.delete<Response>(`${this.fullUrl}${'/'}${id}`)
    }
    delete<T>(data : T) :Observable<Response> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: data
            
          };
        return this.http.delete<Response>(`${this.fullUrl}`,options)
    }
    deleteDataGemeral(id: number) :Observable<Response> {
        return this.http.delete<Response>(`${this.fullUrlGemeral}${'/'}${id}`)
    }
    query<T>(query: string): Observable<T> {
        return this.http.get<T>(`${this.fullUrl}/${query}`)
    }
    queryGemeral<T>(query: string): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}/${query}`)
    }
    querySearch<T>(query: string): Observable<T> {
        return this.http.get<T>(`${this.fullUrlGemeral}${query}`)
    }
    uploadDocument<HttpHeaderResponse>(target: FormData){
        return this.http.post(this.fullUrl,target,{
            reportProgress: true,
            observe:'events'
        }).pipe(
            map((event) => {
                switch(event.type){
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: `${progress}` };
                    case HttpEventType.Response:
                        return { status: 'success', message:  event.body }; 
                    default:
                        return `Unhandled event: ${event.type}`;
                    }
                }
            ), 
            catchError(err => {               
                return of({ status: 'error', message:  `${err.message}` })
            })
        )
    }
    uploadDocumentID<HttpHeaderResponse>(target: FormData,id){
        return this.http.post(`${this.fullUrl}/${id}`,target,{
            reportProgress: true,
            observe:'events'
        }).pipe(
            map((event) => {
                switch(event.type){
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: `${progress}` };
                    case HttpEventType.Response:
                        return { status: 'success', message:  event.body }; 
                    default:
                        return `Unhandled event: ${event.type}`;
                    }
                }
            ), 
            catchError(err => {               
                return of({ status: 'error', message:  `${err.message}` })
            })
        )
    }
}

