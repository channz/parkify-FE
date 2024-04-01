import { Card, CardContent } from "./ui/card";

interface Props {
  location_name: string;
  city: string;
  cover_image: string;
}

const DetailCard = (props: Props) => {
  const { location_name, city, cover_image } = props;

  return (
    <Card className="rounded-3xl">
      <CardContent className="flex p-5">
        <div className="flex flex-col w-3/5">
          <h2 className="font-semibold text-3xl leading-none">
            {location_name}
          </h2>
          <p className="font-light text-lg mt-auto">{city}</p>
        </div>
        <div className="flex w-2/5">
          <img
            className="h-28 w-auto object-cover rounded-2xl"
            src={cover_image}
            alt={location_name}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
