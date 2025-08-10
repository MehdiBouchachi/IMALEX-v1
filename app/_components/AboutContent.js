"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import about_1 from "@/public/about-1.jpg";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent({ cabins }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.utils.toArray("h1").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    gsap.fromTo(
      "#welcome-text p",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#welcome-text",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      "#family-text p",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#family-text",
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      "#family-text a",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#family-text a",
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-5 gap-x-4 sm:gap-x-8 md:gap-x-16 lg:gap-x-24 gap-y-10 sm:gap-y-16 md:gap-y-24 text-sm sm:text-base md:text-lg items-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 max-w-7xl mx-auto"
    >
      {/* Welcome Text */}
      <div className="col-span-5 lg:col-span-3 space-y-6" id="welcome-text">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-accent-400 font-semibold mb-4 sm:mb-6">
          Welcome to The Wild Oasis
        </h1>
        <div className="space-y-4 sm:space-y-6">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      {/* Image 1 */}
      <div className="col-span-5 lg:col-span-2 w-full h-auto">
        <Image
          src={about_1}
          placeholder="blur"
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
          className="w-full h-auto object-cover "
        />
      </div>

      {/* Image 2 */}
      <div className="col-span-5 lg:col-span-2 relative aspect-square w-full">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover "
          alt="Family that manages The Wild Oasis"
        />
      </div>

      {/* Family Text */}
      <div className="col-span-5 lg:col-span-3 space-y-6" id="family-text">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-accent-400 font-semibold mb-4 sm:mb-6">
          Managed by our family since 1962
        </h1>
        <div className="space-y-4 sm:space-y-6">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>
        </div>

        <div>
          <Link
            href="/cabins"
            className="inline-block mt-4 bg-accent-500 px-6 sm:px-8 py-4 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore our luxury cabins
          </Link>
        </div>
      </div>
    </div>
  );
}
