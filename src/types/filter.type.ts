export type IFilter = {
   facultyId?: string;
   role?: string;
   period?: string;
   status?: string;
   email?: string;
   search?: string;
   createByEmail?: string;
};

export interface IParamsSlice {
   filters?: IFilter;
   sorts?: string;
   page?: number;
   pageSize?: number;
}

export interface IParamsAxios {
   filters?: string;
   sorts?: string;
   page?: number;
   pageSize?: number;
}

export const generateParams = (
   filters?: string,
   sorts?: string,
   page?: number,
   pageSize?: number,
): IParamsAxios => {
   return {
      filters: filters || "",
      sorts: sorts || "",
      page: page || 1,
      pageSize: pageSize || 10,
   };
};
