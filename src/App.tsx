import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';

const heroPortrait =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

const aboutDecor = {
  moon:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
] as const;

const projects = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    ],
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    ],
  },
  {
    number: '03',
    category: 'Client',
    name: 'Solaris Digital',
    images: [
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    ],
  },
] as const;

const services = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
] as const;

const ease = [0.25, 0.1, 0.25, 1] as const;

function SeoMetadata() {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;

    document.title = 'Sana | 3D Creator';

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = url;

    const existingStructuredData = document.head.querySelector<HTMLScriptElement>('script[data-sana-person]');
    const structuredData = existingStructuredData ?? document.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.setAttribute('data-sana-person', 'true');
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Sana',
      jobTitle: '3D Creator',
      url,
    });

    if (!existingStructuredData) {
      document.head.appendChild(structuredData);
    }
  }, []);

  return null;
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const radiusX = rect.width / 2 + padding;
      const radiusY = rect.height / 2 + padding;
      const inside = Math.abs(dx) <= radiusX && Math.abs(dy) <= radiusY;

      setActive(inside);
      if (!inside) {
        x.set(0);
        y.set(0);
        return;
      }

      x.set(dx / strength);
      y.set(dy / strength);
    };

    const onLeave = () => {
      setActive(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    element.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      element.removeEventListener('mouseleave', onLeave);
    };
  }, [padding, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x,
        y,
        willChange: 'transform',
        transition: active ? activeTransition : inactiveTransition,
      }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <a
      href="#contact"
      className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
    </a>
  );
}

function LiveProjectButton({ previewUrl, projectName }: { previewUrl: string; projectName: string }) {
  return (
    <a
      href={previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:px-8 sm:py-3 sm:text-sm"
      aria-label={`View ${projectName} project preview`}
    >
      View Preview
    </a>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[720px] flex-col overflow-x-clip">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="z-20 flex items-center justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        <a className="transition-opacity duration-200 hover:opacity-70" href="#about">About</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#services">Services</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#projects">Projects</a>
        <a className="transition-opacity duration-200 hover:opacity-70" href="#contact">Contact</a>
      </motion.nav>

      <div className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
        >
          Hi, i&apos;m Sana
        </motion.h1>
      </div>

      <FadeIn delay={0.35} y={20} className="mt-auto px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <div className="flex items-end justify-between gap-6">
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0">
        <Magnet padding={150} strength={3} className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <img src={heroPortrait} alt="Sana 3D creator portrait" className="w-full object-contain" />
        </Magnet>
      </FadeIn>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneX = useMotionValue(0);
  const rowTwoX = useMotionValue(0);
  const rows = useMemo(() => [marqueeImages.slice(0, 11), marqueeImages.slice(11)], []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      rowOneX.set(offset - 200);
      rowTwoX.set(-(offset - 200));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [rowOneX, rowTwoX]);

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={rows[0]} transform={rowOneX} row={0} />
        <MarqueeRow images={rows[1]} transform={rowTwoX} row={1} />
      </div>
    </section>
  );
}

function MarqueeRow({
  images,
  transform,
  row,
}: {
  images: readonly string[];
  transform: MotionValue<number>;
  row: number;
}) {
  return (
    <motion.div
      className="flex gap-3"
      style={{
        x: transform,
        willChange: 'transform',
      }}
    >
      {[0, 1, 2].flatMap((copy) =>
        images.map((src, index) => (
          <img
            key={`${row}-${copy}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
          />
        )),
      )}
    </motion.div>
  );
}

const aboutText =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

function AnimatedText({ text: content }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p ref={ref} className="relative max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]">
      {content.split('').map((character, index) => {
        const start = index / content.length;
        const end = Math.min(start + 0.08, 1);
        return (
          <AnimatedCharacter key={`${character}-${index}`} character={character} scrollProgress={scrollYProgress} start={start} end={end} />
        );
      })}
    </p>
  );
}

function AnimatedCharacter({
  character,
  scrollProgress,
  start,
  end,
}: {
  character: string;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="invisible whitespace-pre">
        {character}
      </span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">
      <motion.img
        initial={{ opacity: 0, x: -80, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '50px', amount: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease }}
        src={aboutDecor.moon}
        alt=""
        className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      />
      <motion.img
        initial={{ opacity: 0, x: -80, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '50px', amount: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
        src={aboutDecor.object}
        alt=""
        className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      />
      <motion.img
        initial={{ opacity: 0, x: 80, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '50px', amount: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
        src={aboutDecor.lego}
        alt=""
        className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      />
      <motion.img
        initial={{ opacity: 0, x: 80, y: 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '50px', amount: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        src={aboutDecor.group}
        alt=""
        className="pointer-events-none absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <AnimatedText text={aboutText} />
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <FadeIn delay={0.15} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Services</h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1} y={24}>
            <article className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:grid-cols-[minmax(170px,0.45fr)_1fr] md:gap-10 md:py-12">
              <div className="text-[clamp(3rem,10vw,140px)] font-black leading-none">{service.number}</div>
              <div className="pt-1 sm:pt-2 md:pt-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{service.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
        <div className="border-t border-[rgba(12,12,12,0.15)]" />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const targetScale = 1 - (projects.length - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const topOffset = index * 28;

  return (
    <div ref={ref} className="relative h-[120vh]">
      <div className="sticky top-24 md:top-32">
        <motion.article
          style={{ scale, top: topOffset }}
          className="relative flex h-[min(760px,85vh)] w-full flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        >
        <div className="flex shrink-0 items-end justify-between gap-4">
          <div className="flex min-w-0 items-end gap-5 sm:gap-8 md:gap-12">
            <div className="shrink-0 text-[clamp(3rem,10vw,140px)] font-black leading-[0.8] text-[#D7E2EA]">{project.number}</div>
            <div className="min-w-0 pb-1 md:pb-2">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/60 sm:text-sm">{project.category}</p>
              <h3 className="mt-1 truncate text-[clamp(1.1rem,2.6vw,2.7rem)] font-medium uppercase leading-tight text-[#D7E2EA]">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton previewUrl={project.images[2]} projectName={project.name} />
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[0.8fr_1.2fr] gap-3 sm:mt-6 md:mt-8">
          <div className="grid min-h-0 grid-rows-[clamp(130px,16vw,230px)_clamp(160px,22vw,340px)] gap-3">
            <img src={project.images[0]} alt={`${project.name} preview 1`} loading="lazy" decoding="async" className="h-full min-h-0 w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
            <img src={project.images[1]} alt={`${project.name} preview 2`} loading="lazy" decoding="async" className="h-full min-h-0 w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
          <img src={project.images[2]} alt={`${project.name} main preview`} loading="lazy" decoding="async" className="h-full min-h-0 w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
        </div>
        </motion.article>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-28 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading mb-12 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20">Project</h2>
      </FadeIn>
      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
        <ContactFooter />
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" className="mt-16 bg-[#0C0C0C] px-0 pb-10 pt-20 sm:mt-20 sm:pb-12 md:mt-24 md:pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-[#D7E2EA]/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/50">Available for selected projects</p>
          <p className="mt-3 inline-flex items-center gap-2 text-[clamp(1.5rem,4vw,4rem)] font-medium uppercase leading-none text-[#D7E2EA]">
            Contact Sana
            <MoveUpRight className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
          </p>
        </div>
        <p className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 sm:text-sm">Sana -- 3D Creator</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <SeoMetadata />
      <main className="overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      </main>
    </>
  );
}
