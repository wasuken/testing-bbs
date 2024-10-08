"use client";
import PostList from "@/components/PostList";
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from 'next';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps(context: GetServerSidePropsContext){
  try{
    const data = await prisma.post.findMany({
      where: {
	categoryId,
      },
    });
    return {
      props: {
	data,
      }
    }
  }catch(error){
    // console.error("Error in server side", error);
    console.log('no id.');
    return {
      props: { data: [] }
    }
  }
}

const PostsPage: React.FC = ({ data }) => {
  return <PostList posts={data} />;
};

export default PostsPage;
