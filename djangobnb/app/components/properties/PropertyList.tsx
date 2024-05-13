import PropertyListItem from "./PropertyListItem";

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
        <PropertyListItem
          id={item.id}
          image_url={item.image_url}
          price_per_night={item.price_per_night}
          title={item.title}
          key={item.id}
        />
      ))}
    </>
  );
};

export default PropertyList;
