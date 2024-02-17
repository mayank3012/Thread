
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThread } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


export default async function Home() {
  const currentUser1 = await currentUser();
  if (!currentUser1) redirect('/sign-in');
  const userInfo = await fetchUser(currentUser1.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  const results = await fetchThread(1, 30);
  const { posts, isNext } = results
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      {(!posts || posts.length == 0) ?
        <p>No Posts Available</p>
        :
        posts.map((post: any) => {
          return (
            <ThreadCard
              key={post._id}
              id={post._id}
              content={post.text}
              author={post.author}
              currentUserId={userInfo?._id}
              parentId={post.parentId}
              createdAt={post.createdAt}
              community={post.community}
              comments={post.children}
            />
          )
        })}
    </>
  )
}