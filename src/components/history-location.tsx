import { Link } from "react-router-dom";

interface HistoryItemsProps {
  slot: number;
  floor: number;
  location: string;
  city: string;
  price: number;
  id: string;
}

const HistoryLocation = ({
  slot,
  floor,
  location,
  city,
  price,
  id,
}: HistoryItemsProps) => {
  return (
    <Link to={`/reservations/${id}`}>
      <div className="flex justify-between items-start px-4 py-4 w-full rounded-2xl shadow-sm bg-stone-50">
        <div className="flex flex-col text-xs text-zinc-500">
          <div className="text-xs font-semibold text-neutral-900">
            Slot {slot}
          </div>
          <div className="mt-3.5">Floor, {floor}</div>
          <div>
            {location}, {city}
          </div>
        </div>
        <div className="text-xl my-auto font-semibold text-neutral-900">
          RP. {price}
        </div>
      </div>
    </Link>
  );
};

export default HistoryLocation;
