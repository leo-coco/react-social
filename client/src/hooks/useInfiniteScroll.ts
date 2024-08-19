import { useEffect } from 'react';

const useInfiniteScroll = (hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: () => void) => {
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;

      if (scrollTop >= scrollableHeight - 200) { // Trigger fetch when user is within 200px of the bottom
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
};

export default useInfiniteScroll;
