import Header from "@/components/landingpage/Header";
import Main from "@/components/landingpage/Main";

export default function LandingPage() {
  return (
    <>
      <div className="fixed -z-10 h-screen w-screen bg-gradient-to-b from-myGreenA/80 to-white/50 bg-cover bg-fixed bg-no-repeat" />
      <div className="fixed -z-[11] h-screen w-screen bg-dots-background bg-cover bg-fixed bg-no-repeat" />
      <Header />
      <Main />
    </>
  );
}
