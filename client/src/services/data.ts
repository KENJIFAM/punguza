import { ReactComponent as SausagesIcon } from '../assets/icons/sausages.svg';
import { ReactComponent as MilkIcon } from '../assets/icons/milk.svg';
import { ReactComponent as CarrotIcon } from '../assets/icons/carrot.svg';
import { ReactComponent as PizzaIcon } from '../assets/icons/pizza.svg';
import { ReactComponent as BeefIcon } from '../assets/icons/beef.svg';
import { ReactComponent as AppleIcon } from '../assets/icons/beef.svg';
import { ReactComponent as BananaIcon } from '../assets/icons/banana.svg';
import { ReactComponent as BreadIcon } from '../assets/icons/bread.svg';
import { ReactComponent as HamburgerIcon } from '../assets/icons/hamburger.svg';
import { ReactComponent as CakeIcon } from '../assets/icons/cake.svg';

export interface Food {
  id: string;
  name: string;
  brand?: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  expText: string;
  exp: number;
  amount: {
    value: number;
    unit: string;
  };
}

export interface Category {
  id: string;
  name: string;
  food: Food[];
}

export const categories: Category[] = [
  {
    id: 'FRIDGE',
    name: 'Fridge',
    food: [
      {
        id: 'Milk',
        name: 'Milk',
        brand: 'Valio',
        icon: MilkIcon,
        expText: 'Expiring today',
        exp: 0.9,
        amount: {
          value: 1,
          unit: 'liter',
        },
      },
      {
        id: 'Sausages',
        name: 'Sausages',
        brand: 'HK Sininen lenkki',
        icon: SausagesIcon,
        expText: '2 days left',
        exp: 0.8,
        amount: {
          value: 500,
          unit: 'g',
        },
      },
      {
        id: 'Cake',
        name: 'Cake',
        brand: 'Valio',
        icon: CakeIcon,
        expText: '3 days left',
        exp: 0.5,
        amount: {
          value: 1,
          unit: 'pcs',
        },
      },
      {
        id: 'Hamburger',
        name: 'Hamburger',
        brand: 'HK Sininen lenkki',
        icon: HamburgerIcon,
        expText: '5 days left',
        exp: 0.4,
        amount: {
          value: 200,
          unit: 'g',
        },
      },
      {
        id: 'Apple',
        name: 'Apple',
        icon: AppleIcon,
        expText: '7 days left',
        exp: 0.2,
        amount: {
          value: 3,
          unit: 'pcs',
        },
      },
    ],
  },
  {
    id: 'FREEZER',
    name: 'Freezer',
    food: [
      {
        id: 'Beef',
        name: 'Beef',
        icon: BeefIcon,
        expText: '3 days left',
        exp: 0.5,
        amount: {
          value: 500,
          unit: 'g',
        },
      },
      {
        id: 'Pizza',
        name: 'Pizza',
        brand: 'Grandiosa meatlover',
        icon: PizzaIcon,
        expText: '10 days left',
        exp: 0.15,
        amount: {
          value: 500,
          unit: 'g',
        },
      },
    ],
  },
  {
    id: 'PANTRY',
    name: 'Pantry',
    food: [
      {
        id: 'Banana',
        name: 'Banana',
        icon: BananaIcon,
        expText: '1 days left',
        exp: 0.85,
        amount: {
          value: 5,
          unit: 'pcs',
        },
      },
      {
        id: 'Bread',
        name: 'Bread',
        icon: BreadIcon,
        expText: '3 days left',
        exp: 0.5,
        amount: {
          value: 100,
          unit: 'g',
        },
      },
      {
        id: 'Carrots',
        name: 'Carrots',
        icon: CarrotIcon,
        expText: '30 days left',
        exp: 0.1,
        amount: {
          value: 500,
          unit: 'g',
        },
      },
    ],
  },
];

export interface Notification {
  title: string;
  description: string;
}

export interface Notifications {
  expiring: Notification[];
  expired: Notification[];
  history: Notification[];
}

export const notifications: Notifications = {
  expiring: [
    {
      title: 'Sausages expire today!',
      description: 'This is the last day to use this item',
    },
    {
      title: 'Sausages about to expire!',
      description: 'You should use this item in 2 days',
    },
  ],
  expired: [
    {
      title: 'Bananas (3 pcs) expired',
      description: 'Please throw the item to bio-waste',
    },
    {
      title: 'Pro pudding expired',
      description: 'Please throw the item away',
    },
    {
      title: 'Froosh Smoothie expired',
      description: 'Please throw the item away',
    },
  ],
  history: [
    {
      title: 'Milk (1 liter) ',
      description: 'Expired 13.10.2020',
    },
    {
      title: 'Pulled oats (450 g)',
      description: 'Expired 13.10.2020',
    },
    {
      title: 'Ryebread (2 pcs)',
      description: 'Expired 12.10.2020',
    },
    {
      title: 'Eggs (4 pcs)',
      description: 'Expired 10.10.2020',
    },
    {
      title: 'Eggs (4 pcs)',
      description: 'Expired 7.10.2020',
    },
    {
      title: 'Bananas (3 pcs) expired',
      description: 'Expired 5.10.2020',
    },
    {
      title: 'Pro pudding expired',
      description: 'Expired 2.10.2020',
    },
    {
      title: 'Froosh Smoothie expired',
      description: 'Expired 1.10.2020',
    },
  ],
};
