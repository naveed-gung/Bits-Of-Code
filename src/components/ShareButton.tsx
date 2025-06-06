import React from 'react';
import { Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

interface ShareButtonProps {
  title: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
  const shareOptions = [
    {
      name: 'Twitter',
      handler: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
      },
    },
    {
      name: 'LinkedIn',
      handler: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          '_blank'
        );
      },
    },
    {
      name: 'Copy Link',
      handler: () => {
        navigator.clipboard.writeText(url);
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-accent transition-colors"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share article</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={option.handler}
            className="cursor-pointer"
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
