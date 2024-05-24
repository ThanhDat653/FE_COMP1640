export interface ITopContributor {
   fullName: string;
   email: string;
   avatarUrl: string | null;
   facultyName: string;
   contributionCount: number;
}

export interface ICoordinatorDashboard {
   percentageOfContributionByStatus: {
      Approved: number;
      Processed: number;
      Processing: number;
      Published: number;
      Rejected: number;
   };
   topContributorFullName: string;
   totalOfContribution: number;
   totalOfPublishedContribution: number;
   percentageOfFeedbackedContribution: number;
   contributionsVsContributorsCorrelation: number;
   top5ContributorOfFaculty: ITopContributor[];
}

export interface IFacultyRank {
   [key: string]: number;
}

export interface IFacultyContribution {
   facultyName: string;
   publishedCount: number;
   approvedCount: number;
   rejectedCount: number;
}

export interface IManagerDashboard {
   facultyRankByContribution: IFacultyRank;
   percentageOfContributionByStatus: {
      Approved: number;
      Processed: number;
      Processing: number;
      Published: number;
      Rejected: number;
   };
   percentageOfFeedbackedContribution: number;
   numberOfContributionByStatusWithinFaculty: IFacultyContribution[];
   totalOfContribution: number;
   totalOfPublishedContribution: number;
}
