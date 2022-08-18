import { Component, Input, OnInit } from '@angular/core';

import { NotesService } from 'src/app/services/notesService/notes.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {

  @Input() noteData: any;
  @Input() userData: any = {};

  constructor(private ns: NotesService) { }

  ngOnInit(): void {
  }

  deleteNote(noteID: string): void {
    this.ns.deleteNote({"userID": this.userData._id, "token": localStorage.getItem("token"), "noteID": noteID})
  }

}
