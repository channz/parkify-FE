import { Card, CardContent } from "./ui/card";

interface Props {
  location_name: string;
  city: string;
  cover_image: string;
}

const DetailCard = (props: Props) => {
  const { location_name, city, cover_image } = props;

  return (
    <Card>
      <CardContent>
        <div className="flex">
          <div className="flex flex-col">
            <h2>{location_name}</h2>
            <p>{city}</p>
          </div>
          <div className="flex flex-col">
            <img src={cover_image} alt={location_name} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
