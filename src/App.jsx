import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home";
import EventsCompetitions from "./pages/Events&Competitions/Events&Competitions";
import HighPerformance from "./pages/HighPerformance/HighPerformance"
import Coaches from "./pages/Coaches/Coaches";
import TechnicalOfficials from "./pages/TechnicalOfficials/TechnicalOfficials";
import KidsAthletics from "./pages/KidsAthletics/KidsAthletics";
import GetInvolved from "./pages/GetInvolved/GetInvolved";
import Navigation from "./components/Navigation";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import SAConstitution from "./pages/AboutUs/sub/SAConstitution";
import BoardandSubCommittees from "./pages/AboutUs/sub/BoardandSubCommittees";
import SecretariatStaff from "./pages/AboutUs/sub/SecretariatStaff";
import AthletesCommission from "./pages/AboutUs/sub/AthletesCommission";
import AffiliateMembers from "./pages/AboutUs/sub/AffiliateMembers";
import Policies from "./pages/AboutUs/sub/Policies";
import SafeSport from "./pages/AboutUs/sub/SafeSport";
import CorporateSponsors from "./pages/AboutUs/sub/CorporateSponsors";
import LatestNews from "./pages/AboutUs/sub/LatestNews";
import AnnualGeneralMeeting from "./pages/AboutUs/sub/AnnualGeneralMeeting";
import GettingtoSAOffice from "./pages/AboutUs/sub/GettingtoSAOffice";
import Calendar from "./pages/Events&Competitions/sub/Calendar";
import SAEventsCompetitions from "./pages/Events&Competitions/sub/SAEvents&Competitions";
import InternationalCompetitions from "./pages/Events&Competitions/sub/InternationalCompetitions";
import ResultSearch from "./pages/Events&Competitions/sub/ResultSearch";
import VolunteeringforEvents from "./pages/Events&Competitions/sub/VolunteeringforEvents";
import Resources from "./pages/Events&Competitions/sub/Resources";
import NationalSquad from "./pages/HighPerformance/sub/NationalSquad";
import AthleteInformation from "./pages/HighPerformance/sub/AthleteInformation";
import SelectionPolicy from "./pages/HighPerformance/sub/SelectionPolicy";
import AntiDoping from "./pages/HighPerformance/sub/AntiDoping";
import DTEHomeofAthletics from "./pages/HighPerformance/sub/DTEHomeofAthletics";
import Applyforsanction from "./pages/HighPerformance/sub/Applyforsanction";
import SAOCTC from "./pages/HighPerformance/sub/SAOCTC";
import IncomeInsurance from "./pages/HighPerformance/sub/IncomeInsurance";

