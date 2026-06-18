"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../reusable/navbar";
import Footer from "../reusable/footer";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const BlogCard = ({ post, featured = false }) => (
  <Link
    href={`/blog/${post.slug}`}
    className={`group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
      featured ? "lg:grid lg:grid-cols-2" : ""
    }`}
  >
    <div
      className={`relative overflow-hidden ${
        featured ? "h-64 lg:h-full min-h-[280px]" : "h-52"
      }`}
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded-full Poppins">
        {post.category}
      </span>
    </div>

    <div className={`p-6 flex flex-col ${featured ? "lg:p-8" : ""}`}>
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 Poppins">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {post.readTime}
        </span>
      </div>

      <h3
        className={`font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors GeistBold ${
          featured ? "text-xl lg:text-2xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed Poppins line-clamp-3 flex-grow">
        {post.excerpt}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-black Poppins">
        Read Article
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);
  const filteredPosts = blogPosts.filter((post) => {
    if (post.featured && activeCategory === "All") return false;
    if (activeCategory === "All") return !post.featured;
    return post.category === activeCategory;
  });

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section
        className="relative w-full min-h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-20 min-h-[70vh] flex flex-col">
          <Navbar />

          <div className="flex-1 flex items-center justify-center py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="font-bold mb-6 uppercase GeistBlack text-4xl md:text-7xl tracking-wider leading-tight text-white">
                  TRAVEL BLOG
                </h1>
                <h2 className="text-sm md:text-xl font-light text-gray-200 mb-4 tracking-wide Poppins">
                  TIPS, GUIDES & TRAVEL INSPIRATION
                </h2>
                <p className="Poppins text-sm md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-100">
                  Expert advice on destinations, visa tips, flight booking, and
                  everything you need to plan your next adventure with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 Poppins cursor-pointer ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === "All" && (
            <div className="mb-12 lg:mb-16">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4 GeistBold">
                Featured Article
              </p>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 Poppins">
                No articles found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 GeistBold text-gray-900">
            READY TO PLAN YOUR TRIP?
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mb-8 Poppins leading-relaxed">
            Our travel experts are here to help with flights, visas, hotels, and
            complete tour packages tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block Poppins bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            CONTACT AN EXPERT
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
