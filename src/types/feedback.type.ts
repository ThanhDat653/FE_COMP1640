export interface IFeedback {
   id: string;
   content: string;
   contributionId: string;
   createdByEmail: string;
   createdByFullName: string;
   createAt: string;
   lastModifiedAt: string;
}

export interface IUploadFeedback {
   content: string;
   contributionId: string;
}
