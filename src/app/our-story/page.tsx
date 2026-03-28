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
    name: "BAO HAN",
    title: "Brand Ambassador, Co-Founder",
    image: "/assets/bao-han.png",
    bio: [
      "Bao Han is what we like to call a good spirit.",
      "",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    flipped: false,
  },
  {
    name: "TEE TRAN",
    title: "Founder & CEO",
    image: "/assets/tee-pink.png",
    bio: [
      "Tee Tran is the CEO and founder.",
      "",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    flipped: true,
  },
  {
    name: "MICHAEL LE",
    title: "Creative Director, Co-Founder",
    image: "/assets/michael-gummy.png",
    bio: [
      "Michael is a young Gen-Z force.",
      "",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    flipped: false,
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
        <section className="relative pt-32 md:pt-40 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bolero iridescent-text text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-wide mb-8"
            >
              HOW IT CAME TO BEING
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/85 text-sm md:text-base leading-relaxed font-medium space-y-4"
            >
              <p>Saigon Bonbon is a confluence of three worlds.</p>
              <p>From Tee Tran{"'"}s confidence-infusing and intentional Vietnamese upbringing.</p>
              <p>Bao Han{"'"}s journey of discovery, success, and finding joy in the simplest things.</p>
              <p>And of Michael using the world as its own canvas — using social media to introduce and hold space for culture free.</p>
              <p>Together, three deep love for the  Lân created Saigon Bonbon. Tee provided the vision, Bao Han is the heart, and Michael is the soul — each adding to the mission.</p>
              <p>Saigon Bonbon is not just in the business of selling candy — it{"'"}s about sharing a joy, heritage, and vision for a future where culture is celebrated, not hidden. It{"'"}s a celebration in every bite.</p>
            </motion.div>
          </div>
        </section>

        {/* Team Members */}
        {teamMembers.map((member, i) => (
          <section key={member.name} className="relative py-16 md:py-24 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto relative min-h-[400px] md:min-h-[500px]">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: member.flipped ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className={`relative z-10 max-w-[60%] md:max-w-[55%] ${member.flipped ? "ml-auto" : ""}`}
              >
                <h2 className="font-bolero iridescent-text text-2xl sm:text-3xl md:text-4xl font-bold leading-[0.95] tracking-wide mb-2">
                  {member.name}
                </h2>
                <p className="text-white/60 text-xs md:text-sm font-bold tracking-widest uppercase mb-6">
                  {member.title}
                </p>
                <div className="text-white/85 text-xs md:text-sm leading-relaxed font-medium space-y-1">
                  {member.bio.map((line, j) =>
                    line === "" ? <br key={j} /> : <p key={j}>{line}</p>
                  )}
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: member.flipped ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`absolute top-0 ${member.flipped ? "left-0" : "right-0"} w-[50%] md:w-[45%] h-full`}
              >
                <div
                  className="absolute inset-0 -top-[5%] -bottom-[5%]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 50vw, 45vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* Divider between members */}
            {i < teamMembers.length - 1 && (
              <div className="max-w-3xl mx-auto mt-16">
                <div className="h-px bg-white/10" />
              </div>
            )}
          </section>
        ))}

        <Footer setBgColor={setBgColor} />
      </main>
    </EditProvider>
  );
}
