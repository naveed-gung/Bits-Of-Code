
import React, { useState, useMemo } from 'react';
import SearchBox from '../components/SearchBox';
import ArticleCard from '../components/ArticleCard';
import ArticleDetail from '../components/ArticleDetail';
import ThemeToggle from '../components/ThemeToggle';
import { articles, Article } from '../data/articles';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                bitsofcode
              </h1>
              <p className="text-muted-foreground mt-1">
                Articles on Frontend Development
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="text-center mb-16 space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Search</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insightful articles about frontend development, CSS, JavaScript, and more
            </p>
          </div>
          <SearchBox 
            value={searchTerm} 
            onChange={setSearchTerm}
            placeholder="Search articles, topics, or authors..."
          />
        </div>

        {/* Results */}
        <div className="space-y-8">
          {searchTerm && (
            <div className="flex items-center justify-between">
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredArticles.length}</span> 
                {filteredArticles.length === 1 ? ' post' : ' posts'} found
                {searchTerm && (
                  <span> for "<span className="font-medium text-primary">{searchTerm}</span>"</span>
                )}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, index) => (
              <div 
                key={article.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArticleCard
                  article={article}
                  searchTerm={searchTerm}
                  onClick={() => setSelectedArticle(article)}
                />
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchTerm && filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">No articles found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all articles
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                  Show all articles
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          searchTerm={searchTerm}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Index;
