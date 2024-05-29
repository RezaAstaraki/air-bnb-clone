import { link } from "fs";
import PropertyListItem from "./PropertyListItem";
import Link from "next/link";

interface ListItem {
  id: string;
  title: string;
  price_per_night: string;
  image_url: string;
}

interface PropertyListProps {
  list: ListItem[];
}

const PropertyList: React.FC<PropertyListProps> = ({
  list,
}: PropertyListProps) => {
  return (
    <>
      {list.map((item) => (
        <Link href={`/properties/${item.id}`} about={`${item.title} property`}>
          <PropertyListItem
            id={item.id}
            image_url={item.image_url}
            price_per_night={item.price_per_night}
            title={item.title}
            key={item.id}
          />
        </Link>
      ))}
    </>
  );
};

export default PropertyList;
