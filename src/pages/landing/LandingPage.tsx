import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { getContributionList } from "../../redux/slices/contributionSlice";
import ContributionList from "../../components/ContributionList/ContributionList";
import useRedux from "../../hooks/useRedux";
import { useSearchParams } from "react-router-dom";

const LandingPage = () => {
   const { dispatch, appSelector } = useRedux();
   const [searchParams] = useSearchParams();
   const { list } = appSelector((state) => state.contribution);
   const { faculty } = appSelector((state) => state.faculty);

   useEffect(() => {
      const query = searchParams.get("search") as string;

      dispatch(
         getContributionList({
            filters: {
               status: "published",
               search: query,
            },
            pageSize: 30,
         }),
      );
   }, [dispatch, searchParams]);

   return (
      <>
         <HeroSection />
         <div className="mt-0 lg:mt-16">
            {faculty.map((faculty) => {
               const contributions = list.filter(
                  (contribution) => contribution.facultyId === faculty.id,
               );
               return (
                  <ContributionList
                     key={faculty.id}
                     type="category"
                     categoryName={faculty.name}
                     data={contributions.slice(0, 4)}
                     for="guest"
                  />
               );
            })}
         </div>
      </>
   );
};

export default LandingPage;
