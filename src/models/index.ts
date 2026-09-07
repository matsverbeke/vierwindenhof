export interface StatItem {
  value: string;
  label: string;
}

export interface ActivityItem {
  iconName: 'Compass' | 'Footprints' | 'Waves' | 'Trees' | 'Bike';
  title: string;
  description: string;
}

export interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
}