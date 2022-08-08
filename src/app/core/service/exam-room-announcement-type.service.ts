import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamRoomAnnouncementTypeService extends BaseService {

  constructor(public http: HttpClient) 
   { super('/app/exam_room_announcement_types', http); }
}
