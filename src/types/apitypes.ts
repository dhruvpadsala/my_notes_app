export interface RegisterUserRequest {
  user_name?: string;
}

export interface AddNotesRequest {
  note_id: Number | null;
  user_id: string | null;
  title?: string;
  description?: string;
  notes_time: string | Date;
}

export interface User {
  USERID: string;
  DISPLAYNAME: string;
  CREATEDAT: string; // from API it's probably a string, not Date
}

export interface RegisterUserResponse {
  data: [
    {
      USERID: User[][];
      DISPLAYNAME: string;
      CREATEDAT: Date;
    }
  ];
  success: boolean;
}
