import React from 'react';
import { cn } from '../../utils/formatters';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isOnline?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isOnline,
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const initials = name
    .split(' ')
    .slice(-2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const sizes = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold',
    '2xl': 'w-24 h-24 text-2xl font-bold',
  };

  const badgeSizes = {
    xs: 'w-2 h-2 bottom-0 right-0',
    sm: 'w-2.5 h-2.5 bottom-0 right-0',
    md: 'w-3 h-3 bottom-0 right-0',
    lg: 'w-4 h-4 bottom-0.5 right-0.5 ring-2',
    xl: 'w-5 h-5 bottom-1 right-1 ring-2',
    '2xl': 'w-6 h-6 bottom-1 right-1 ring-3',
  };

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className={cn('rounded-full object-cover shadow-inner', sizes[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-sm select-none',
            sizes[size]
          )}
        >
          {initials || 'U'}
        </div>
      )}

      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute rounded-full ring-white',
            isOnline ? 'bg-emerald-500 ring-2' : 'bg-slate-400 ring-2',
            badgeSizes[size]
          )}
          title={isOnline ? 'Đang online' : 'Ngoại tuyến'}
        />
      )}
    </div>
  );
};

