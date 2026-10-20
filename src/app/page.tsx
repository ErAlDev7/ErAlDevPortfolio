import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { Services, Process, Technology, About } from '@/components/Sections';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Process />
      <Technology />
      <About />
      <Contact />
    </>
  );
}
