import React, { useEffect, useState, useRef, useCallback } from "react";

interface InfiniteScrollListProps {
  fetchMoreItems: () => Promise<string[]>; // Replace `string[]` with your item type
  initialItems: string[]; // Initial items to display
}

const InfiniteScrollList: React.FC<InfiniteScrollListProps> = ({
  fetchMoreItems,
  initialItems,
}) => {
  const [items, setItems] = useState<string[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Infinite scrolling logic with callback to fetch and add items
  const loadMoreItems = useCallback(async () => {
    if (isLoading) return; // Prevent multiple fetches
    setIsLoading(true);
    try {
      const newItems = await fetchMoreItems();
      setItems((prevItems) => [...prevItems, ...newItems]);
    } catch (error) {
      console.error("Error fetching more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, fetchMoreItems]);

  // Intersection observer to trigger loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreItems]);

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Infinite Scroll List</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="p-4 border rounded shadow-sm">
            {item}
          </li>
        ))}
      </ul>
      <div ref={loaderRef} className="flex justify-center items-center h-12">
        {isLoading ? <span>Loading...</span> : <span>Scroll down to load more</span>}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
