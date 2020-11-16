import { ReactComponent as AppleIcon } from '../assets/icons/apple.svg';
import { ReactComponent as ArtichokeIcon } from '../assets/icons/artichoke.svg';
import { ReactComponent as asparagusIcon } from '../assets/icons/asparagus.svg';
import { ReactComponent as baguetteIcon } from '../assets/icons/baguette.svg';
import { ReactComponent as BananaIcon } from '../assets/icons/banana.svg';
import { ReactComponent as BeefIcon } from '../assets/icons/beef.svg';
import { ReactComponent as blueberryIcon } from '../assets/icons/blueberry.svg';
import { ReactComponent as BreadIcon } from '../assets/icons/bread.svg';
import { ReactComponent as bread1Icon } from '../assets/icons/bread1.svg';
import { ReactComponent as brezelIcon } from '../assets/icons/brezel.svg';
import { ReactComponent as brigadeiroIcon } from '../assets/icons/brigadeiro.svg';
import { ReactComponent as broccoliIcon } from '../assets/icons/broccoli.svg';
import { ReactComponent as cabbageIcon } from '../assets/icons/cabbage.svg';
import { ReactComponent as CakeIcon } from '../assets/icons/cake.svg';
import { ReactComponent as CarrotIcon } from '../assets/icons/carrot.svg';
import { ReactComponent as cheeseIcon } from '../assets/icons/cheese.svg';
import { ReactComponent as cherryIcon } from '../assets/icons/cherry.svg';
import { ReactComponent as chocolateBarIcon } from '../assets/icons/chocolate-bar.svg';
import { ReactComponent as citrusIcon } from '../assets/icons/citrus.svg';
import { ReactComponent as coconutMilkIcon } from '../assets/icons/coconut-milk.svg';
import { ReactComponent as dessertIcon } from '../assets/icons/dessert.svg';
import { ReactComponent as dimSumIcon } from '../assets/icons/dim-sum.svg';
import { ReactComponent as fishIcon } from '../assets/icons/fish.svg';
import { ReactComponent as grapesIcon } from '../assets/icons/grapes.svg';
import { ReactComponent as HamburgerIcon } from '../assets/icons/hamburger.svg';
import { ReactComponent as hotDogIcon } from '../assets/icons/hot-dog.svg';
import { ReactComponent as iceCreamIcon } from '../assets/icons/ice-cream.svg';
import { ReactComponent as lasagnaIcon } from '../assets/icons/lasagna.svg';
import { ReactComponent as mangoIcon } from '../assets/icons/mango.svg';
import { ReactComponent as meatIcon } from '../assets/icons/meat.svg';
import { ReactComponent as MilkIcon } from '../assets/icons/milk.svg';
import { ReactComponent as milkCartonIcon } from '../assets/icons/milk-carton.svg';
import { ReactComponent as naanIcon } from '../assets/icons/naan.svg';
import { ReactComponent as onionIcon } from '../assets/icons/onion.svg';
import { ReactComponent as pearIcon } from '../assets/icons/pear.svg';
import { ReactComponent as pineappleIcon } from '../assets/icons/pineapple.svg';
import { ReactComponent as PizzaIcon } from '../assets/icons/pizza.svg';
import { ReactComponent as pretzelIcon } from '../assets/icons/pretzel.svg';
import { ReactComponent as pumpkinIcon } from '../assets/icons/pumpkin.svg';
import { ReactComponent as raspberryIcon } from '../assets/icons/raspberry.svg';
import { ReactComponent as saladIcon } from '../assets/icons/salad.svg';
import { ReactComponent as SausagesIcon } from '../assets/icons/sausages.svg';
import { ReactComponent as strawberryIcon } from '../assets/icons/strawberry.svg';
import { ReactComponent as tomatoIcon } from '../assets/icons/tomato.svg';

interface IconData {
  id: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const icons: IconData[] = [
  { icon: pumpkinIcon, id: 'pumpkin' },
  { icon: AppleIcon, id: 'apple' },
  { icon: ArtichokeIcon, id: 'artichoke' },
  { icon: asparagusIcon, id: 'asparagus' },
  { icon: baguetteIcon, id: 'baguette' },
  { icon: BananaIcon, id: 'banana' },
  { icon: BeefIcon, id: 'beef' },
  { icon: blueberryIcon, id: 'blueberry' },
  { icon: BreadIcon, id: 'bread' },
  { icon: bread1Icon, id: 'bread1' },
  { icon: brezelIcon, id: 'brezel' },
  { icon: brigadeiroIcon, id: 'brigadeiro' },
  { icon: broccoliIcon, id: 'broccoli' },
  { icon: cabbageIcon, id: 'cabbage' },
  { icon: CakeIcon, id: 'cake' },
  { icon: CarrotIcon, id: 'carrot' },
  { icon: cheeseIcon, id: 'cheese' },
  { icon: cherryIcon, id: 'cherry' },
  { icon: chocolateBarIcon, id: 'chocolate-bar' },
  { icon: citrusIcon, id: 'citrus' },
  { icon: coconutMilkIcon, id: 'coconut-milk' },
  { icon: dessertIcon, id: 'dessert' },
  { icon: dimSumIcon, id: 'dim-sum' },
  { icon: fishIcon, id: 'fish' },
  { icon: grapesIcon, id: 'grapes' },
  { icon: HamburgerIcon, id: 'hamburger' },
  { icon: hotDogIcon, id: 'hot-dog' },
  { icon: iceCreamIcon, id: 'ice-cream' },
  { icon: lasagnaIcon, id: 'lasagna' },
  { icon: mangoIcon, id: 'mango' },
  { icon: meatIcon, id: 'meat' },
  { icon: MilkIcon, id: 'milk' },
  { icon: milkCartonIcon, id: 'milk-carton' },
  { icon: naanIcon, id: 'naan' },
  { icon: onionIcon, id: 'onion' },
  { icon: pearIcon, id: 'pear' },
  { icon: pineappleIcon, id: 'pineapple' },
  { icon: PizzaIcon, id: 'pizza' },
  { icon: pretzelIcon, id: 'pretzel' },
  { icon: raspberryIcon, id: 'raspberry' },
  { icon: saladIcon, id: 'salad' },
  { icon: SausagesIcon, id: 'sausages' },
  { icon: strawberryIcon, id: 'strawberry' },
  { icon: tomatoIcon, id: 'tomato' },
];
