import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlogPost as BlogPostType } from "../types/blog";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PostContainer = styled.div`
  padding: 4rem 0;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  background: none;
  border: none;
  font-family: "Space Mono", monospace;
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-image: radial-gradient(
      circle,
      var(--accent) 0.5px,
      transparent 0.5px
    );
    background-size: 4px 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    border-radius: 4px;
  }

  &:hover {
    transform: translateX(-5px);

    &::before {
      opacity: 0.1;
    }
  }
`;

const Title = styled.h1`
  font-family: "DotMatrix", monospace;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Date = styled.span`
  font-family: "Space Mono", monospace;
  color: var(--accent);
  font-size: 0.9rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: rgba(0, 0, 0, 0.05);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: "Space Mono", monospace;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Space Mono", monospace;
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 2rem 0;
  }

  ul,
  ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid var(--accent);
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--accent);
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6a9955;
  }

  .token.punctuation {
    color: #d4d4d4;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #b5cea8;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #ce9178;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #d4d4d4;
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #c586c0;
  }

  .token.function,
  .token.class-name {
    color: #dcdcaa;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #d16969;
  }
`;

const CodeBlock = styled.div`
  position: relative;
  margin: 2rem 0;

  pre {
    margin: 0 !important;
    border-radius: 8px;
    padding-top: 3rem !important;
  }
`;

const CodeHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2.5rem;
  background: #1e1e1e;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  color: #d4d4d4;
`;

const Language = styled.span`
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #858585;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #858585;
  font-family: "Space Mono", monospace;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #d4d4d4;
  }

  svg {
    font-size: 1rem;
  }
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post metadata
        const response = await fetch(`/blog/posts/${slug}/index.json`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const meta = await response.json();

        // Fetch post content based on current language
        const contentResponse = await fetch(
          `/blog/posts/${slug}/${i18n.language}.md`,
        );
        if (!contentResponse.ok) {
          throw new Error("Post content not found");
        }
        const content = await contentResponse.text();

        setPost({
          ...meta,
          title: meta.title[i18n.language],
          excerpt: meta.excerpt[i18n.language],
          content: content,
        });
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      setLoading(true);
      fetchPost();
    }
  }, [slug, i18n.language]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");

      return !inline && match ? (
        <CodeBlock>
          <CodeHeader>
            <Language>{match[1]}</Language>
            <CopyButton onClick={() => handleCopy(code)} title="Copy code">
              {copiedCode === code ? "Copied!" : "Copy"}
            </CopyButton>
          </CodeHeader>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        </CodeBlock>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  if (loading) {
    return (
      <PostContainer>
        <ContentContainer>
          <BackButton onClick={handleBack}>
            <FaArrowLeft /> {t("blog.back")}
          </BackButton>
          <p>{t("blog.loading")}</p>
        </ContentContainer>
      </PostContainer>
    );
  }

  if (!post) {
    return (
      <PostContainer>
        <ContentContainer>
          <BackButton onClick={handleBack}>
            <FaArrowLeft /> {t("blog.back")}
          </BackButton>
          <p>{t("blog.notFound")}</p>
        </ContentContainer>
      </PostContainer>
    );
  }

  return (
    <PostContainer>
      <ContentContainer>
        <BackButton onClick={handleBack}>
          <FaArrowLeft /> {t("blog.back")}
        </BackButton>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>{post.title}</Title>
          <Meta>
            <Date>{post.date}</Date>
            <Tags>
              {post.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
          </Meta>
          <Content>
            <ReactMarkdown components={components}>
              {post.content}
            </ReactMarkdown>
          </Content>
        </motion.div>
      </ContentContainer>
    </PostContainer>
  );
};

export default BlogPost;
