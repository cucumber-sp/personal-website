import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BlogMeta } from '../types/blog';
import { useTranslation } from 'react-i18next';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled(motion.article)`
  background: var(--card-background);
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid var(--card-border);

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-image: radial-gradient(circle, var(--accent) 0.5px, transparent 0.5px);
    background-size: 4px 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent);

    &::before {
      opacity: 0.1;
    }
  }
`;

const Title = styled.h2`
  font-family: var(--font-matrix);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--primary);
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--accent);
`;

const DateText = styled.span`
  font-family: 'Space Mono', monospace;
  color: var(--accent);
  font-size: 0.9rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: var(--card-background);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid var(--card-border);
  color: var(--text);
`;

const Excerpt = styled.p`
  color: var(--text);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const PageTitle = styled(motion.h1)`
  font-family: 'DotMatrix', monospace;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogMeta[]>([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/blog/posts/index.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        
        // Transform posts to include current language content
        const transformedPosts = data.posts.map((post: any) => ({
          id: post.id,
          title: post.title[i18n.language],
          date: post.date,
          slug: post.slug,
          excerpt: post.excerpt[i18n.language],
          tags: post.tags
        }));
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, [i18n.language]);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <BlogContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('blog.title')}
      </PageTitle>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'var(--text)',
          maxWidth: '600px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6'
        }}
      >
        {t('blog.description')}
      </motion.p>
      <BlogGrid>
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Title>{post.title}</Title>
            <Meta>
              <DateText>
                {new Date(post.date).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </DateText>
            </Meta>
            <Excerpt>{post.excerpt}</Excerpt>
            <Tags>
              {post.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </Tags>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default Blog; 