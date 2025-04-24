import MyTickets from "./my-tickets/MyTickets";
import NavbarLandingPage from "./NavbarList/NavbarLandingPage";

const LandingMyTickets = () => {
  return (
    <div>
      <NavbarLandingPage />
      <main className="min-h-screen">
        <MyTickets />
      </main>
    </div>
  );
};

export default LandingMyTickets;
