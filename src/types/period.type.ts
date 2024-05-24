export interface IPeriod{
    id: string;
    academicYear: number;
    firstSubmissionDeadline: string;
    secondSubmissionDeadline: string;
    createdByEmail: string;
    createdByFullName: string;
    createdAt: string;
    lastModifiedAt: string;
}

export interface ICreatePeriod{
    academicYear: number;
    firstSubmissionDeadline: string;
    secondSubmissionDeadline: string;
}

export interface IUpdatePeriod{
    firstSubmissionDeadline: string;
    secondSubmissionDeadline: string;
}

export interface IUpdatePeriodParams {
    data: FormData;
    id: string;
 }