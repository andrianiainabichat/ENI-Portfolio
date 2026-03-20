import Hero         from "../components/sections/Hero";
import About        from "../components/sections/About";
import Formations   from "../components/sections/Formations";
import StudentLife  from "../components/sections/StudentLife";
import Statistics   from "../components/sections/Statistics";
import Partners     from "../components/sections/Partners";
import Contact      from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Formations />
      <StudentLife />
      <Statistics />
      <Partners />
      <Contact />
    </>
  );
}