import SpexCarding from "./pages/HighPerformance/sub/SpexCarding";
import NationalRecordsandStatistics from "./pages/HighPerformance/sub/NationalRecordsandStatistics";
import RegionalTrainingCentre from "./pages/HighPerformance/sub/RegionalTrainingCentre";
import SACoachRegistry from "./pages/Coaches/sub/SACoachRegistry";
import CoachEducationDevelopment from "./pages/Coaches/sub/CoachEducationDevelopment";
import CoachingCourses from "./pages/Coaches/sub/CoachingCourses";
import WorkshopsCOP from "./pages/Coaches/sub/WorkshopsCOP";
import CoachSG from "./pages/Coaches/sub/CoachSG";
import SATechnicalOfficialRegistry from "./pages/TechnicalOfficials/sub/SATechnicalOfficialRegistry";
import SATechnicalOfficialsPolicyandFramework from "./pages/TechnicalOfficials/sub/SATechnicalOfficialsPolicyandFramework";
import Courses from "./pages/TechnicalOfficials/sub/Courses";
import Workshops from "./pages/TechnicalOfficials/sub/Workshops";
import NotFoundPage from "./pages/404";
import ResourcesHigh from "./pages/HighPerformance/sub/Resources";
import ResourcesCoaches from "./pages/Coaches/sub/Resources";
import Header from "./components/Header";
import AthleteList from "./pages/AthleteList";
import AthleteProfile from "./pages/AthleteProfile";
import LineChart from "./components/LineChart";
import DetailArticle from "./pages/DetailArticle";
import AboutKA from "./pages/KidsAthletics/sub/AboutKA";
import ResourcesKA from "./pages/KidsAthletics/sub/ResourcesKA";
import ContactUs from "./pages/GetInvolved/sub/ContactUs";
import LookforAClub from "./pages/GetInvolved/sub/LookforAClub";
import LookforACoach from "./pages/GetInvolved/sub/LookforACoach";
import SAMembership from "./pages/GetInvolved/sub/SAMembership";
import SAAffiliationApplication from "./pages/GetInvolved/sub/SAAffiliationApplication";
import MissionStatement from "./pages/AboutUs/sub/MissionStatement";
import VisionStatement from "./pages/AboutUs/sub/VisionStatement";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount";
import TestSeacrh from "./pages/TestSeacrh";
import SearchPage from "./pages/SearchPage";
import SearchResults from "./components/SearchResults";
// import "./firebase.js";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivacyStatement from "./pages/PrivacyStatement";
import EventRegister from "./pages/EventRegister";
import UserProfile from "./pages/UserProfile";
import { getToken, isAuthenticated, removeClubPvid, removeReferencePvid, removeToken, removeUserPvid, removeUserType } from '../src/utils/auth';
import Payment from "./pages/Payment";
import ManageParticipant from "./pages/ManageParticipant";
import ProfileAccount from "./pages/ProfileAccount";
import HistoryPayment from "./pages/HistoryPayment";
import EventsProfilePage from "./components/EventsProfilePage";
import EventProfile from "./pages/EventProfile";
import ManageAthlete from "./pages/ManageAthlete";
import PermissionPrompt from "./PermissionPrompt";
import SafariPushNotification from "./SafariPushNotification";
import CompetitorsCorner from "./pages/HighPerformance/sub/CompetitorsCorner";
// import NotificationComponent from "./NotificationComponent";
import SARecords from "./pages/HighPerformance/sub/SARecords";
import PreviewPage from "./components/PreviewPage";
import QRCodePage from "./components/QRCodePage";
import PaymentStatusPage from "./components/PaymentStatusPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
function App() {
  useEffect(() => {
    const token = getToken();
    const lastTokenRemovalDate = localStorage.getItem('lastTokenRemovalDate');
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    if (token) {
      if (!lastTokenRemovalDate || parseInt(lastTokenRemovalDate) !== currentDay) {
        removeToken(); // Hapus token
        removeUserType();
        removeClubPvid();
        removeUserPvid();
        removeReferencePvid();
        isAuthenticated();
        localStorage.setItem('lastTokenRemovalDate', currentDay.toString()); // Simpan tanggal terakhir
        // window.location.href = '/login';
        window.location.reload();
      }
    }
  }, []); 

  return (
    <Router>
    {/* <Header /> */}
    {/* <firebaseConfig /> */}
    {/* <NotificationComponent /> */}
    {/* <SafariPushNotification /> */}
    {/* <PermissionPrompt /> */}
    <Navigation />
    <ScrollToTopOnMount />
      <Routes>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={isAuthenticated() ? <Navigate to="/profile" /> : <Register />} />
        <Route path="/login" element={!isAuthenticated() ? (
            <Login />
          ) : (
            <Navigate to="/account/profile" />
          )} 
        />
        <Route path="/account" element={isAuthenticated() ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/account/:activeTab?" element={isAuthenticated() ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/privacy-statement" element={<PrivacyStatement />} />
        <Route path="/event-register/:pvid" element={isAuthenticated() ? <EventRegister /> : <Navigate to="/login" />} />
        <Route path="/account/profile" element={isAuthenticated() ? <ProfileAccount /> : <Navigate to="/login" />} />
        <Route path="/account/history-payment" element={isAuthenticated() ? <HistoryPayment /> : <Navigate to="/login" />} />
        <Route path="/account/events" element={isAuthenticated() ? <EventProfile /> : <Navigate to="/login" />} />
        <Route path="/account/manage-athlete" element={isAuthenticated() ? <ManageAthlete /> : <Navigate to="/login" />} />
        <Route path="/account/events/submit-participant/:pvid" element={isAuthenticated() ? <ManageParticipant /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isAuthenticated() ? <Payment /> : <Navigate to="/login" />} />
        <Route path="/event-register" element={isAuthenticated() ? <Navigate to="/events-&-competitions/calendar" /> : <Navigate to="/login" />} />

        <Route path="/latest-news" element={<LatestNews/> } />
        <Route path="/latest-news/:articleKey" element={<DetailArticle /> } />
        <Route path="/payment-status" element={<PaymentStatusPage />} />
        <Route path="/qr-code" element={<QRCodePage/>} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/chart" element={<LineChart/>}/>
        <Route path="/athlete-list" element={<AthleteList/> }/>
        <Route path="/athlete-profile/:pvid" element={<AthleteProfile /> } />
        <Route path="/" element={<Home />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-us/about-us" element={<AboutUs />} />
        <Route path="/about-us/mission-and-vision" element={<MissionStatement />} />
        {/* <Route path="/about-us/vision-statement" element={<VisionStatement />} /> */}
        <Route path="/about-us/sa-constitution" element={<SAConstitution/>} />
        <Route path="/about-us/board-and-sub-committees" element={<BoardandSubCommittees/> } />
        <Route path="/about-us/secretariat-staff" element={<SecretariatStaff/> } />
        <Route path="/about-us/athletes-commission" element={<AthletesCommission/> } />
        <Route path="/about-us/affiliate-members" element={<AffiliateMembers/> } />
        <Route path="/about-us/policies" element={<Policies/> } />
        <Route path="/about-us/safe-sport" element={<SafeSport/> } />
        <Route path="/about-us/corporate-sponsors" element={<CorporateSponsors/> } />
        <Route path="/about-us/latest-news" element={<LatestNews/> } />
        <Route path="/about-us/latest-news/:articleKey" element={<DetailArticle /> } />
        <Route path="/about-us/annual-general-meeting" element={<AnnualGeneralMeeting/> } />
        <Route path="/about-us/getting-to-sa-office" element={<GettingtoSAOffice/> } />

        <Route path="/events-&-competitions" element={ <Navigate to="/events-&-competitions/calendar" /> } />
        <Route path="/events-&-competitions/calendar" element={<Calendar/> } />
        <Route path="/events-&-competitions/calendar/:articleKey" element={<DetailArticle /> } />
        <Route path="/events-&-competitions/sa-events-&-competitions" element={<SAEventsCompetitions/> } />
        <Route path="/events-&-competitions/international-competitions" element={<InternationalCompetitions/> } />
        <Route path="/events-&-competitions/result-search" element={<ResultSearch/> } />
        <Route path="/events-&-competitions/volunteering-for-events" element={<VolunteeringforEvents/> } />
        <Route path="/events-&-competitions/resources" element={<Resources/> } />

        <Route path="/high-performance" element={ <Navigate to="/high-performance/athlete-information" /> } />
        <Route path="/high-performance/national-squad" element={<NationalSquad/> } />
        <Route path="/high-performance/athlete-information" element={<AthleteInformation/> } />
        <Route path="/high-performance/selection-policy" element={<SelectionPolicy />} />
        <Route path="/high-performance/sa-records" element={<SARecords />} />
        <Route path="/high-performance/anti-doping" element={<AntiDoping/> } />
        <Route path="/high-performance/dte-home-of-athletics" element={<DTEHomeofAthletics/>} />
        <Route path="/high-performance/competitor’s-corner" element={<CompetitorsCorner/>} />
        <Route path="/high-performance/apply-for-sanction" element={<Applyforsanction/>}/>
        <Route path="/high-performance/sa-octc" element={<SAOCTC/>}/>
        <Route path="/high-performance/spexcarding" element={<SpexCarding/>}/>
        <Route path="/high-performance/national-records-and-statistics" element={<NationalRecordsandStatistics/>}/>
        <Route path="/high-performance/regional-training-centre" element={<RegionalTrainingCentre/>}/>
        <Route path="/high-performance/resources" element={<ResourcesHigh />} />
        <Route path="/high-performance/athlete-development" element={<IncomeInsurance />} />
        

        <Route path="/coaches" element={<Navigate to="/coaches/sa-coach-registry" />} />
        <Route path="/coaches/sa-coach-registry" element={<SACoachRegistry/>}/>
        <Route path="/coaches/coach-education-development" element={<CoachEducationDevelopment/>}/>
        <Route path="/coaches/coaching-courses" element={<CoachingCourses/>} />
        <Route path="/coaches/workshops-cop" element={<WorkshopsCOP/>}/>
        <Route path="/coaches/coachsg" element={<CoachSG/>}/>
        <Route path="/coaches/resources" element={<ResourcesCoaches/>} />

        <Route path="/technical-officials" element={<Navigate to="/technical-officials/sa-technical-official-registry" />} />
        <Route path="/technical-officials/sa-technical-official-registry" element={<SATechnicalOfficialRegistry/>}/>
        <Route path="/technical-officials/sa-technical-officials-policy-and-framework" element={<SATechnicalOfficialsPolicyandFramework/>}/>
        <Route path="/technical-officials/courses" element={<Courses/>}/>
        <Route path="/technical-officials/workshops" element={<Workshops/>} />

        <Route path="/kids-athletics" element={<KidsAthletics />} />
        <Route path="/kids-athletics/kids-athletics" element={<KidsAthletics />} />
        <Route path="/kids-athletics/about-ka-+-register-now" element={<AboutKA />} />
        <Route path="/kids-athletics/resources" element={<ResourcesKA />} />

        <Route path="/get-involved" element={<Navigate to="/get-involved/contact-us" />} />
        <Route path="/get-involved/sa-affiliation-application" element={<SAAffiliationApplication />}/>
        <Route path="/get-involved/contact-us" element={<ContactUs />} />
        <Route path="/get-involved/look-for-a-club" element={<LookforAClub />} />
        <Route path="/get-involved/look-for-a-coach" element={<LookforACoach />} />
        <Route path="/get-involved/sa-membership" element={<SAMembership />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    <Subscribe />
    <Footer />
    </Router>
  );
}

export default App;
