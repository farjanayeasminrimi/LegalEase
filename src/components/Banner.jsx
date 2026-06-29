"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Banner() {
    const slides = [
        {
            img: "https://cdn.pixabay.com/photo/2020/01/19/08/24/justitia-4777072_1280.jpg",
            title: "Find the Right Legal Expert, Instantly",
            desc: "Browse verified, top-tier attorneys across multiple practice areas. Consult with experienced legal professionals tailored to your specific case needs.",
        },
        {
            img: "https://cdn.pixabay.com/photo/2018/10/31/11/15/justitia-3785581_1280.jpg",
            title: "Your Legal Solutions Made Simple",
            desc: "From corporate counsel to family law, connect with specialists who bring clarity, dedication, and results to your side.",
        },
        {
            img: "https://cdn.pixabay.com/photo/2014/08/28/07/54/justitia-429717__340.jpg",
            title: "Expert Consultation on Your Terms",
            desc: "Compare fees, review client feedback, and schedule consultations with trusted lawyers. Legal representation designed for the modern world.",
        },
    ];

    return (
        <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden rounded-3xl mt-4 max-w-7xl mx-auto border border-zinc-200/50 dark:border-white/5 shadow-2xl">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop
                className="h-full w-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

                            <div className="relative z-10 flex h-full items-center">
                                <div className="w-full px-6 md:px-10 lg:px-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="max-w-2xl text-white p-6 md:p-10 rounded-2xl border border-white/20 bg-black/25 backdrop-blur-md shadow-xl"
                                    >
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                                            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">
                                                Legal Excellence
                                            </span>
                                        </motion.div>

                                        <motion.h1 
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="text-3xl font-bold leading-[1.1] md:text-5xl lg:text-6xl bg-gradient-to-r from-white via-white to-zinc-300 bg-clip-text text-transparent"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="mt-6 max-w-xl text-sm leading-7 text-gray-200 md:text-base"
                                        >
                                            {slide.desc}
                                        </motion.p>

                                        <motion.div 
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-8 flex flex-col gap-4 sm:flex-row"
                                        >
                                            <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-xs font-semibold text-white shadow-xl shadow-blue-950/30 hover:shadow-blue-500/30 active:scale-95 transition-all duration-200">
                                                Book Consultation
                                            </button>

                                            <button className="rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all duration-200">
                                                Explore Services
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .swiper-pagination {
                    bottom: 24px !important;
                }

                .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.6);
                    opacity: 1;
                    transition: all 0.25s ease;
                }

                .swiper-pagination-bullet-active {
                    width: 24px;
                    border-radius: 999px;
                    background: #3b82f6;
                }
            `}</style>
        </section>
    );
}