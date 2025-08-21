import AboutHero from "../components/about/AboutHero";
import Clients from "../components/about/Clients";
import Stats from "../components/about/Stats";
import Team from "../components/about/Team";

export default function AboutPage(){
    return <main>
        <AboutHero/>
        <Stats />
        <Team />
        <Clients />
    </main>
}