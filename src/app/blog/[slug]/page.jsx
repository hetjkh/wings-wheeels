"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "../../reusable/navbar";
import Footer from "../../reusable/footer";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
} from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleContent({ content }) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="text-xl lg:text-2xl font-bold text-gray-900 mt-8 GeistBold"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="space-y-3 Poppins">
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                  <span className="text-sm lg:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={index}
            className="text-sm lg:text-base text-gray-700 leading-relaxed Poppins"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!post) {
    return (
      <div className="w-full bg-white min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4 GeistBold">Article Not Found</h1>
          <p className="text-gray-600 mb-8 Poppins">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-black font-medium Poppins hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section className="relative w-full min-h-[50vh] bg-cover bg-center">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-20 min-h-[50vh] flex flex-col">
          <Navbar />

          <div className="flex-1 flex items-end pb-12 lg:pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div
                className={`transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-6 Poppins transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-4 Poppins">
                  {post.category}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight GeistBold">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 Poppins">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-10 Poppins border-l-4 border-black pl-5">
            {post.excerpt}
          </p>
          <ArticleContent content={post.content} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl lg:text-2xl font-bold mb-3 GeistBold text-gray-900">
            Need Help Planning This Trip?
          </h2>
          <p className="text-sm text-gray-600 mb-6 Poppins">
            Our team can handle flights, visas, hotels, and full tour packages.
          </p>
          <Link
            href="/contact"
            className="inline-block Poppins bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 GeistBold text-gray-900">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-500 Poppins">
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-1 mb-2 group-hover:text-gray-700 GeistBold line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-sm text-black Poppins">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
