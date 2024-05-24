export interface IFaculty {
   id: string;
   name: string;
   createAt: string;
   lastModifyiedAt: string;
   createByEmail: string;
}

export interface ICreateFaculty{
   name: string;
}

export interface IEditFaculty{
   id: string;
   name: string;
}