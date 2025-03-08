import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { ProfileImageProps } from '@/types/global';
import { useNotification } from '@/context/NotificationContext';

// Import all images directly
import chris1 from '../assets/chris.jpg';
import chris2 from '../assets/chris2.jpg';
import chris3 from '../assets/chris3.jpg';
import chrisError from '../assets/chris4.jpg';

// Define the images array with imported images
const images: ProfileImageProps[] = [
  { src: chris1, alt: 'Image of Chris', priority: true },
  { src: chris2, alt: 'Image of Chris 2', mediaDuration: 2000, type: 'random' },
  { src: chris3, alt: 'Image of Chris 3', mediaDuration: 3000, type: 'random' },
  { src: chrisError, alt: 'Image of Chris error', mediaDuration: 1500, notificationType: 'error' },
];

// Menu items remain unchanged
const menuitems: AsideMenu[] = [
  { id: 1, navigation: '/profile', icon: MdPerson, linkTitle: 'Profile' },
  { id: 2, navigation: '/projects', icon: MdOutlineFolderCopy, linkTitle: 'Projects' },
  { id: 3, navigation: '/contact', icon: MdOutlineHandshake, linkTitle: 'Contact' },
  { id: 4, navigation: '/support', icon: RiMoneyDollarCircleLine, linkTitle: 'Support' },
];

const UserProfileSidebar: React.FC = () => {
  const currentPathname = usePathname();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const { notification } = useNotification();

  // Function to get subpath (unchanged)
  const getSubpath = (basePath: string) => {
    if (currentPathname.startsWith(basePath)) {
      const subpath = currentPathname.replace(basePath, '').replace('/', '');
      return DOMPurify.sanitize(subpath) || null;
    }
    return null;
  };

  // Effect for random image swapping
  useEffect(() => {
    function scheduleNextSwap() {
      const randomDelay = Math.floor(Math.random() * (100000 - 15000)) + 15000; // 15s to 100s
      timeoutRef.current = window.setTimeout(() => {
        const randomGifIndices = images
          .map((img, index) => (img.type === 'random' ? index : -1))
          .filter((index) => index !== -1);
        if (randomGifIndices.length > 0) {
          const randomIndex = randomGifIndices[Math.floor(Math.random() * randomGifIndices.length)];
          setCurrentImageIndex(randomIndex);
          const duration = images[randomIndex].mediaDuration || 0;
          setTimeout(() => {
            setCurrentImageIndex(0);
            scheduleNextSwap();
          }, duration);
        } else {
          scheduleNextSwap();
        }
      }, randomDelay);
    }
    scheduleNextSwap();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Effect for notification-based image swapping
  useEffect(() => {
    if (notification) {
      const gifIndex = images.findIndex((img) => img.notificationType === notification.type);
      if (gifIndex !== -1) {
        setCurrentImageIndex(gifIndex);
        const duration = images[gifIndex].mediaDuration || 0;
        setTimeout(() => {
          setCurrentImageIndex(0);
        }, duration);
      }
    }
  }, [notification]);

  return (
    <div id="cb-right-menu" className="bg-gray-800 w-64 md:block hidden flex-none">
      <div className="p-2">
        <div className="flex flex-col items-center space-y-4 pb-4">
          {/* Image stack container */}
          <div className="relative w-32 h-32 mx-auto">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.src}
                alt={img.alt}
                fill
                className={`rounded-full object-cover border-2 border-gray-800 transition-opacity duration-500 ${
                  currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                priority={img.priority || false}
              />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-0 text-stone-100">Chris Buono</h2>
          <p className="text-xs font-normal text-center text-stone-50">
            Welcome to the inbox of my mind.
          </p>
        </div>
        <hr className="pb-4 opacity-30" />
        <nav>
          <ul className="space-y-2">
            {menuitems.map((itm, index) => {
              const Icon = itm?.icon;
              const subpath = getSubpath(itm.navigation);
              return (
                <li key={index}>
                  <Link
                    href={itm.navigation}
                    className={`flex ${
                      currentPathname.startsWith(itm.navigation)
                        ? 'bg-white/20'
                        : 'bg-white/0 hover:bg-sky-100/15'
                    } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="ml-2">{itm.linkTitle}</span>
                    {subpath && <span className="sr-only">currently viewing {subpath}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserProfileSidebar;