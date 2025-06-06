
import React from 'react';
import { X, Calendar, User, ArrowLeft } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleDetailProps {
  article: Article | null;
  onClose: () => void;
  searchTerm: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose, searchTerm }) => {
  if (!article) return null;

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background border border-border rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between rounded-t-3xl">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to search</span>
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-xl transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              {highlightText(article.title, searchTerm)}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time className="text-lg">{article.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-lg">{article.author}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium"
                >
                  {highlightText(tag, searchTerm)}
                </span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-muted-foreground mb-6">
                {highlightText(paragraph, searchTerm)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
