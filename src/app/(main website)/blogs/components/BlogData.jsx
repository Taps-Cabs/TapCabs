import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styles from './post.module.css';
import CategoryCard from './CategoryCard';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

function BlogData({ post }) {
    console.log(post)
    return (
        <section className="flex flex-col gap-5 pb-5 px-5 md:px-8 max-w-[1000px]">
            <h1 className="text-2xl sm:text-3xl font-bold border-b pb-5">{post.title}</h1>
            {post?.imageURL?.imageURL && (
                <div className='w-full relative h-full'>
                    <Image
                        className="h-full max-h-[500px] object-cover rounded-lg"
                        src={post?.imageURL?.imageURL || "/header2.jpg"}
                        alt={post?.title || 'Post Image'}
                        height={1000}
                        width={1000}
                    />
                </div>
            )}
            <div className={styles.postStyle}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </section>
    );
}

export default BlogData;
