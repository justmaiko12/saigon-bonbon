"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import { EditProvider } from "@/components/EditMode";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "TEE TRAN",
    title: "Founder & CEO",
    image: "/assets/tee-portrait.jpg",
    bio: [
      "I have spent most of my career helping brands define who they are and how they connect with people. Strategy, storytelling, and creative direction have shaped my work for over a decade. Saigon Bonbon is different. This is personal. It brings together everything I have learned with everything I care about. Culture, identity, and the belief that what we create should carry meaning.",
    ],
  },
  {
    name: "BAO HAN",
    title: "Co-Founder & Brand Ambassador",
    image: "/assets/bao-han-portrait.jpg",
    bio: [
      "Bao Han is best known for her performances on Paris By Night, where she became a beloved voice for Vietnamese audiences around the world. Her career left a lasting imprint on the community. After being diagnosed with Parkinson\u2019s disease, she stepped away from the stage, but not from what she represents. Saigon Bonbon continues that presence in a new form, with the same heart and spirit.",
    ],
  },
  {
    name: "MICHAEL LE",
    title: "Co-Founder & Creative Director",
    subtitle: "@justmaiko",
    image: "/assets/michael-portrait.jpg",
    bio: [
      "Michael Le is one of the most influential dancers and digital creators in the world, with a global audience of more than 50 million followers. His work has helped define an entire era of short form dance content, turning choreography into something that travels across cultures and reaches millions in real time. At Saigon Bonbon, he leads creative expression. Through movement, storytelling, and culture in motion, he brings the brand into the world in a way that cannot be replicated. He represents what comes next.",
    ],
  },
];

export default function OurStoryPage() {
  const [bgColor, setBgColor] = useState("linear-gradient(180deg, #FF107A 0%, #FF5E00 100%)");

  return (
    <EditProvider>
      <main className="relative min-h-screen">
        <Background color={bgColor} />
        <Navigation />

        {/* Hero / Intro */}
        <section className="relative pt-32 md:pt-40 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bolero iridescent-text text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-wide mb-8"
            >
              OUR STORY
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/85 text-sm md:text-base leading-relaxed font-medium space-y-4"
            >
              <p>Saigon Bonbon did not begin as a business idea. It began with a promise. When you get married, you say a lot of things. To love. To support. To stand by each other. In sickness and in health. I said those words to my wife, Bao Han, like most people do, without fully understanding what they meant. And then life tested that promise.</p>
              <p>Many people know Bao Han from Paris By Night. She was a Vietnamese pop icon. A performer. A voice people grew up with. But by the time I met her, that chapter had already closed. She had been diagnosed with Parkinson{"\u2019"}s disease. The stage, the performances, the life she knew, all of it changed.</p>
              <p>Somewhere in that moment, I began to see things differently. Culture does not stay the same. It does not belong only to the past. It evolves. That idea became the foundation for Saigon Bonbon. What we carry, our traditions, our stories, our identity, does not disappear. It finds new ways to show up. In music. In movement. And sometimes in the smallest, most unexpected places. For us, it showed up in candy.</p>
              <p>{"\u201C"}This Is Our Flavor{"\u201D"} is how we think about everything. Not just flavor as taste, but flavor as identity. It is where you come from. It is how you express yourself. It is what you choose to carry forward, and what you choose to change.</p>
              <p>As Vietnamese Americans, we are not here to preserve culture exactly as it was. We are here to build on it. To make it feel current. To make it feel like us. And to share it with anyone who connects with it, whether you grew up in it or are just discovering it.</p>
              <p>Saigon Bonbon is only the beginning. This is not about candy. It is about culture moving forward. And finding new ways to live in everyday life.</p>
              <p className="font-bold italic text-white/95">This is our flavor.</p>
            </motion.div>
          </div>
        </section>

        {/* Founders Heading */}
        <section className="relative pt-12 md:pt-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-10%" }}
              className="font-bolero iridescent-text text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-wide"
            >
              FOUNDERS
            </motion.h2>
          </div>
        </section>

        {/* Team Members */}
        {teamMembers.map((member, i) => {
          const flipped = i % 2 === 1;
          return (
            <section key={member.name} className="relative py-12 md:py-20 px-6 overflow-hidden">
              <div className="max-w-4xl mx-auto relative min-h-[350px] md:min-h-[450px]">
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-10%" }}
                  className={`relative z-10 max-w-[55%] md:max-w-[50%] ${flipped ? "ml-auto text-right" : ""}`}
                >
                  <h2 className="font-bolero iridescent-text text-2xl sm:text-3xl md:text-4xl font-bold leading-[0.95] tracking-wide mb-1">
                    {member.name}
                  </h2>
                  <p className="text-white/50 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-1">
                    {member.title}
                  </p>
                  {"subtitle" in member && member.subtitle && (
                    <p className="text-white/40 text-[10px] md:text-xs font-medium tracking-wide mb-6">
                      {member.subtitle}
                    </p>
                  )}
                  {!("subtitle" in member) && <div className="mb-5" />}
                  <div className={`text-white/80 text-xs md:text-sm leading-relaxed font-medium space-y-3 ${flipped ? "ml-auto" : ""}`}>
                    {member.bio.map((line, j) =>
                      line === "" ? <br key={j} /> : <p key={j}>{line}</p>
                    )}
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  className={`absolute top-0 ${flipped ? "left-0" : "right-0"} w-[45%] md:w-[40%] h-full`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 45vw, 40vw"
                    />
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}

        <Footer setBgColor={setBgColor} />
      </main>
    </EditProvider>
  );
}
