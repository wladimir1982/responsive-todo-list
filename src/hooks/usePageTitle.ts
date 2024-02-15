import { useEffect } from 'react';

export const usePageTitle = (path: string) => {
  const title = path.charAt(1).toUpperCase() + path.substring(2);

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = 'Todos';
    };
  }, [title]);
};
