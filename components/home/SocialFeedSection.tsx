'use client';

import React from 'react';
import { Twitter, Linkedin, Heart, Repeat2, MessageSquare, ThumbsUp, CheckCircle, ExternalLink } from 'lucide-react';
import { TWITTER_CRYPTO_FEED, LINKEDIN_CRYPTO_FEED } from '@/lib/news/mockNewsData';

export const SocialFeedSection: React.FC = () => {
  return (
    <section className="py-8 border-t border-slate-200 dark:border-[#1f293d] select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Community & Industry Feeds
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time Twitter / X sentiment and LinkedIn institutional insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Twitter / X Stream (Left Column) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030]">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
                  𝕏
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Twitter / X Live Pulse</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Crypto analysts & builders</span>
                </div>
              </div>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-500 hover:underline flex items-center gap-1"
              >
                <span>Follow @NexTrade</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-3">
              {TWITTER_CRYPTO_FEED.map((tweet) => (
                <div
                  key={tweet.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={tweet.avatar}
                        alt={tweet.author}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                          <span>{tweet.author}</span>
                          {tweet.verified && <CheckCircle className="h-3 w-3 text-sky-500 fill-sky-500 text-white" />}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{tweet.handle}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{tweet.timeAgo}</span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {tweet.content}
                  </p>

                  <div className="pt-2 flex items-center gap-6 text-[11px] text-slate-400 font-mono border-t border-slate-200/50 dark:border-slate-800/50">
                    <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                      <Heart className="h-3.5 w-3.5" />
                      <span>{tweet.likes}</span>
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer">
                      <Repeat2 className="h-3.5 w-3.5" />
                      <span>{tweet.retweets}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LinkedIn Industry Stream (Right Column) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030]">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[#0077B5] text-white flex items-center justify-center font-bold text-xs">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">LinkedIn Executive Perspectives</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Institutional & Web3 leadership</span>
                </div>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#0077B5] hover:underline flex items-center gap-1"
              >
                <span>NexTrade Network</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-3">
              {LINKEDIN_CRYPTO_FEED.map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {post.author}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {post.role} at <strong className="text-slate-600 dark:text-slate-300">{post.company}</strong>
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{post.timeAgo}</span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {post.content}
                  </p>

                  <div className="pt-2 flex items-center gap-6 text-[11px] text-slate-400 font-mono border-t border-slate-200/50 dark:border-slate-800/50">
                    <span className="flex items-center gap-1.5 text-blue-500 font-semibold cursor-pointer">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{post.likes} Likes</span>
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{post.comments} Comments</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
