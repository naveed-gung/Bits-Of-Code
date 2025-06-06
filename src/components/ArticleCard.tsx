import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Article } from '../data/articles';
import ShareButton from './ShareButton';

interface ArticleCardProps {
  article: Article;
  searchTerm: string;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, searchTerm, onClick }) => {
  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article 
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 group relative"
    >
      <div 
        onClick={onClick}
        className="space-y-4 cursor-pointer"
      >
        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {highlightText(article.title, searchTerm)}
        </h2>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time>{article.date}</time>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {highlightText(article.excerpt || article.content.slice(0, 150) + "...", searchTerm)}
        </p>
      </div>
      
      <div className="absolute top-4 right-4">
        <ShareButton 
          title={article.title}
          url={window.location.origin + "?article=" + encodeURIComponent(article.title)}
        />
      </div>
    </article>
  );
};

export default ArticleCard;
